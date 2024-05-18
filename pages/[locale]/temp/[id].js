import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Article from '../../../components/Article'
import Layout from '../../../components/Layout'
const contentful = require('contentful')

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
      <Article {...props} />
    </Layout>
  )
}

export async function getStaticPaths() {
  let paths

  // Log into Contenful SDK
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_DRAFT_PREVIEW_TOKEN,
    host: 'preview.contentful.com',
  })

  const locales = ['frFR', 'en-US']

  try {
    // Query all posts and setup Paths Array
    const entries = await client.getEntries({ content_type: 'blogPost' })

    paths = locales.flatMap((locale) =>
      entries.items.map((item) => ({
        params: {
          id: item.fields.slug,
          locale,
        },
      })),
    )
  } catch (error) {
    console.log(error)
  }

  /** Temp */
  console.log({ paths: JSON.stringify(paths) })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  let props = {}
  let entry

  /** Temp */
  console.log({ params })

  // Log into Contenful SDK
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_DRAFT_PREVIEW_TOKEN,
    host: 'preview.contentful.com',
  })

  try {
    // Query specific post
    const entries = await client.getEntries({
      // locale: 'fr-FR', //params.locale,
      content_type: 'blogPost',
    })
    props.aside = entries.items.filter((elt) => elt.fields.slug !== params.id)
    entry = entries.items.find((elt) => elt.fields.slug === params.id)
    // Setup props to send
    props.title = entry.fields.title
    props.date = entry.fields.publishedDate
    props.description = entry.fields.description
    props.thumbnail = {
      url: entry.fields.thumbnail.fields.file.url,
    }
    props.content = entry.fields.body
  } catch (error) {
    console.log(error)
  }

  /** Temp */
  console.log('waiting')
  // /** Temp */
  console.log({
    ...(await serverSideTranslations('en-US', ['common'])),
  })

  return {
    props,
  }
}
