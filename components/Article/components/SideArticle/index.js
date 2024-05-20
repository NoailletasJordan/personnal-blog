import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './side-article.module.scss'

export default function ArticleMini({ article, url }) {
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
          {article.fields.title}
        </div>
        <div className={styles.aside__article__description}>
          {article.fields.description}
        </div>
      </div>
    </Link>
  )
}
