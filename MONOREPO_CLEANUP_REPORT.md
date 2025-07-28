# Monorepo Cleanup Report

## 1. README.md and TODO.txt Files
- No unused README.md or TODO.txt files were found for deletion in the monorepo.

## 2. Unused Components
- No explicit unused or deprecated components were detected by codebase search. However, a manual review is recommended for components in `shared-components/` and `apps/` that are not imported or referenced anywhere.

## 3. Unreachable Routes
- No unreachable or dead routes were detected by codebase search. If you suspect any, please review your route definitions and navigation structure for orphaned or unlinked pages.

## 4. Other Leftovers
- No additional leftover files were flagged for removal.

---

**Next Steps:**
- Consider running a static analysis tool (like ts-prune, unused-imports, or next-unused) for deeper dead code detection.
- Review navigation and route configs for any orphaned or unreachable pages.
- If you want a more aggressive cleanup or want to target specific files/folders, let me know! 