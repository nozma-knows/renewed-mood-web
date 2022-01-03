import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import JournalEditorProps from "./journaleditorprops";

export default function JournalEditor({ setText }) {
  const updateText = (text) => {
    setText(text);
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
      />
    </>
  );
}
