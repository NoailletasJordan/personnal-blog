import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/articleMini.module.scss'
import { truncate } from '../utility'

export default ({ article }) => {
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
            {truncate(article.fields.title, 180)}
          </div>
          <div className={styles.aside__article__description}>
            {truncate(article.fields.description, 80)}
          </div>
        </div>
      </a>
    </Link>
  )
}
