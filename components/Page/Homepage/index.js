import Head from 'next/head'
import Layout from '../../../components/Layout'
import styles from '../../../styles/index.module.scss'
const ReactRotatingText = require('react-rotating-text')
// temp delete
export default function Home({ articles, test }) {
  return (
    <Layout home>
      <Head>
        <title>Blog développement web</title>
        <meta
          name="description"
          content="Blog traitant de développement web et des nouvelles technologies"
        />
        <meta
          property="og:title"
          content="Blog traitant de développement web et des nouvelles technologies"
        />
        <meta
          property="og:image"
          content="https://jordannoailletas.com/assets/image-blog.jpg"
        />
        <meta
          property="og:description"
          content="Blog JAMstack développé avec Nextjs et Contentful"
        />
      </Head>

      <div className={styles.container}>
        <div className={styles.banner}>
          <div className={styles.banner__left}>
            <div className={styles.banner__left__bonjour}>Bonjour 👋</div>
            <div className={styles.banner__left__description}>
              Je suis Jordan, ici je parle de{' '}
              <ReactRotatingText
                className="rotating__text"
                items={[
                  'javascript',
                  'react',
                  'headless-cms',
                  'backend',
                  'développement',
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
              Présentation
            </a>
          </div>
          <div className={styles.banner__right}>
            <img src={'homepage-hero.svg'} alt="My SVG" />
          </div>
        </div>

        <div className={styles.grid}>
          {/* {articles.map((article) => (
            <SideArticle article={article} key={Math.random()} />
          ))} */}
        </div>
      </div>
    </Layout>
  )
}
