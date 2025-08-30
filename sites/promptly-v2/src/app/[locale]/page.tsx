// sites/promptly-v2/src/app/[locale]/page.tsx
import LocalizedHomePage from '@/components/i18n/LocalizedHomePage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Page({ params }: { params: { locale: string } }) {
  return <LocalizedHomePage locale={params.locale} />;
}