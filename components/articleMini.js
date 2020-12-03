import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/articleMini.module.scss'
import { truncate } from '../utility'

export default function ArticleMini({ article, noTruncate }) {
  const truncateNumber = noTruncate
    ? { title: undefined, desc: undefined }
    : { title: 180, desc: 80 }
  return (
    <Link
      href={`/posts/${encodeURIComponent(article.fields.slug)}`}
      key={article.fields.title}
    >
      <a>
        <div className={styles.aside__article}>
          <div className={styles.aside__article__thumbnail__wrapper}>
            <Image
              className={styles.aside__article__thumbnail}
              src={'http:' + article.fields.thumbnail.fields.file.url}
              alt="image d'article"
              layout="fill"
            />
          </div>
          <div className={styles.aside__article__title}>
            {truncate(article.fields.title, truncateNumber.title)}
          </div>
          <div className={styles.aside__article__description}>
            {truncate(article.fields.description, truncateNumber.desc)}
          </div>
        </div>
      </a>
    </Link>
  )
}
