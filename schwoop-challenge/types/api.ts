export interface SubmitTikTokRequest {
  tiktokUrl: string
}

export interface SubmitTikTokResponse {
  success: boolean
  message: string
  submittedUrl?: string
  error?: string
}

export interface FormState {
  tiktokUrl: string
  isLoading: boolean
  isSubmitted: boolean
  error: string | null
  validationError: string | null
}

export interface ValidationResult {
  isValid: boolean
  error?: string
}
