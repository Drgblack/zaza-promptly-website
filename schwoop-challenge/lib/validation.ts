import type { ValidationResult } from "@/types/api"

export const TIKTOK_URL_PATTERNS = [
  /^https?:\/\/(www\.)?tiktok\.com\/@[\w.-]+\/video\/\d+/,
  /^https?:\/\/vm\.tiktok\.com\/[\w\d]+/,
  /^https?:\/\/(www\.)?tiktok\.com\/t\/[\w\d]+/,
  /^https?:\/\/vt\.tiktok\.com\/[\w\d]+/,
]

export function validateTikTokUrl(url: string): ValidationResult {
  if (!url || url.trim() === "") {
    return {
      isValid: false,
      error: "TikTok URL is required",
    }
  }

  const trimmedUrl = url.trim()

  // Check if it matches any of the TikTok URL patterns
  const isValidTikTokUrl = TIKTOK_URL_PATTERNS.some((pattern) => pattern.test(trimmedUrl))

  if (!isValidTikTokUrl) {
    return {
      isValid: false,
      error:
        "Please enter a valid TikTok URL (e.g., https://tiktok.com/@user/video/123 or https://vm.tiktok.com/abc123)",
    }
  }

  return { isValid: true }
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}
