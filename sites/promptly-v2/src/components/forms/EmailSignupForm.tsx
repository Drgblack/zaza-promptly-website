interface EmailSignupFormProps {
  variant?: string;
  source?: string;
  headline?: string;
  subtext?: string;
  className?: string;
  showNameFields?: boolean;
  buttonText?: string;
}

export default function EmailSignupForm({ 
  variant = "default", 
  source = "unknown", 
  headline, 
  subtext,
  className,
  showNameFields = false,
  buttonText = "Sign Up"
}: EmailSignupFormProps) {
  return (
    <div className={`max-w-md mx-auto ${className || ''}`}>
      {headline && (
        <h3 className="text-xl font-semibold text-center mb-2">{headline}</h3>
      )}
      {subtext && (
        <p className="text-gray-600 text-center mb-4">{subtext}</p>
      )}
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
          {buttonText}
        </button>
      </form>
    </div>
  )
}
