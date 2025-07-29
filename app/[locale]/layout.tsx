import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {locales} from '@/i18n';
import {Inter} from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  
  const metaTitles = {
    en: 'Zaza Promptly - AI-Powered Parent Communication for Teachers',
    de: 'Zaza Promptly - KI-gestützte Elternkommunikation für Lehrer',
    fr: 'Zaza Promptly - Communication parent-enseignant alimentée par l\'IA',
    es: 'Zaza Promptly - Comunicación parental impulsada por IA para maestros',
    it: 'Zaza Promptly - Comunicazione genitore-insegnante potenziata dall\'IA'
  };

  const metaDescriptions = {
    en: 'Transform your teaching with AI-powered tools for professional parent communication. Save hours every week while building stronger family relationships.',
    de: 'Transformieren Sie Ihren Unterricht mit KI-gestützten Tools für professionelle Elternkommunikation. Sparen Sie jede Woche Stunden und bauen Sie stärkere Familienbeziehungen auf.',
    fr: 'Transformez votre enseignement avec des outils alimentés par l\'IA pour la communication parentale professionnelle. Économisez des heures chaque semaine tout en renforçant les relations familiales.',
    es: 'Transforma tu enseñanza con herramientas impulsadas por IA para comunicación parental profesional. Ahorra horas cada semana mientras fortaleces las relaciones familiares.',
    it: 'Trasforma il tuo insegnamento con strumenti potenziati dall\'IA per la comunicazione genitoriale professionale. Risparmia ore ogni settimana mentre rafforzi le relazioni familiari.'
  };

  return {
    title: metaTitles[locale as keyof typeof metaTitles] || metaTitles.en,
    description: metaDescriptions[locale as keyof typeof metaDescriptions] || metaDescriptions.en,
    alternates: {
      canonical: `https://zazapromptly.com${locale === 'en' ? '' : `/${locale}`}`,
      languages: {
        'en': 'https://zazapromptly.com',
        'de': 'https://zazapromptly.com/de',
        'fr': 'https://zazapromptly.com/fr',
        'es': 'https://zazapromptly.com/es',
        'it': 'https://zazapromptly.com/it',
        'x-default': 'https://zazapromptly.com'
      }
    },
    openGraph: {
      title: metaTitles[locale as keyof typeof metaTitles] || metaTitles.en,
      description: metaDescriptions[locale as keyof typeof metaDescriptions] || metaDescriptions.en,
      url: `https://zazapromptly.com${locale === 'en' ? '' : `/${locale}`}`,
      siteName: 'Zaza Promptly',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@ZazaPromptly',
      title: metaTitles[locale as keyof typeof metaTitles] || metaTitles.en,
      description: metaDescriptions[locale as keyof typeof metaDescriptions] || metaDescriptions.en,
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir="ltr">
      <head>
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://zazapromptly.com"
        />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://zazapromptly.com"
        />
        <link
          rel="alternate"
          hrefLang="de"
          href="https://zazapromptly.com/de"
        />
        <link
          rel="alternate"
          hrefLang="fr"
          href="https://zazapromptly.com/fr"
        />
        <link
          rel="alternate"
          hrefLang="es"
          href="https://zazapromptly.com/es"
        />
        <link
          rel="alternate"
          hrefLang="it"
          href="https://zazapromptly.com/it"
        />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}