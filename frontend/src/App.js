import './App.css';
import Editor from './component/Editor';
import {Route,Routes,BrowserRouter as Router,Navigate} from 'react-router-dom'
import {v4 as uuid} from 'uuid'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Navigate replace to={`/docs/${uuid()}`} />}/>
          <Route path='/docs/:id' element={<Editor/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
