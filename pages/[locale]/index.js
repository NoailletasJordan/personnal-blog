const contentful = require('contentful')
const ReactRotatingText = require('react-rotating-text')
import Head from 'next/head'
import SideArticle from '../../components/Article/components/SideArticle'
import Layout from '../../components/Layout'
import styles from '../../styles/index.module.scss'
import translation from '../../translation'

export async function getStaticPaths() {
  // Needs to match translation object keys, and contentfuls Locales
  const locales = ['fr', 'en']
  const paths = locales.map((locale) => ({
    params: { locale },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  let props = {}
  props.locale = params.locale

  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })

  try {
    let { items } = await client.getEntries({
      content_type: 'blogPost',
      locale: params.locale,
    })

    props.articles = items.sort(
      (x, y) =>
        new Date(y.fields.publishedDate) - new Date(x.fields.publishedDate),
    )

    const otherLanguage = props.locale === 'fr' ? 'en' : 'fr'
    props.switchLanguageLink = `/${otherLanguage}`
  } catch (error) {
    console.log(error)
  }

  return {
    props,
  }
}

export default function Home({ articles, ...props }) {
  const t = translation[props.locale]
  return (
    <Layout locale={props.locale} switchLanguageLink={props.switchLanguageLink}>
      <Head>
        <title>{t.homepage_banner_title}</title>
        <meta name="description" content={t.homepage_meta_description} />
        <meta
          property="og:image"
          content="https://jordannoailletas.com/assets/image-blog.jpg"
        />
        <meta property="og:title" content={t.homepage_banner_title} />
        <meta property="og:description" content={t.homepage_meta_description} />
      </Head>
      <div className={styles.container}>
        <div className={styles.banner}>
          <div className={styles.banner__left}>
            <div className={styles.banner__left__bonjour}>
              {t.homepage_banner_hello}
            </div>
            <div className={styles.banner__left__description}>
              {t.homepage_banner_description}
              <ReactRotatingText
                className="rotating__text"
                items={[
                  'javascript',
                  'react',
                  'headless-cms',
                  'backend',
                  'dev',
                  'scss',
                  'databases',
                  'nextjs',
                  'jamstack',
                  'nodejs',
                ]}
              />
            </div>
            <a
              href="https://jordannoailletas.com"
              className={styles.banner__left__button}
            >
              {t.homepage_banner_button_action}
            </a>
          </div>
          <div className={styles.banner__right}>
            <img src={'/homepage-hero.svg'} alt="My SVG" />
          </div>
        </div>

        <div className={styles.grid}>
          {articles.map((article) => (
            <SideArticle article={article} key={Math.random()} />
          ))}
        </div>
      </div>
    </Layout>
  )
}
