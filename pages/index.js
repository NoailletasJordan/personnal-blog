import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import styles from '../styles/index.module.scss'
import ArticleMini from '../components/articleMini'
import { BLOCKS } from '@contentful/rich-text-types'
const contentful = require('contentful')

export default function Home({ articles }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.banner}>
          <div className={styles.banner__left}>
            <img
              className={styles.bg__svg}
              width="100%"
              src="/code_thinking.png"
            ></img>
          </div>
          <div className={styles.banner__right}>
            Bonjour 👋, moi c'est Jordan, c'est ici je que partage des trucs en
            rapport avec le web
          </div>
        </div>
        <div className={styles.grid}>
          <div className={styles.article__big}>
            <ArticleMini article={articles[0]} noTruncate={true} />
          </div>
          {articles.slice(1).map((article) => (
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
    let { items } = await client.getEntries({ content_type: 'blogPost' })
    props.articles = [...items]
  } catch (error) {
    console.log(error)
  }

  return {
    props,
  }
}

// Setup Images from contentful
const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: ({
      data: {
        target: { fields },
      },
    }) =>
      `<div class="imbed-img"><Image src="${fields.file.url}" width="100%" alt="${fields.description}"/> </div>`,
    [BLOCKS.EMBEDDED_ENTRY]: (node, next) => {
      switch (node.data.target.fields.type) {
        case 'code':
          return `<div class="user-code" innerHtml=${node.data.target.fields.content} </div>`

        case 'info':
          return `<div class="user-info">${node.data.target.fields.content}</div>`

        default:
          return
      }
    },
  },
}
