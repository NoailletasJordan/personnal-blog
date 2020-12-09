import Layout from '../../components/layout'
import Head from 'next/head'
const contentful = require('contentful')
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import styles from '../../styles/posts.module.scss'
import ArticleMini from '../../components/articleMini'
import Image from 'next/image'
import { convertDate } from '../../utility'

export default function Post(props) {
  return (
    <Layout>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <meta property="og:title" content={props.title} key="ogtitle" />
        <meta property="og:type" content="article" />
        <meta
          property="og:description"
          content={props.description}
          key="ogdesc"
        />
        <meta
          property="og:image"
          content={'http:' + props.thumbnail.url}
          key="ogimage"
        />
      </Head>
      <div className={styles.blog__wrapper}>
        <article className={styles.blog__article__wrapper}>
          <div className={styles.blog__thumbnail__wrapper}>
            <Image
              className={styles.blog__thumbnail}
              src={'http:' + props.thumbnail.url}
              alt="thumbnail"
              layout="fill"
            />
          </div>
          <div className={styles.blog__body}>
            <h1 className={styles.blog__title}>{props.title}</h1>
            <div className={styles.blog__date}>{convertDate(props.date)}</div>
            <h2 className={styles.blog__description}>{props.description}</h2>
            <div
              className={styles.blog__content}
              dangerouslySetInnerHTML={{ __html: props.contentHtml }}
            />
          </div>
        </article>

        <aside className={styles.blog__aside}>
          <div className={styles.author}>
            <div className={styles.blacktop} />
            <a
              className={styles.wrapper__1}
              target="__blank"
              href="https://jordannoailletas.com"
            >
              <div className={styles.author__avatar} />
              <div className={styles.author__name}>Jordan</div>
            </a>
            <div className={styles.author__description}>
              Développeur fullstack Javascript et JAMstack enthousiast 👨‍💻
            </div>
          </div>

          {props.aside.map((article) => (
            <ArticleMini article={article} key={Math.random()} />
          ))}
        </aside>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  let paths

  // Log into Contenful SDK
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })

  try {
    // Query all posts and setup Paths Array
    const entries = await client.getEntries({ content_type: 'blogPost' })
    paths = entries.items.map((item) => ({
      params: {
        id: encodeURIComponent(item.fields.slug),
      },
    }))
  } catch (error) {
    console.log(error)
  }

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const props = {}
  let entry

  // Log into Contenful SDK
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })

  try {
    // Query specific post
    const entries = await client.getEntries({ content_type: 'blogPost' })
    props.aside = entries.items.filter((elt) => elt.fields.slug !== params.id)
    entry = entries.items.find((elt) => elt.fields.slug === params.id)
    // Setup props to send
    props.title = entry.fields.title
    props.date = entry.fields.publishedDate
    props.description = entry.fields.description
    props.thumbnail = {
      url: entry.fields.thumbnail.fields.file.url,
    }
    props.contentHtml = documentToHtmlString(entry.fields.body, options)
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
      `<div class="imbed-img"><Image src="${fields.file.url}" width="100%" alt="${fields.file.fileName}"/> </div>`,
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
