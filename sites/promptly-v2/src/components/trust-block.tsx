import { TrustBadges } from './trust-badges'

export default function Component() {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Educators Worldwide
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built by a PhD educator with safety, privacy, and pedagogy at the core. 
            Join thousands of teachers who trust Zaza Promptly with their most important work.
          </p>
        </div>
        
        <TrustBadges />
        
        {/* FAQ Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">Is my data secure?</h4>
              <p className="text-gray-600 text-sm">
                Yes. We use enterprise-grade security and are GDPR compliant. Your data is encrypted and never shared.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">How does AI help my teaching?</h4>
              <p className="text-gray-600 text-sm">
                Our AI generates professional comments, emails, and feedback while maintaining your personal teaching style.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">Can I trust the AI suggestions?</h4>
              <p className="text-gray-600 text-sm">
                Our AI is designed to be transparent and hallucination-safe. Every suggestion can be customized to fit your needs.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">How much time will I save?</h4>
              <p className="text-gray-600 text-sm">
                Teachers report saving 5+ hours per week on administrative tasks, giving them more time for actual teaching.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Named exports for flexibility
export const TrustblockSection = Component
export const Trustblock = Component
export const TrustBlock = Component
