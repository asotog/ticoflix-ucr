import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Document } from 'prismic-javascript/types/documents'
import { RichText } from 'prismic-reactjs'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [pelis, setPelis] = useState<Document[]>([])
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const res = await fetch('/api/pelis')
      const pelis = await res.json();
      setPelis(pelis)
      setLoading(false)
    }
    load();
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Ticoflix
        </h1>
        {loading ? <h3>Cargando...</h3> : null}

        <div className={styles.grid}>
          {pelis.map(p => <Link key={p.uid} href={`/p/${p.uid}`}>
            <a className={styles.card}>
              <RichText render={p.data.title} />
              <Image src={p.data.thumbnail.url} width={250} height={250} alt={'image pelicula'} />
            </a>
          </Link>)}

        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
