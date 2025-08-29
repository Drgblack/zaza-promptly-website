export function StripeCheckout() {
  return <div>Stripe Checkout</div>
}

interface ProductPricingProps {
  productId: string;
}

export function ProductPricing({ productId }: ProductPricingProps) {
  return (
    <div className="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Zaza Promptly Individual</h3>
      <div className="text-3xl font-bold mb-4">$14.99<span className="text-base font-normal">/month</span></div>
      <ul className="text-sm text-gray-600 space-y-2 mb-6">
        <li>✓ Unlimited AI-generated comments</li>
        <li>✓ Parent email templates</li>
        <li>✓ Report writing assistance</li>
        <li>✓ GDPR compliant & secure</li>
      </ul>
      <button className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">
        Start Free Trial
      </button>
    </div>
  )
}
