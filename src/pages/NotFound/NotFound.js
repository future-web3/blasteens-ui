import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NotFound.module.scss'

function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.notFoundLogo}>
        <Link to='/'>
          <img src='/images/blasteens-transparent.png' alt='Warning' />
        </Link>
      </div>
      <div className={styles.notFoundText}>
        <h1>404</h1>
        <h1>Stay! Stay Safe!</h1>
      </div>
      <div className={styles.notFoundWarn}>
        <img src='/images/warning.png' alt='Warning' />
      </div>
    </div>
  )
}

export default NotFound
