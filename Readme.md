# Google Docs Clone
Basic Google Clone application with text editor and real time editing/viewing with the shared user

## Notes
### frontend
- Used quill to add text editor features
- Used quill Toolbar to modify/add text editor features
- Used styled to add css styling on top of Material UI components
- styled is only applicable on MUI components
- The return in useEffect is a cleanup function for any event listeners and such that should be turned off after the effect runs to prevent leaks. If you're not setting event listeners, canceling asynchronous requests or you don't have any resources to clean up then you don't need anything in the return. You should put your code/function calls before the return function.

### backend
- "type": "module" added to json file to import and export packages 
- socket.io can be used to communicate between client and server based on an event
- text-change api in quill is used to track the text modifications
- changes made in frontend are catched using quill and sent to backend using socket
- Backend socket send the changes to quill which displays the real time changes made
