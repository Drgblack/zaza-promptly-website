/**
 * Automated Git Publishing Pipeline
 * Handles Git operations for automatic blog post publishing
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import type { MDXFileResult } from './mdx-file-generator'

interface GitCommitOptions {
  message?: string
  author?: {
    name: string
    email: string
  }
  addTags?: string[]
  skipPush?: boolean
}

interface PublishResult {
  success: boolean
  commitHash?: string
  publishedFiles: string[]
  errors: string[]
  vercelDeploymentUrl?: string
}

interface GitStatus {
  branch: string
  hasUncommittedChanges: boolean
  unstagedFiles: string[]
  stagedFiles: string[]
  lastCommitHash: string
  lastCommitMessage: string
}

export class GitPublisher {
  private static readonly REPO_ROOT = process.cwd()
  private static readonly BLOG_CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

  /**
   * Publish new blog posts to Git and trigger Vercel deployment
   */
  static async publishBlogPosts(
    mdxFiles: MDXFileResult[],
    options: GitCommitOptions = {}
  ): Promise<PublishResult> {
    try {
      console.log(`[GIT PUBLISHER] Starting publication of ${mdxFiles.length} blog posts`)

      // Validate Git repository
      this.validateGitRepository()

      // Check current Git status
      const status = await this.getGitStatus()
      console.log(`[GIT PUBLISHER] Current branch: ${status.branch}`)

      // Stage new blog files
      const stagedFiles = await this.stageBlogFiles(mdxFiles)
      
      if (stagedFiles.length === 0) {
        console.log('[GIT PUBLISHER] No new files to publish')
        return {
          success: false,
          publishedFiles: [],
          errors: ['No new files to publish']
        }
      }

      // Create commit
      const commitMessage = options.message || this.generateCommitMessage(mdxFiles)
      const commitHash = await this.createCommit(commitMessage, options.author)

      // Add tags if specified
      if (options.addTags && options.addTags.length > 0) {
        await this.addTags(options.addTags, commitHash)
      }

      // Push to remote (unless skipped)
      if (!options.skipPush) {
        await this.pushToRemote()
      }

      console.log(`[GIT PUBLISHER] Successfully published ${stagedFiles.length} files`)
      console.log(`[GIT PUBLISHER] Commit hash: ${commitHash}`)

      // Wait for Vercel deployment
      const vercelUrl = await this.waitForVercelDeployment(commitHash)

      return {
        success: true,
        commitHash,
        publishedFiles: stagedFiles,
        errors: [],
        vercelDeploymentUrl: vercelUrl
      }

    } catch (error) {
      console.error('[GIT PUBLISHER ERROR]', error)
      return {
        success: false,
        publishedFiles: [],
        errors: [error instanceof Error ? error.message : String(error)]
      }
    }
  }

  /**
   * Validate that we're in a Git repository
   */
  private static validateGitRepository(): void {
    try {
      execSync('git rev-parse --git-dir', { 
        cwd: this.REPO_ROOT, 
        stdio: 'pipe' 
      })
    } catch (error) {
      throw new Error('Not a Git repository or Git is not available')
    }
  }

  /**
   * Get current Git status
   */
  static async getGitStatus(): Promise<GitStatus> {
    try {
      // Get current branch
      const branch = execSync('git rev-parse --abbrev-ref HEAD', {
        cwd: this.REPO_ROOT,
        encoding: 'utf8'
      }).trim()

      // Get unstaged files
      const unstagedOutput = execSync('git diff --name-only', {
        cwd: this.REPO_ROOT,
        encoding: 'utf8'
      }).trim()
      const unstagedFiles = unstagedOutput ? unstagedOutput.split('\n') : []

      // Get staged files
      const stagedOutput = execSync('git diff --cached --name-only', {
        cwd: this.REPO_ROOT,
        encoding: 'utf8'
      }).trim()
      const stagedFiles = stagedOutput ? stagedOutput.split('\n') : []

      // Get last commit info
      const lastCommitHash = execSync('git rev-parse HEAD', {
        cwd: this.REPO_ROOT,
        encoding: 'utf8'
      }).trim()

      const lastCommitMessage = execSync('git log -1 --pretty=format:"%s"', {
        cwd: this.REPO_ROOT,
        encoding: 'utf8'
      }).trim()

      return {
        branch,
        hasUncommittedChanges: unstagedFiles.length > 0 || stagedFiles.length > 0,
        unstagedFiles,
        stagedFiles,
        lastCommitHash,
        lastCommitMessage
      }
    } catch (error) {
      throw new Error(`Failed to get Git status: ${error}`)
    }
  }

  /**
   * Stage blog files for commit
   */
  private static async stageBlogFiles(mdxFiles: MDXFileResult[]): Promise<string[]> {
    const stagedFiles: string[] = []

    for (const mdxFile of mdxFiles) {
      try {
        // Verify file exists
        if (!fs.existsSync(mdxFile.filePath)) {
          console.warn(`[GIT PUBLISHER] File not found: ${mdxFile.filePath}`)
          continue
        }

        // Stage the file
        const relativePath = path.relative(this.REPO_ROOT, mdxFile.filePath)
        execSync(`git add "${relativePath}"`, {
          cwd: this.REPO_ROOT,
          stdio: 'pipe'
        })

        stagedFiles.push(relativePath)
        console.log(`[GIT PUBLISHER] Staged: ${relativePath}`)
      } catch (error) {
        console.error(`[GIT PUBLISHER] Failed to stage ${mdxFile.fileName}:`, error)
      }
    }

    return stagedFiles
  }

  /**
   * Create Git commit
   */
  private static async createCommit(
    message: string, 
    author?: { name: string; email: string }
  ): Promise<string> {
    try {
      let commitCommand = `git commit -m "${message}"`

      // Add author if specified
      if (author) {
        commitCommand += ` --author="${author.name} <${author.email}>"`
      }

      execSync(commitCommand, {
        cwd: this.REPO_ROOT,
        stdio: 'pipe'
      })

      // Get the commit hash
      const commitHash = execSync('git rev-parse HEAD', {
        cwd: this.REPO_ROOT,
        encoding: 'utf8'
      }).trim()

      return commitHash
    } catch (error) {
      throw new Error(`Failed to create commit: ${error}`)
    }
  }

  /**
   * Add Git tags
   */
  private static async addTags(tags: string[], commitHash: string): Promise<void> {
    for (const tag of tags) {
      try {
        execSync(`git tag -a "${tag}" ${commitHash} -m "Auto-generated blog post tag"`, {
          cwd: this.REPO_ROOT,
          stdio: 'pipe'
        })
        console.log(`[GIT PUBLISHER] Added tag: ${tag}`)
      } catch (error) {
        console.warn(`[GIT PUBLISHER] Failed to add tag ${tag}:`, error)
      }
    }
  }

  /**
   * Push to remote repository
   */
  private static async pushToRemote(): Promise<void> {
    try {
      // Push commits
      execSync('git push origin HEAD', {
        cwd: this.REPO_ROOT,
        stdio: 'pipe'
      })

      // Push tags
      execSync('git push --tags', {
        cwd: this.REPO_ROOT,
        stdio: 'pipe'
      })

      console.log('[GIT PUBLISHER] Successfully pushed to remote')
    } catch (error) {
      throw new Error(`Failed to push to remote: ${error}`)
    }
  }

  /**
   * Generate commit message for blog posts
   */
  private static generateCommitMessage(mdxFiles: MDXFileResult[]): string {
    if (mdxFiles.length === 1) {
      return `Add blog post: ${mdxFiles[0].frontmatter.title}

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>`
    }

    const titles = mdxFiles.map(f => `- ${f.frontmatter.title}`).join('\n')
    return `Add ${mdxFiles.length} new blog posts

${titles}

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>`
  }

  /**
   * Wait for Vercel deployment to complete
   */
  private static async waitForVercelDeployment(commitHash: string): Promise<string | undefined> {
    console.log('[GIT PUBLISHER] Waiting for Vercel deployment...')

    // In a real implementation, you would:
    // 1. Use Vercel API to check deployment status
    // 2. Poll until deployment is complete
    // 3. Return the deployment URL

    // For now, simulate the wait and return expected URL
    await new Promise(resolve => setTimeout(resolve, 30000)) // Wait 30 seconds

    const deploymentUrl = `https://zazatechnologies.com`
    console.log(`[GIT PUBLISHER] Deployment should be live at: ${deploymentUrl}`)
    
    return deploymentUrl
  }

  /**
   * Rollback last commit (emergency use)
   */
  static async rollbackLastCommit(): Promise<void> {
    try {
      console.log('[GIT PUBLISHER] Rolling back last commit...')

      // Soft reset to keep changes
      execSync('git reset --soft HEAD~1', {
        cwd: this.REPO_ROOT,
        stdio: 'pipe'
      })

      console.log('[GIT PUBLISHER] Rollback completed')
    } catch (error) {
      throw new Error(`Failed to rollback: ${error}`)
    }
  }

  /**
   * Create feature branch for blog posts
   */
  static async createFeatureBranch(branchName: string): Promise<void> {
    try {
      // Create and checkout new branch
      execSync(`git checkout -b ${branchName}`, {
        cwd: this.REPO_ROOT,
        stdio: 'pipe'
      })

      console.log(`[GIT PUBLISHER] Created feature branch: ${branchName}`)
    } catch (error) {
      throw new Error(`Failed to create branch: ${error}`)
    }
  }

  /**
   * Merge feature branch to main
   */
  static async mergeToMain(branchName: string): Promise<void> {
    try {
      // Switch to main
      execSync('git checkout main', {
        cwd: this.REPO_ROOT,
        stdio: 'pipe'
      })

      // Merge feature branch
      execSync(`git merge ${branchName}`, {
        cwd: this.REPO_ROOT,
        stdio: 'pipe'
      })

      // Delete feature branch
      execSync(`git branch -d ${branchName}`, {
        cwd: this.REPO_ROOT,
        stdio: 'pipe'
      })

      console.log(`[GIT PUBLISHER] Merged ${branchName} to main`)
    } catch (error) {
      throw new Error(`Failed to merge branch: ${error}`)
    }
  }

  /**
   * Schedule publication for future date
   */
  static async schedulePublication(
    mdxFiles: MDXFileResult[],
    publishDate: Date,
    options: GitCommitOptions = {}
  ): Promise<{
    scheduledFiles: string[]
    publishDate: string
    branchName: string
  }> {
    try {
      // Create date-based branch name
      const branchName = `blog-posts-${publishDate.toISOString().split('T')[0]}`
      
      // Create feature branch
      await this.createFeatureBranch(branchName)

      // Stage and commit files to feature branch
      const result = await this.publishBlogPosts(mdxFiles, {
        ...options,
        skipPush: false // Push to feature branch
      })

      if (!result.success) {
        throw new Error(`Failed to commit to feature branch: ${result.errors.join(', ')}`)
      }

      // Switch back to main
      execSync('git checkout main', {
        cwd: this.REPO_ROOT,
        stdio: 'pipe'
      })

      console.log(`[GIT PUBLISHER] Scheduled ${mdxFiles.length} posts for ${publishDate}`)

      return {
        scheduledFiles: result.publishedFiles,
        publishDate: publishDate.toISOString(),
        branchName
      }
    } catch (error) {
      throw new Error(`Failed to schedule publication: ${error}`)
    }
  }

  /**
   * Publish scheduled posts
   */
  static async publishScheduledPosts(branchName: string): Promise<PublishResult> {
    try {
      console.log(`[GIT PUBLISHER] Publishing scheduled posts from ${branchName}`)

      // Merge feature branch to main
      await this.mergeToMain(branchName)

      // Push to remote
      await this.pushToRemote()

      return {
        success: true,
        publishedFiles: [],
        errors: [],
        vercelDeploymentUrl: 'https://zazatechnologies.com'
      }
    } catch (error) {
      return {
        success: false,
        publishedFiles: [],
        errors: [error instanceof Error ? error.message : String(error)]
      }
    }
  }

  /**
   * Clean up old blog files (for maintenance)
   */
  static async cleanupOldFiles(daysOld: number = 365): Promise<void> {
    try {
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - daysOld)

      const files = fs.readdirSync(this.BLOG_CONTENT_DIR)
      const filesToRemove: string[] = []

      for (const file of files) {
        if (!file.endsWith('.mdx') && !file.endsWith('.md')) continue

        const filePath = path.join(this.BLOG_CONTENT_DIR, file)
        const stats = fs.statSync(filePath)

        if (stats.mtime < cutoffDate) {
          filesToRemove.push(file)
        }
      }

      if (filesToRemove.length > 0) {
        console.log(`[GIT PUBLISHER] Found ${filesToRemove.length} old files to archive`)
        // In production, you might move files to an archive folder instead of deleting
        
        for (const file of filesToRemove) {
          const filePath = path.join(this.BLOG_CONTENT_DIR, file)
          fs.unlinkSync(filePath)
          console.log(`[GIT PUBLISHER] Removed old file: ${file}`)
        }

        // Commit the cleanup
        await this.publishBlogPosts([], {
          message: `Archive old blog files (${filesToRemove.length} files removed)

Archived files older than ${daysOld} days for maintenance.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>`
        })
      }
    } catch (error) {
      console.error('[GIT PUBLISHER] Cleanup failed:', error)
    }
  }

  /**
   * Get repository statistics
   */
  static async getRepositoryStats(): Promise<{
    totalCommits: number
    blogPostCommits: number
    lastBlogPostDate: Date | null
    activeBranches: string[]
    totalBlogFiles: number
  }> {
    try {
      // Get total commits
      const totalCommits = parseInt(
        execSync('git rev-list --count HEAD', {
          cwd: this.REPO_ROOT,
          encoding: 'utf8'
        }).trim()
      )

      // Get blog post commits (containing "blog post" in message)
      const blogCommitOutput = execSync('git log --oneline --grep="blog post" --grep="Add blog" --all', {
        cwd: this.REPO_ROOT,
        encoding: 'utf8'
      }).trim()
      const blogPostCommits = blogCommitOutput ? blogCommitOutput.split('\n').length : 0

      // Get last blog post date
      let lastBlogPostDate: Date | null = null
      try {
        const lastBlogCommitDate = execSync('git log -1 --format="%ad" --grep="blog post" --grep="Add blog" --all', {
          cwd: this.REPO_ROOT,
          encoding: 'utf8'
        }).trim()
        if (lastBlogCommitDate) {
          lastBlogPostDate = new Date(lastBlogCommitDate)
        }
      } catch (error) {
        // No blog post commits found
      }

      // Get active branches
      const branchOutput = execSync('git branch -r', {
        cwd: this.REPO_ROOT,
        encoding: 'utf8'
      }).trim()
      const activeBranches = branchOutput.split('\n').map(b => b.trim().replace('origin/', ''))

      // Count blog files
      const blogFiles = fs.readdirSync(this.BLOG_CONTENT_DIR)
      const totalBlogFiles = blogFiles.filter(f => f.endsWith('.mdx') || f.endsWith('.md')).length

      return {
        totalCommits,
        blogPostCommits,
        lastBlogPostDate,
        activeBranches,
        totalBlogFiles
      }
    } catch (error) {
      throw new Error(`Failed to get repository stats: ${error}`)
    }
  }
}

// Export types
export type { GitCommitOptions, PublishResult, GitStatus }