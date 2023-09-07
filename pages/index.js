import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [captionInput, setCaptionInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ caption: captionInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setCaptionInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Dikluarken Nojorono</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h1>Komenta Nojorono</h1>
        <h3>Insert the post's caption / image's description</h3>
        <form onSubmit={onSubmit}>
          <textarea name="caption" placeholder="Enter the caption" rows="4" value={captionInput} onChange={(e) => setCaptionInput(e.target.value)}>
          </textarea>
          <input type="submit" value="Generate comment" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
