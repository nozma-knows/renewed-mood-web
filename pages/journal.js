import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Journal.module.css";
import { DataStore } from "@aws-amplify/datastore";
import { JournalEntries } from "./../src/models";
import {
  MdSearch,
  MdAddCircleOutline,
  MdFolderOpen,
  MdStar,
  MdIosShare,
  MdSaveAlt,
  MdDeleteForever,
} from "react-icons/md";
import JournalEditor from "../components/journaleditor";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import moment from "moment";

const fetchEntries = async (user, setEntries) => {
  console.log("USER: ", user.username);
  const entries = await DataStore.query(JournalEntries, (entry) =>
    entry.user("eq", user.username)
  );
  entries.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
  console.log("Entries: ", entries);
  setEntries(entries);
};

const handleSaveEntry = async (
  { id, title, entry, starred, shared },
  setJournal,
  user,
  setEntries
) => {
  const currentTime = Date.now();
  console.log("ID:", id);
  console.log("Title: ", title);
  console.log("Entry: ", entry);
  console.log("Starred: ", starred);
  console.log("Shared: ", shared);
  console.log("User: ", user.username);
  console.log("Timestamp: ", currentTime);
  if (id === "") {
    await DataStore.save(
      new JournalEntries({
        user: user.username,
        timestamp: currentTime,
        title: title,
        entry: entry,
        starred: starred,
        shared: shared,
      })
    );
  } else {
    const originalEntry = await DataStore.query(JournalEntries, (item) =>
      item.id("eq", id)
    );
    console.log("originalEntry: ", originalEntry);
    await DataStore.save(
      JournalEntries.copyOf(originalEntry[0], (updated) => {
        updated.user = user.username;
        updated.timestamp = currentTime;
        updated.title = title;
        updated.entry = entry;
        updated.starred = starred;
        updated.shared = shared;
      })
    );
  }
  const newEntry = await DataStore.query(JournalEntries, (item) =>
    item.timestamp("eq", currentTime)
  );
  setJournal((prevState) => ({
    ...prevState,
    id: newEntry[0].id,
  }));
  fetchEntries(user, setEntries);
};

const handleDeleteEntry = async ({ id }, setJournal, user, setEntries) => {
  const entryToDelete = await DataStore.query(JournalEntries, (item) =>
    item.id("eq", id)
  );
  DataStore.delete(entryToDelete[0]);
  setJournal(initialJournalState);
  fetchEntries(user, setEntries);
};

const loadEntry = async (
  { id, title, entry, starred, shared },
  journal,
  setJournal
) => {
  const loadedEntry = await DataStore.query(JournalEntries, (item) =>
    item.id("eq", id)
  );
  console.log("Loaded Entry: ", loadedEntry[0].title);
  console.log("Journal: ", journal);
  setJournal({
    id: loadedEntry[0].id,
    user: loadedEntry[0].user,
    timestamp: loadedEntry[0].timestamp,
    title: loadedEntry[0].title,
    entry: loadedEntry[0].entry,
    starred: loadedEntry[0].starred,
    shared: loadedEntry[0].shared,
  });
};

const addEntry = (setJournal) => {
  setJournal(initialJournalState);
};

const initialJournalState = {
  id: "",
  title: "",
  entry: "",
  starred: false,
  shared: false,
};

export default function Journal() {
  const [user, setUser] = useState(null);
  const [journal, setJournal] = useState(initialJournalState);
  const [entries, setEntries] = useState([]);

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
            <MdSearch className={styles.sideIcon} />
            <MdAddCircleOutline
              className={styles.sideIcon}
              onClick={() => addEntry(setJournal)}
            />
            <MdFolderOpen className={styles.sideIcon} />
          </div>
          <div className={styles.entriesContainer}>
            {entries.map((entry, i) => (
              <div className={styles.entryContainer} key={i}>
                {/* <input className={styles.entryCheckBox} type="checkbox" /> */}
                <div
                  className={styles.entry}
                  onClick={() => loadEntry(entry, journal, setJournal)}
                >
                  <div key={`title-${i}`}>{`${entry.title}`}</div>
                  <div key={`date-${i}`}>{`${moment(entry.timestamp).format(
                    "MMMM Do YYYY, h:mm"
                  )} ${moment(entry.timestamp)
                    .format("a")
                    .toUpperCase()}`}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.notepadContainer}>
          <div className={styles.notepadHeader}>
            <input
              className={styles.title}
              onChange={(e) =>
                setJournal((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }))
              }
              value={journal.title}
              placeholder="New Journal Entry"
            />
            <div className={styles.notepadHeaderButtons}>
              <MdStar
                className={styles.notepadHeaderIcon}
                style={journal.starred && { color: "gold" }}
                onClick={() =>
                  setJournal((prevState) => ({
                    ...prevState,
                    starred: !journal.starred,
                  }))
                }
              />
              <MdIosShare
                className={styles.notepadHeaderIcon}
                style={journal.shared && { color: "gold" }}
                onClick={() =>
                  setJournal((prevState) => ({
                    ...prevState,
                    shared: !journal.shared,
                  }))
                }
              />
              <MdSaveAlt
                className={styles.notepadHeaderIcon}
                onClick={() =>
                  handleSaveEntry(journal, setJournal, user, setEntries)
                }
              />
              <MdDeleteForever
                className={styles.notepadHeaderIcon}
                onClick={() =>
                  handleDeleteEntry(journal, setJournal, user, setEntries)
                }
              />
            </div>
          </div>
          <JournalEditor setJournal={setJournal} value={journal.entry} />
        </div>
      </div>
    </>
  );
}
