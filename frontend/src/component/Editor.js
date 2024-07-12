import { useEffect } from "react";
import { Box } from '@mui/material';
import Quill from "quill";
// Importing styles
import "quill/dist/quill.snow.css";

const Editor = () => {
  useEffect(() => {
    // Check if Quill is already initialized
    if (!document.querySelector('.ql-toolbar')) {
      const quillEditor = new Quill('#quill-editor', {
        theme: "snow"
      });
    }
  }, []);

  return (
        <Box id='quill-editor'></Box>
  );
}
export default Editor;