import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";
import styles from "./index.module.css";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div>
      <Head>
        <title>国際税務戦略テスト対策</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <header className={styles.header}>
          <h1>
            国際税務戦略ノート共有サイトです
          </h1>
        </header>

        <h2 className={styles.heading}>全ての授業</h2>
        <ol className={styles.posts}>
          {posts.map((post) => {
            return (
              <li key={post.id} className={styles.post}>
                <h3 className={styles.postTitle}>
                  <Link href={`/${post.id}`}>
                    <a>
                      <Text text={post.properties.Name.title} />
                    </a>
                  </Link>
                </h3>

                <p className={styles.postDescription}>
                  
                </p>
                <Link href={`/${post.id}`}>
                  <a> ノートを見る →</a>
                </Link>
              </li>
            );
          })}
        </ol>
      </main>
    </div>
  );
}

//ISRを追加
export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  }
}
