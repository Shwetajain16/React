import './App.css';
import Todolist from './components/Todolist';
import 'bootstrap/dist/css/bootstrap.min.css';
import Createtask from './components/Createtask';




function App() {
  return (
    <div className="App">
    <Todolist />
    < Createtask />
    </div>
  );
}

export default App;
