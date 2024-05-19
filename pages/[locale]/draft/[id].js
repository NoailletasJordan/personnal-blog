import Article from '../../../components/Article'
const contentful = require('contentful')

export default function Draft(props) {
  return <Article {...props} />
}

export async function getServerSideProps(context) {
  const { req, params } = context
  const currentUrl = req.url
  const locale = currentUrl.split('/')[1]
  const slug = currentUrl[currentUrl.length - 1]
  const otherLanguage = locale === 'fr' ? 'en' : 'fr'

  const props = {}
  props.locale = locale
  let entry

  // Log into Contenful SDK
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    // Setup for Draft acticles
    accessToken: process.env.CONTENTFUL_DRAFT_PREVIEW_TOKEN,
    host: 'preview.contentful.com',
  })

  try {
    // Query specific post
    const entries = await client.getEntries({
      content_type: 'blogPost',
      locale: locale,
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
    props.switchLanguageLink = `/${otherLanguage}/draft/${entry.fields.slug}`
  } catch (error) {
    console.log(error)
  }

  return {
    props,
  }
}
