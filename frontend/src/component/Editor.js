import { useEffect } from "react";
import { Box } from '@mui/material';
import Quill from "quill";
// Importing styles
import "quill/dist/quill.snow.css";

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];

const Editor = () => {
  useEffect(() => {
    // Check if Quill is already initialized
    if (!document.querySelector('.ql-toolbar')) {
      const quillEditor = new Quill('#quill-editor', {
        theme: "snow",modules: {
            toolbar: toolbarOptions
          }
        
      });
    }
  }, []);

  return (
        <Box id='quill-editor'></Box>
  );
}
export default Editor;