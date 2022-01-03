import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Journal.module.css";
import { DataStore } from "@aws-amplify/datastore";
import { JournalEntries } from "./../src/models";
import { MdSearch, MdAddCircleOutline, MdFolderOpen } from "react-icons/md";
import JournalHead from "../components/journalhead";
import JournalEditor from "../components/journaleditor";
import { Editor } from "@tinymce/tinymce-react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";

const fetchEntries = async (user, setEntries) => {
  console.log("USER: ", user.username);
  const entries = await DataStore.query(JournalEntries, (entry) =>
    entry.user("eq", user.username)
  );
  setEntries(entries);
  console.log("Entries: ", entries);
};

const buttonPress = () => {};

export default function Journal() {
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState("");

  const router = useRouter();

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user);
        fetchEntries(user, setEntries);
      })
      .catch((e) => router.push("/404"));
  }, []);

  return (
    <>
      <Head>
        <title>Renewed Mood | Journal</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.sideContainer}>
          <div className={styles.sideIconsContainer}>
            <MdSearch className={styles.icon} />
            <MdAddCircleOutline className={styles.icon} />
            <MdFolderOpen className={styles.icon} />
          </div>
          <div className={styles.entriesContainer}>
            {entries.map((entry, i) => (
              <div className={styles.entries} key={i}>
                <div key={`title-${i}`}>{`${entry.title}`}</div>
                <div key={`date-${i}`}>{`${entry.timestamp}`}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.notepadContainer}>
          <JournalHead className={styles.title} />
          <JournalEditor setText={setText} />
        </div>
      </div>
    </>
  );
}
