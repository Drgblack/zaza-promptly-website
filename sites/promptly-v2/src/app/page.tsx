// sites/promptly-v2/src/app/page.tsx
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export default function Root() {
  // Emergency redirect to /en for production fix
  redirect('/en');
}
