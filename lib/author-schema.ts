interface PersonJsonLdOptions {
  urlBase: string;
  name: string;
  sameAs?: string[];
  role?: string;
  affiliation?: string;
}

export function getAuthorPersonJsonLd({
  urlBase,
  name,
  sameAs = [],
  role,
  affiliation
}: PersonJsonLdOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: name,
    url: `${urlBase}/about-founder`,
    jobTitle: role || 'Founder',
    worksFor: {
      '@type': 'Organization',
      name: affiliation || 'Zaza Technologies',
      url: urlBase
    },
    sameAs: sameAs,
    image: `${urlBase}/images/founder.jpg`,
    description: `${name} is the founder of Zaza Technologies, with expertise in educational technology and AI for teachers.`
  };
}