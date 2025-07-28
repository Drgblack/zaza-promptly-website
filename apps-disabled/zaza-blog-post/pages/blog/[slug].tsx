import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Head from 'next/head';

const POSTS_PATH = path.join(process.cwd(), 'apps/zaza-blog-post/content/posts');

export default function BlogPost({ source, frontMatter }: { source: MDXRemoteSerializeResult; frontMatter: any }) {
  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
        <meta name="description" content={frontMatter.description} />
        <meta property="og:title" content={frontMatter.title} />
        <meta property="og:description" content={frontMatter.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://zazatechnologies.com/blog/${frontMatter.slug}`} />
        <link rel="canonical" href={`https://zazatechnologies.com/blog/${frontMatter.slug}`} />
      </Head>
      <article className="prose mx-auto my-12">
        <h1>{frontMatter.title}</h1>
        <MDXRemote {...source} />
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(POSTS_PATH);
  const paths = files.map((file) => ({
    params: { slug: file.replace(/\.mdx?$/, '') },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(source);
  const mdxSource = await serialize(content, { scope: data });
  return {
    props: {
      source: mdxSource,
      frontMatter: { ...data, slug },
    },
  };
}; 