import "./App.css";
import { useEffect, useRef, useState } from "react";
import ListItem from "./Components/ListItem";
import Navbar from "./Components/Navbar";

function App() {
  let [currentList, setCurrentList] = useState([]);

  let inputReference = useRef();
  let dateInput = useRef();

  useEffect(() => {
    fetch("http://localhost:3001/retrieve", {
      method: "GET",
    })
      .then(async (response) => {
        setCurrentList(await response.json());
      })
      .catch((err) => console.log(err));
  }, []);

  let createItem = (val) => {
    if (val === "" || val == null)
      return alert("Please input a string before trying to add an item!");

    inputReference.current.value = "";

    let targetDay = new Date(dateInput.current.value);

    fetch(
      "http://localhost:3001/create?value=" +
        val +
        "&time=" +
        targetDay.toISOString(),
      {
        method: "POST",
      }
    )
      .then(async (response) => {
        if (response.ok) {
          setCurrentList([...currentList, await response.json()]);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="view-container">
          <h1>Current List</h1>

          <ul>
            {currentList.length === 0 ? (
              <h4 style={{ color: "darkgray" }}>No items in the list</h4>
            ) : (
              currentList.map((item, index) => (
                <li key={index} id={item.id}>
                  <ListItem
                    name={item.value}
                    date={item.date}
                    listID={item.id}
                  />
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="add-container">
          <h2>Add an item</h2>
          <input
            type="text"
            placeholder="Enter item value"
            ref={inputReference}
          />
          <input type="datetime-local" ref={dateInput} />
          <button onClick={() => createItem(inputReference.current.value)}>
            Add
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
