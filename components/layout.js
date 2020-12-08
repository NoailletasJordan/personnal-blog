import Head from 'next/head'
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="container">
      <Head>
        <link rel="icon" href="/favicon.ico" />
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
