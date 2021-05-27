import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/footer'
import styles from '../styles/Home.module.css'
import HomePage from './homepage'

export default function Home() {    
    return (
        <div className="">
            <Head>
              <title>First Draft</title>
              <meta name="description" content="A blog site made using Next.js." />
              <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="">
                <HomePage/>
            </main>

            <footer className="">
                <Footer/>
            </footer>
        </div>
    )
}
