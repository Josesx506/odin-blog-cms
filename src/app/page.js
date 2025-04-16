import styles from "./page.module.css";


export default function Home() {
  return (
    <div className={styles.page}>
        <main className={styles.main}>
          <div style={{display:'grid', gap:'1em', textAlign:'center'}}>
            <h2>Welcome to the ØBlog Content Management System</h2>
            <div>Unleash your creativity and join our growing list of contributors</div>
            <div>The world is eager to read your stories</div>
          </div>
        </main>
    </div>
  );
}
