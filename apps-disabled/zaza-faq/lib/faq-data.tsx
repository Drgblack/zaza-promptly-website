import { BookOpen, Lightbulb, Settings, Shield, Handshake, Rocket, type LucideIcon } from "lucide-react"

export interface FaqQuestion {
  question: string
  answer: string
}

export interface FaqSectionData {
  id: string
  title: string
  icon: LucideIcon
  questions: FaqQuestion[]
}

export const faqData: FaqSectionData[] = [
  {
    id: "about-zaza",
    title: "About Zaza",
    icon: BookOpen,
    questions: [
      {
        question: "What is Zaza?",
        answer:
          "Zaza is a suite of AI-powered tools designed to support teachers with tasks like lesson planning, report writing, parent communication, and feedback. All grounded in real pedagogy, not hype.",
      },
      {
        question: "Who is behind Zaza?",
        answer:
          "Zaza was founded by Dr. Greg Blackburn, a Global Director of Learning with over 20 years in education and learning science. Every tool is built by learning experts, not marketers.",
      },
      {
        question: "How is Zaza different from other AI edtech tools?",
        answer:
          "While most tools repurpose general-purpose AI, Zaza is designed from the ground up for teachers: with classroom-tested templates, curriculum-aligned outputs, and a focus on real educator needs.",
      },
      {
        question: 'What does "educator-first AI" actually mean?',
        answer:
          "It means Zaza is built with and for teachers. Every feature prioritises teaching realities: clarity, trust, and alignment with professional values.",
      },
      {
        question: "Is Zaza one app or a suite of tools?",
        answer:
          "Zaza is an ecosystem. While you can use each app on its own (like Zaza Promptly or Zaza Teach), they're designed to work together seamlessly.",
      },
    ],
  },
  {
    id: "ai-in-education",
    title: "AI in Education",
    icon: Lightbulb,
    questions: [
      {
        question: "How does Zaza ensure AI-generated content is safe and accurate?",
        answer:
          "Zaza uses carefully structured prompts and templates designed by educators. Outputs are reviewed regularly, and we avoid hallucination-prone models for critical tasks.",
      },
      {
        question: "Is Zaza aligned with curriculum standards?",
        answer:
          "Yes. Each tool is mapped to core pedagogical practices and curriculum frameworks. Feedback and templates reflect real-world education language and learning outcomes.",
      },
      {
        question: "Can I customise Zaza's tone or teaching style?",
        answer:
          'Absolutely. You can choose from tones like "supportive," "direct," or "factual," and adjust responses before sending.',
      },
      {
        question: "Do real teachers review Zaza's outputs?",
        answer: "Yes. Every tool is tested by real educators, and we continuously improve based on teacher feedback.",
      },
      {
        question: "Is AI replacing teachers?",
        answer:
          "No. Zaza is designed to support teachers, never replace them. It automates repetitive writing tasks so teachers can focus on students.",
      },
    ],
  },
  {
    id: "using-zaza-tools",
    title: "Using Zaza Tools",
    icon: Settings,
    questions: [
      {
        question: "How do I get started with Zaza?",
        answer:
          "Visit zazateach.com to download or launch your first tool. Most tools have free plans to help you explore before subscribing.",
      },
      {
        question: "What's included in the free version?",
        answer:
          "Free versions typically offer a limited number of lesson plans, messages, or comment drafts each month. You can upgrade anytime for unlimited access and extra features.",
      },
      {
        question: "Can I use Zaza on my phone and desktop?",
        answer: "Yes. Zaza tools are available on mobile and desktop, with synced history and account management.",
      },
      {
        question: "Is there a subscription? How does billing work?",
        answer:
          "Yes. Monthly and annual plans are available. Subscriptions can be managed via the website or app store.",
      },
      {
        question: "Can I use Zaza with my school's LMS or Google Classroom?",
        answer:
          "Some tools integrate with LMS platforms or allow easy export/import. Full integrations are coming soon.",
      },
      {
        question: "Why wouldn't teachers just use ChatGPT?",
        answer:
          "While ChatGPT is powerful, it's a general-purpose tool that requires extensive prompting and often produces generic outputs. Zaza is purpose-built for education with pre-designed templates, curriculum-aligned language, and educator-tested workflows. It understands teaching contexts, maintains appropriate professional tone, and saves time by eliminating the need to craft complex prompts for every task.",
      },
    ],
  },
  {
    id: "data-privacy-safety",
    title: "Data, Privacy & Safety",
    icon: Shield,
    questions: [
      {
        question: "Is my data safe with Zaza?",
        answer: "Yes. Zaza uses secure encryption and follows best practices for data protection and AI transparency.",
      },
      {
        question: "Does Zaza store student information?",
        answer:
          "No student data is stored unless explicitly entered by the teacher. Even then, it's not shared or used to train any models.",
      },
      {
        question: "Is Zaza GDPR-compliant?",
        answer: "Yes. We are based in the EU and fully compliant with GDPR and other major data privacy regulations.",
      },
      {
        question: "Can schools manage access and permissions centrally?",
        answer:
          "Yes. School and district accounts can manage users, permissions, and billing from a central dashboard.",
      },
      {
        question: "What happens to my data if I delete my account?",
        answer: "All personal data is permanently deleted, and any stored content is purged from our systems.",
      },
    ],
  },
  {
    id: "partners-licensing",
    title: "Partners & Licensing",
    icon: Handshake,
    questions: [
      {
        question: "Do you offer school-wide or district-wide licences?",
        answer: "Yes. We offer bulk licensing with centralised admin controls and custom onboarding support.",
      },
      {
        question: "How do I bring Zaza to my school?",
        answer: "Visit the Partner page on zazateach.com or contact us to schedule a demo.",
      },
      {
        question: "Is there a partner or affiliate programme?",
        answer:
          "Yes. We welcome collaborators who want to promote Zaza, especially educators, EdTech coaches, and consultants.",
      },
      {
        question: "Can Zaza be white-labelled or customised for our organisation?",
        answer: "For large deployments, yes. Reach out to discuss enterprise customisation and support.",
      },
    ],
  },
  {
    id: "whats-coming-next",
    title: "What's Coming Next",
    icon: Rocket,
    questions: [
      {
        question: "What new apps are coming to the Zaza ecosystem?",
        answer:
          "Zaza Visuals (for AI-generated classroom visuals), Zaza Coach (for teacher feedback), and Zaza HR Spark (for workplace learning) are in development.",
      },
      {
        question: "Can I request a feature or app idea?",
        answer: "Yes, we love teacher-led innovation. Use the feedback form on our website to share your ideas.",
      },
      {
        question: "Where can I follow updates on Zaza's roadmap?",
        answer: "Follow @zazateach on X/Twitter, or join our email list for early access and updates.",
      },
    ],
  },
]
