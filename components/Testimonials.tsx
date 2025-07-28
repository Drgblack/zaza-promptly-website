export default function Testimonials() {
  const quotes = [
    {
      name: "Sarah Mitchell",
      role: "Grade 4 Teacher, London",
      text: "Zaza Promptly saved me days of report writing. It’s honestly a game-changer.",
    },
    {
      name: "Mr. Johnson",
      role: "Year 7 English, Australia",
      text: "I was sceptical… but now I use it every week. The tone and detail are spot on.",
    },
    {
      name: "Dr. Lisa Cheng",
      role: "School Principal, California",
      text: "Teachers at my school adore this tool. It improves quality while saving time.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-white text-center">
      <h2 className="text-4xl font-bold text-gray-900 mb-12">What Teachers Are Saying</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {quotes.map((quote, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg p-6 shadow hover:shadow-lg transition"
          >
            <p className="italic text-gray-700 mb-4">“{quote.text}”</p>
            <p className="font-semibold text-indigo-700">{quote.name}</p>
            <p className="text-sm text-gray-500">{quote.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
