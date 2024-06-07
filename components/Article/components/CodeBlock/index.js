import { Highlight, themes } from 'prism-react-renderer'
import { useState } from 'react'
import styles from './code-block.module.scss'

import { useRef } from 'react'

const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null)

  const debouncedFunction = (...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }

  return debouncedFunction
}

const CodeBlock = ({ text, codeLanguage }) => {
  const [isCopied, setIsCopied] = useState(false)
  const debounceCopy = useDebounce(() => setIsCopied(false), 3000)

  const onCopyClick = () => {
    navigator.clipboard.writeText(text.trim()).then(() => {
      setIsCopied(true)
      debounceCopy()
    })
  }

  return (
    <Highlight
      theme={themes.vsDark}
      code={text.trim()}
      language={codeLanguage || 'tsx'}
    >
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre className={styles.container}>
          <pre
            className={styles.outer}
            style={{
              ...style,
            }}
          >
            <div className={styles.header_container}>
              <div
                className={styles.header_container__dot}
                style={{
                  backgroundColor: '#FF5F56',
                }}
              />
              <div
                className={styles.header_container__dot}
                style={{
                  backgroundColor: '#FFBD2E',
                }}
              />
              <div
                className={styles.header_container__dot}
                style={{
                  backgroundColor: '#27C93F',
                }}
              />
            </div>

            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
          <button onClick={onCopyClick} className={styles.copy__button}>
            {!isCopied ? 'Copy clipboard' : 'Copied ✔'}
          </button>
        </pre>
      )}
    </Highlight>
  )
}

export default CodeBlock
