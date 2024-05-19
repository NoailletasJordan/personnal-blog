import Article from '../../../components/Article'

const contentful = require('contentful')

export default function Published(props) {
  return <Article {...props} />
}

const clientData = {
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: 'preview.contentful.com',
}

export async function getStaticPaths() {
  // needs to match translation object key, and contentful locales
  const locales = ['fr', 'en']
  let paths

  // Log into Contenful SDK
  const client = contentful.createClient(clientData)

  try {
    // Query all posts and setup Paths Array
    const entries = await client.getEntries()

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

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  let props = {}
  props.locale = params.locale
  let entry

  // Log into Contenful SDK
  const client = contentful.createClient(clientData)

  try {
    // Query specific post
    const entries = await client.getEntries({
      locale: params.locale,
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

    const otherLanguage = props.locale === 'fr' ? 'en' : 'fr'
    props.switchLanguageLink = `/${otherLanguage}/published/${entry.fields.slug}`
  } catch (error) {
    console.log(error)
  }

  return {
    props,
  }
}
