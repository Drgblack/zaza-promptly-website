interface InlineEmailCaptureProps {
  variant?: string;
  source?: string;
  title?: string;
  description?: string;
  className?: string;
}

export default function Component({ 
  variant = "default", 
  source = "unknown", 
  title, 
  description,
  className 
}: InlineEmailCaptureProps) {
  return (
    <div className={`p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg ${className || ''}`}>
      {title && (
        <h3 className="text-lg font-semibold text-center mb-2">{title}</h3>
      )}
      {description && (
        <p className="text-gray-600 text-center mb-4">{description}</p>
      )}
      <div className="max-w-md mx-auto">
        <form className="flex gap-2">
          <input 
            type="email" 
            placeholder="Enter your email"
            className="flex-1 px-3 py-2 border rounded-md"
          />
          <button 
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}

// Named exports for flexibility
export const InlineemailcaptureSection = Component
export const Inlineemailcapture = Component
export const InlineEmailCapture = Component
