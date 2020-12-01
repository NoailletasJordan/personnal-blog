import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Link from 'next/link'

export default function Home(props) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
    </Layout>
  )
}

/* export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
} */
