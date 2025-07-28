import type { ResourceCard } from "@/types/resource"

export const sampleResources: ResourceCard[] = [
  {
    id: "lesson-plan-fractions",
    title: "Interactive Fractions Lesson Plan",
    description:
      "A comprehensive lesson plan for teaching fractions to Year 4 students with hands-on activities, visual aids, and assessment rubrics.",
    downloadUrl: "/resources/fractions-lesson-plan.pdf",
    accessLevel: "instant",
    category: "Mathematics",
    fileType: "pdf",
  },
  {
    id: "reading-comprehension-kit",
    title: "Reading Comprehension Toolkit",
    description:
      "Complete toolkit with 20 reading passages, comprehension questions, and answer keys for Key Stage 2 students.",
    downloadUrl: "/resources/reading-comprehension-kit.zip",
    accessLevel: "email",
    category: "English",
    fileType: "zip",
  },
  {
    id: "science-experiment-guide",
    title: "Primary Science Experiments",
    description:
      "15 safe and engaging science experiments perfect for primary classrooms, complete with materials lists and safety guidelines.",
    downloadUrl: "/resources/science-experiments.docx",
    accessLevel: "instant",
    category: "Science",
    fileType: "docx",
  },
  {
    id: "behaviour-management-system",
    title: "Positive Behaviour Management System",
    description:
      "Evidence-based behaviour management strategies with printable charts, reward systems, and parent communication templates.",
    downloadUrl: "/resources/behaviour-management.pdf",
    accessLevel: "enhanced",
    category: "Classroom Management",
    fileType: "pdf",
  },
  {
    id: "phonics-presentation",
    title: "Interactive Phonics Presentation",
    description:
      "Engaging PowerPoint presentation for teaching Phase 3 phonics with animations, sounds, and interactive elements.",
    downloadUrl: "/resources/phonics-phase3.pptx",
    accessLevel: "email",
    category: "English",
    fileType: "pptx",
  },
  {
    id: "maths-assessment-pack",
    title: "Year 6 Maths Assessment Pack",
    description:
      "Comprehensive assessment materials for Year 6 mathematics including practice papers, mark schemes, and progress tracking sheets.",
    downloadUrl: "/resources/y6-maths-assessment.zip",
    accessLevel: "enhanced",
    category: "Mathematics",
    fileType: "zip",
  },
]
