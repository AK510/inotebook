import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import {
  Route,
  BrowserRouter as Router ,
  Routes,
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
  return (
    <>
      {/* to user states directly rather than passing it to components hierarchy context api is used. Very useful in complex projects useContext hook*/}
      <NoteState>
        <Router>
          <Navbar/>
          <Alert message = "This is a alert"/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home/>} /> 
              <Route exact path="/about" element={<About/>} />  
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
