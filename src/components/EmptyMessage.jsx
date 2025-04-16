import React from 'react'
import styles from "@/app/page.module.css";

export default function EmptyMessage({ children }) {
  return (
    <div className={styles.page}>
      <div className={styles.main}>
       {children}
      </div>
    </div> 
  )
}
