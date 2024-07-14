import { useEffect, useState } from "react";
import { Box } from '@mui/material';
import Quill from "quill";
// Importing styles
import "quill/dist/quill.snow.css";
import styled from '@emotion/styled';
import {io} from 'socket.io-client'
import { useParams } from "react-router-dom";

const Component = styled.div`
background : #F5F5F5;`

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
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const {id} = useParams();

  useEffect(() => {
    // Check if Quill is already initialized
    if (!document.querySelector('.ql-toolbar')) {
      const quillServer = new Quill('#quill-editor', {
        theme: "snow",modules: {
            toolbar: toolbarOptions
          }
        
      });
      quillServer.disable();
      quillServer.setText('Loading the Document...')
      setQuill(quillServer);
    }
  }, []);

  useEffect(()=>{
    const socketServer = io('http://localhost:9000');
    setSocket(socketServer);

    return () => {
      socketServer.disconnect();
    }
  },[]);

  useEffect(()=>{
    if (!socket || !quill){
      return
    }
    const handleChange = (delta) => {
      quill.updateContents(delta);
    }
    socket && socket.on('receive-changes', handleChange);
    return ()=>{
      socket && socket.off('receive-changes', handleChange);
    }
  },[quill,socket]);

  useEffect(()=>{
    if (!socket || !quill){
      return
    }
    const handleChange = (delta, oldDelta, source) => {
      if (source !== 'user') {
        return
      }
      socket && socket.emit('send-changes',delta);
    }
    quill && quill.on('text-change', handleChange);
    return ()=>{
      quill && quill.off('text-change', handleChange);
    }
  },[quill,socket]);

  useEffect(()=>{
    if (!socket || !quill){
      return;
    }
    socket && socket.once('load-document',document=>{
      quill && quill.setContents(document);
      quill.enable();
    })
    socket && socket.emit('get-document',id);
  },[quill,socket,id]);

  useEffect(()=>{
    if (!socket || !quill){
      return;
    }
    const interval = setInterval(()=>{
      socket && socket.emit('save-document',quill.getContents())
    }, 2000)
    return ()=>{
      clearInterval(interval);
    }
  },[quill,socket]);

  return (
    <Component>
        <Box className = 'container' id='quill-editor'></Box>
    </Component>
  );
}
export default Editor;