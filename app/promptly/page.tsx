import type { Metadata } from 'next';
import ProductPage from '@/components/ProductPage';
import { generateProductMetadata } from '@/lib/metadata-generator';

// Generate localized metadata
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  
  // Base metadata for Promptly product page with comprehensive SEO
  return generateProductMetadata(
    'Zaza Promptly',
    locale === 'de' 
      ? 'KI-gestütztes Tool für Lehrkräfte. Schreiben Sie professionelle Eltern-E-Mails, Schülerkommentare und Berichte 10x schneller. Von 12.000+ Pädagogen vertraut. DSGVO-konform, halluzinations-sicher.'
      : locale === 'es'
      ? 'Herramienta de IA para profesores. Escriba correos profesionales a padres, comentarios de estudiantes e informes 10 veces más rápido. Confiado por 12,000+ educadores. Compatible con GDPR, seguro contra alucinaciones.'
      : locale === 'fr' 
      ? 'Outil IA pour enseignants. Rédigez des e-mails professionnels aux parents, commentaires d\'élèves et rapports 10x plus vite. Approuvé par 12 000+ éducateurs. Conforme RGPD, sécurisé contre les hallucinations.'
      : locale === 'it'
      ? 'Strumento IA per insegnanti. Scrivi email professionali ai genitori, commenti degli studenti e rapporti 10x più velocemente. Fidato da 12.000+ educatori. Conforme GDPR, sicuro dalle allucinazioni.'
      : 'Safe AI tool for teachers writing parent communications, reports & professional messages. Hallucination-safe AI designed by educators. GDPR compliant, reduces teacher workload by 3-5 hours/week.',
    'promptly',
    locale === 'de' 
      ? ['KI für Lehrkräfte', 'Eltern-E-Mails KI', 'Lehrerberichte KI', 'sichere KI für Schulen', 'DSGVO-konforme KI']
      : locale === 'es'
      ? ['IA para profesores', 'emails padres IA', 'reportes estudiantes IA', 'IA segura escuelas', 'IA conforme GDPR']  
      : locale === 'fr'
      ? ['IA pour enseignants', 'emails parents IA', 'rapports étudiants IA', 'IA sécurisée écoles', 'IA conforme RGPD']
      : locale === 'it'
      ? ['IA per insegnanti', 'email genitori IA', 'rapporti studenti IA', 'IA sicura scuole', 'IA conforme GDPR']
      : ['AI for teacher reports', 'AI for parent communication', 'safe AI for teachers', 'hallucination-safe AI', 'GDPR compliant AI for teachers']
  );
}

export default async function PromptlyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const title = locale === 'de' 
    ? 'Zaza Promptly - KI für Lehrkräfte'
    : locale === 'es'
    ? 'Zaza Promptly - IA para Profesores'
    : locale === 'fr'
    ? 'Zaza Promptly - IA pour Enseignants'
    : locale === 'it'
    ? 'Zaza Promptly - IA per Insegnanti'
    : 'Zaza Promptly - AI for Teachers';

  const description = locale === 'de' 
    ? 'KI-gestütztes Tool für Lehrkräfte. Schreiben Sie einfühlsame, professionelle Elternnachrichten und Zeugnisbemerkungen in Minuten statt Stunden.'
    : locale === 'es'
    ? 'Herramienta de IA para profesores. Escriba mensajes profesionales y empáticos para padres y comentarios de informes en minutos, no horas.'
    : locale === 'fr'  
    ? 'Outil IA pour enseignants. Rédigez des messages professionnels et empathiques aux parents et des commentaires de rapports en minutes, pas en heures.'
    : locale === 'it'
    ? 'Strumento IA per insegnanti. Scrivi messaggi professionali ed empatici ai genitori e commenti sui rapporti in minuti, non ore.'
    : 'AI-powered helper for teachers. Write caring, professional parent messages and report comments in minutes, not hours.';

  return <ProductPage title={title} description={description} locale={locale} />;
}