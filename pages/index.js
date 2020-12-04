import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import styles from '../styles/index.module.scss'
import ArticleMini from '../components/articleMini'
import WebDevSvg from '../components/webdevSvg'
const contentful = require('contentful')
const ReactRotatingText = require('react-rotating-text')

export default function Home({ articles }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.banner}>
          <div className={styles.banner__left}>
            <div className={styles.banner__left__bonjour}>Bonjour 👋</div>
            <div className={styles.banner__left__description}>
              Je suis Jordan, ici je parle <br /> de{' '}
              <ReactRotatingText
                className="rotating__text"
                items={[
                  'javascript',
                  'react',
                  'headless-cms',
                  'backend',
                  'développement',
                  'css',
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
              Présentation
            </a>
          </div>
          <div className={styles.banner__right}>
            <WebDevSvg />
          </div>
        </div>

        <div className={styles.grid}>
          {articles.map((article) => (
            <ArticleMini article={article} key={Math.random()} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  let props = {}
  // Log into Contenful SDK
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })

  try {
    // Fetch blog posts
    let { items } = await client.getEntries({ content_type: 'blogPost' })

    // Attach and sort articles to props
    props.articles = [...items].sort(
      (x, y) =>
        new Date(y.fields.publishedDate) - new Date(x.fields.publishedDate)
    )
  } catch (error) {
    console.log(error)
  }

  // Send props
  return {
    props,
  }
}
