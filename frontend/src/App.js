import './App.css';
import { useEffect, useState } from 'react';
import ListItem  from "./Components/ListItem";

function App() {

  let [currentList, setCurrentList] = useState(null);

  useEffect(() => {
    // api call
  }, [])

  return (
    <div className="App">

      <header>
        <div className="header-container">
          <h1>To-Do Application</h1>
          <h2>Daniel Banks</h2>
        </div>
      </header>

      <div className="main-container">

        <div className="view-container">
          <h1>Current List</h1>

          <ul>
            <li><ListItem name="water the crops very well so they're nice and wet and actually you know grow." date={new Date()}/></li>
            <li><ListItem name="mow the lawn" date={new Date()}/></li>
            <li><ListItem name="do this then do that." date={new Date()}/></li>
          </ul>
        </div>

        <div className="add-container">

        </div>
      </div>


    </div>
  );
}

export default App;
