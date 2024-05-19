import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './side-article.module.scss'

export default function ArticleMini({ article, noTruncate, url }) {
  const truncateNumber = noTruncate
    ? { title: undefined, desc: undefined }
    : { title: 180, desc: 80 }
  return (
    <Link href={url || ''} key={article.fields.title}>
      <div className={styles.aside__article}>
        <div className={styles.aside__article__thumbnail__wrapper}>
          <Image
            className={styles.aside__article__thumbnail}
            src={'http:' + article.fields.thumbnail.fields.file.url}
            alt="image d'article"
            fill
          />
        </div>
        <div className={styles.aside__article__title}>
          {truncate(article.fields.title, truncateNumber.title)}
        </div>
        <div className={styles.aside__article__description}>
          {truncate(article.fields.description, truncateNumber.desc)}
        </div>
      </div>
    </Link>
  )
}

function truncate(source, size) {
  return source.length > size ? source.slice(0, size - 1) + '…' : source
}
