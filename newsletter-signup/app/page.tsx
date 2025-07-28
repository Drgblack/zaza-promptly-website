// SEO meta tags injected by automation
import Head from "next/head";
import { BRAND_NAME, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, BASE_URL } from "@zaza/shared-components/lib/seo";
import NewsletterSignup from "../newsletter-signup"

export default function Page() {
  return (
    <>
      <Head>
        <title>Newsletter Signup | {BRAND_NAME}</title>
        <meta name="description" content="Join the Zaza newsletter for updates on AI-powered education tools. {DEFAULT_DESCRIPTION}" />
        <meta property="og:title" content="Newsletter Signup | {BRAND_NAME}" />
        <meta property="og:description" content="Join the Zaza newsletter for updates on AI-powered education tools. {DEFAULT_DESCRIPTION}" />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:url" content={`${BASE_URL}/newsletter-signup`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Newsletter Signup | {BRAND_NAME}" />
        <meta name="twitter:description" content="Join the Zaza newsletter for updates on AI-powered education tools. {DEFAULT_DESCRIPTION}" />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Head>
      <main>
        <NewsletterSignup />
      </main>
    </>
  )
}
