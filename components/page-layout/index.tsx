import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface PageLayoutProps {
  title: string;
  description: string;
  image?: string;
  category?: string;
  author?: string;
  pageName?: string;
  disabled?: boolean;
  className?: string;
  colored?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  description,
  image,
  category = 'Products',
  author = 'vSelf Project',
  pageName,
  children,
  disabled,
  className,
  colored = false,
}) => {
  const { asPath } = useRouter();
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const URL = `${origin}${asPath}`;
  const previewImg = image !== undefined ? image : origin + '/ninja2.png';
  return (
    <main className={className ? className : 'flex flex-col sm:justify-center sm:items-center py-[100px]'}>
      <Head>
        <title>{`${title} vSelf`}</title>
        <meta name="title" content={`${title} vSelf`} />
        <meta name="description" content={description} key="desc" />
        <meta property="og:url" content={URL} />
        <meta property="og:site_name" content="vSelf" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${title} vSelf`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={previewImg} />
        <meta property="author" content={author} />
        <meta property="article:author" content={author} />
        <meta property="twitter:title" content={`${title} vSelf`} />
        <meta property="twitter:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:src" content={previewImg} />
        <meta name="twitter:tile:image" content={previewImg} />
      </Head>
      {/** Breadcrumbs
       * // TODO: refactor breadcrumbs
       */}
      {!disabled && (
        <div className="max-w-[1240px] w-full mb-[30px] px-[20px]">
          <nav className="text-[#B1B1B1] font-inter">
            <Link href="/" className="underline">
              Main
            </Link>{' '}
            / {category} /{' '}
            <Link href={`/${pageName?.toLowerCase()}`} className="underline">
              {pageName}
            </Link>{' '}
            /
            <b
              className={
                'font-inter text-[16px] leading-[26px] font-normal ' + colored ? 'text-[#343434]' : 'text-[#fff]'
              }
            >
              {title}
            </b>
          </nav>
        </div>
      )}
      {children}
    </main>
  );
};

export default PageLayout;
