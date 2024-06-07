import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import Head from 'next/head'
import Image from 'next/image'
import translation from '../../translation'
import Layout from '../Layout'
import styles from './article.module.scss'
import CodeBlock from './components/CodeBlock'
import SideArticle from './components/SideArticle'

export default function Article(props) {
  const t = translation[props.locale] || {}

  return (
    <Layout locale={props.locale} switchLanguageLink={props.switchLanguageLink}>
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
            <div className={styles.blog__date}>
              {props.date && convertDate(props.date, props.locale)}
            </div>
            <h2 className={styles.blog__description}>{props.description}</h2>
            <div className={styles.blog__content}>
              {documentToReactComponents(props.content, renderOptions)}
            </div>
            <div></div>
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
              {t.author_description} <br />
              ⚡TypeScript | 🌐 Node.js | 🚀 Go
            </div>
          </div>
          <div className={styles.blog__aside__article}>
            {props.aside.map((article) => (
              <SideArticle
                article={article}
                key={Math.random()}
                url={`/${props.locale}/published/${article.fields.slug}`}
              />
            ))}
          </div>
        </aside>
      </div>
    </Layout>
  )
}

const renderOptions = {
  renderMark: {
    [MARKS.CODE]: (text) => <CodeInline text={text} />,
  },
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: ({
      data: {
        target: { fields },
      },
    }) => (
      <ImageBlock
        url={'https://' + fields.file.url}
        fileName={fields.file.fileName}
      />
    ),
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      switch (node.data.target.fields.type) {
        case 'code':
          return (
            <CodeBlock
              text={node.data.target.fields.content}
              codeLanguage={node.data.target.fields.codeLanguage}
            />
          )

        default:
          return
      }
    },
  },
}

export function convertDate(timestampString, locale) {
  const date = new Date(timestampString)
  const options = {
    year: 'numeric',
    month: 'long',
  }
  const localestring = locale === 'fr' ? 'fr-FR' : 'en-US'
  const formatted = date
    .toLocaleDateString(localestring, options)
    .replace('à', '-')
  return formatted[0].toUpperCase() + formatted.slice(1)
}

const ImageBlock = ({ url, fileName }) => (
  <div className={styles['imbed-img']}>
    <img src={url} alt={fileName} layout="responsive" width={'100%'} />
  </div>
)

const CodeInline = ({ text }) => (
  <code
    style={{
      fontSize: '80%',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      padding: '0.1em 0.25em',
      borderRadius: '0.1em 0.25em',
    }}
    onClick={() => navigator.clipboard.writeText(text.trim())}
  >
    {text}
  </code>
)
