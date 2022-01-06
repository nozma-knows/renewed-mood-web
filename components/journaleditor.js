import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import JournalEditorProps from "./journaleditorprops";

export default function JournalEditor({ setJournal, value }) {
  const updateText = (text) => {
    setJournal((prevState) => ({
      ...prevState,
      entry: text,
    }));
  };

  return (
    <>
      <Editor
        id="JournalEditor"
        // tinymceScriptSrc="/tinymce/tinymce.min.js"
        init={{
          ...JournalEditorProps,
        }}
        onEditorChange={(text) => updateText(text)}
        value={value}
      />
    </>
  );
}
