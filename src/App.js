import './App.css';
import Topbar from './components/Topbar/topbar';
import Main from './components/Main/Main';

function App() {
  return (
    <div className="App">
      <Topbar/>
      <header className="App-header">
         <Main/>
      </header>
    </div>
  );
}

export default App;
