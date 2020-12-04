import Head from 'next/head'
import Link from 'next/link'

const name = 'Travis Skrrrt'
export const siteTitle = 'Blog web développement'

export default function Layout({ children }) {
  return (
    <div className="container">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Personnal blog" />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />

        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />

        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <header>
        <div className="header_container">
          <Link href="/">
            <a>
              <div className="logo">Dev Blog</div>
            </a>
          </Link>
          <nav className="header_nav">
            <div className="header_navitem">
              <a href="mailto:j.noailletas@gmail.com">Contact</a>
            </div>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
