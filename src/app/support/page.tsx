export default function Support() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Support</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get Help with Zaza Products</h2>
            <p className="text-gray-600 mb-6">
              Need assistance with any of our products? We're here to help you succeed.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Support</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                <strong>Email:</strong> support@zazatechnologies.com
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Response Time:</strong> Within 24 hours
              </p>
              <p className="text-gray-700">
                <strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM EST
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Product Support</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 p-6 rounded-lg">
                <h4 className="font-semibold text-purple-700 mb-2">Zaza Promptly</h4>
                <p className="text-gray-600 mb-3">AI-powered student comments for teachers</p>
                <a href="/promptly-faq" className="text-purple-600 hover:underline">View FAQ →</a>
              </div>
              
              <div className="border border-gray-200 p-6 rounded-lg">
                <h4 className="font-semibold text-purple-700 mb-2">Zaza Teach</h4>
                <p className="text-gray-600 mb-3">AI lesson planning tool for teachers</p>
                <a href="#" className="text-purple-600 hover:underline">Coming Soon →</a>
              </div>
              
              <div className="border border-gray-200 p-6 rounded-lg">
                <h4 className="font-semibold text-purple-700 mb-2">Zaza Inbox</h4>
                <p className="text-gray-600 mb-3">Smart email management for educators</p>
                <a href="#" className="text-purple-600 hover:underline">Coming Soon →</a>
              </div>
              
              <div className="border border-gray-200 p-6 rounded-lg">
                <h4 className="font-semibold text-purple-700 mb-2">Zaza Visuals</h4>
                <p className="text-gray-600 mb-3">AI-powered visual content creation</p>
                <a href="#" className="text-purple-600 hover:underline">Coming Soon →</a>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Common Questions</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-800">How do I get started with Zaza Promptly?</h4>
                <p className="text-gray-600 mt-1">Sign up for a free account and start generating comments in minutes. No credit card required.</p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-800">Can I cancel my subscription anytime?</h4>
                <p className="text-gray-600 mt-1">Yes, you can cancel your subscription at any time with no cancellation fees.</p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-800">Do you offer school licenses?</h4>
                <p className="text-gray-600 mt-1">Yes, we offer special pricing for schools and institutions. Contact us for details.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
} 