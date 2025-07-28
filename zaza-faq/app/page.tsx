// SEO meta tags injected by automation
import { redirect } from "next/navigation"
import Head from "next/head";
import { BRAND_NAME, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, BASE_URL } from "@zaza/shared-components/lib/seo";

export default function Page() {
  return (
    <>
      <Head>
        <title>Zaza FAQ | {BRAND_NAME}</title>
        <meta name="description" content="Frequently asked questions about Zaza products and services. {DEFAULT_DESCRIPTION}" />
        <meta property="og:title" content="Zaza FAQ | {BRAND_NAME}" />
        <meta property="og:description" content="Frequently asked questions about Zaza products and services. {DEFAULT_DESCRIPTION}" />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:url" content={`${BASE_URL}/zaza-faq`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Zaza FAQ | {BRAND_NAME}" />
        <meta name="twitter:description" content="Frequently asked questions about Zaza products and services. {DEFAULT_DESCRIPTION}" />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Head>
      {/* ... existing page content ... */}
    </>
  );
}
