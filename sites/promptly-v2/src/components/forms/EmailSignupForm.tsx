export default function EmailSignupForm() {
  return (
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
          Sign Up
        </button>
      </form>
    </div>
  )
}
