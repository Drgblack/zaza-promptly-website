import { ProductPageTemplate } from './product-page-template';

export function LooopProductPage() {
  return (
    <ProductPageTemplate
      title="Zaza Looop"
      tagline="Language learning that brings cultures to life."
      problemTitle="Language Teaching Needs More Than Grammar"
      problemText="Your students need cultural connection, not just vocabulary lists. You want immersive experiences, but finding authentic resources takes hours. Traditional language apps miss the heart of communication."
      solutionTitle="Immersive Learning Made Simple"
      solutionText="Zaza Looop creates culturally rich language experiences for your classroom. From authentic conversations to cultural insights, give your students the real-world connection they need to truly learn a language."
      benefitsTitle="Bring Languages to Life:"
      benefits={[
        { icon: "Globe", text: "Cultural immersion without leaving the classroom", color: "text-blue-600" },
        { icon: "Heart", text: "Authentic conversations that engage and inspire", color: "text-red-600" },
        { icon: "BookOpen", text: "Teacher-friendly resources ready to use immediately", color: "text-green-600" },
        { icon: "Users", text: "Bilingual classroom support for diverse learning needs", color: "text-purple-600" },
        { icon: "Lightbulb", text: "Professional development for teachers building language skills", color: "text-yellow-600" },
        { icon: "Languages", text: "Student engagement through meaningful cultural connections", color: "text-indigo-600" },
      ]}
      testimonialQuote="My students are finally excited about Spanish class. The cultural connections make all the difference — they're not just learning words, they're discovering worlds."
      testimonialAuthor="Carmen S., Spanish Teacher"
      credibilityText="<strong>Pedagogically Sound</strong><br/>Developed by Dr. Greg Blackburn, ensuring every feature aligns with best practices in language education and cultural competency."
      ctaTitle="Ready to revolutionise language learning?"
      ctaDescription="Join our community of educators bringing authentic cultural experiences to their classrooms."
      ctaButtonText="Join the Community"
      ctaProcessingText="Joining Community..."
      ctaSecondaryText="🌍 Cultural immersion • 💬 Authentic conversations • ⚡ Ready to use"
      backgroundColor="bg-gradient-to-br from-pink-50 via-rose-50 to-red-50"
      isDark={false}
      productSource="zaza_looop_product_page"
    />
  );
}