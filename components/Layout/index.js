import Head from 'next/head'
import Link from 'next/link'
import translation from '../../translation'

export default function Layout({ children, locale, switchLanguageLink }) {
  const t = translation[locale] || {}
  const flagOtherLanguage = locale === 'fr' ? 'en' : 'fr'

  return (
    <div className="container">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div className="header_container">
          <Link href={`/${locale}`}>
            <div className="logo">{t.homepage_banner_button_homepage}</div>
          </Link>
          <nav className="header_nav">
            {switchLanguageLink ? (
              <Link className="header_navitem" href={switchLanguageLink}>
                <div>Switch to</div>
                <div
                  style={{
                    backgroundImage: `url('/flag-${flagOtherLanguage}.png')`,
                  }}
                  className="flag"
                ></div>
              </Link>
            ) : null}
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
