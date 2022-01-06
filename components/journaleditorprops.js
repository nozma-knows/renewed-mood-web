const JournalEditorProps = {
  menubar: "edit view format tools table help",
  formats: {
    tindent_format: { selector: "p", styles: { "text-indent": "40mm" } },
  },
  toolbar:
    "fullscreen preview print | undo redo | sizeselect | fontselect |  fontsizeselect| bold italic backcolor |  \
     alignleft aligncenter alignright alignjustify tindent_bttn | tfecha_bttn | \
     bullist numlist outdent indent | removeformat | restoredraft wordcount",
  plugins: [
    "wordcount ",
    "link print ",
    "preview fullscreen",
    "insertdatetime wordcount ",
    "insertdatetime",
    "pagebreak",
  ],
  mobile: {
    theme: "mobile",
    toolbar: ["undo", "bold", "italic", "styleselect, restoredraft"],
  },
  fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt",
  contextmenu: " copy  wordcount",
  browser_spellcheck: true,
  language: "en",
  language_url: "/tinymce/langs/es.js",
  paste_data_images: false,
  force_p_newlines: false,
  branding: false,
  forced_root_block: "",
  height: "100%",
  width: "100%",
  content_style: "body { margin: 12 }",
};

export default JournalEditorProps;
