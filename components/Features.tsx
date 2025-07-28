export default function Features() {
  const features = [
    {
      title: "🎯 Customised Tone",
      description: "Tailor each comment to match your personal voice or school guidelines.",
    },
    {
      title: "⚡ Instant Generation",
      description: "Generate high-quality comments in seconds—never miss a deadline again.",
    },
    {
      title: "🧠 Context Aware",
      description: "Zaza Promptly remembers your preferences and prior student notes.",
    },
    {
      title: "🌍 Multilingual Ready",
      description: "Generate comments in multiple languages effortlessly for diverse classrooms.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold text-gray-900 mb-12">Why Teachers Love Zaza Promptly</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">{feature.title}</h3>
            <p className="text-gray-700 text-md">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
