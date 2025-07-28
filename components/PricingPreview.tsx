export default function PricingPreview() {
  return (
    <section className="py-20 px-6 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Teacher-Friendly Pricing</h2>
      <p className="mb-8 text-lg text-gray-600">
        One plan. All features. Cancel anytime.
      </p>
      <div className="inline-block bg-white rounded-xl shadow-md p-8">
        <p className="text-3xl font-bold text-indigo-600 mb-2">€14.99 / month</p>
        <p className="text-gray-600 mb-4">Unlimited comment generation</p>
        <a
          href="#"
          className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-indigo-700 transition"
        >
          Start Free Trial
        </a>
      </div>
    </section>
  );
}
