/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import "./Styling/listitem.css";
import { ImCross } from "react-icons/im";

export default function ListItem({ name, date, listID }) {
  let nameRef = useRef();

  useEffect(() => {
    if (new Date(date).getTime() < Date.now()) {
      complete();
    }
  }, [nameRef.current]);

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function timeConversion() {
    let target = new Date(date);

    const diffTime = Math.abs(target.getTime() - Date.now());

    let seconds = Math.floor(diffTime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    let days = "";

    seconds = seconds % 60;
    minutes = minutes % 60;

    if (minutes === 0) {
      return `${padTo2Digits(seconds)} Seconds`;
    }

    if (hours === 0) {
      return `${padTo2Digits(minutes)} Minutes, ${padTo2Digits(
        seconds
      )} Seconds`;
    }

    if (hours > 24) {
      days = Math.floor(hours / 24);
      hours = hours % 24;
      return `${days} Days - ${padTo2Digits(hours)} Hours - ${padTo2Digits(
        minutes
      )} Minutes - ${padTo2Digits(seconds)} Seconds`;
    }

    return `${padTo2Digits(hours)} Hours - ${padTo2Digits(
      minutes
    )} Minutes - ${padTo2Digits(seconds)} Seconds`;
  }

  function deleteItem() {
    fetch("http://localhost:3001/delete/" + listID, { method: "DELETE" })
      .then(() => {
        document.getElementById(listID).remove();
      })
      .catch((err) => alert(err.message));
  }

  function complete() {
    nameRef.current.style.color = "red";
    if (!document.getElementById(listID + "date").textContent.endsWith("ago"))
      document.getElementById(listID + "date").textContent += " ago";
  }

  return (
    <div className="listitem-container">
      <h3 className="list-name" ref={nameRef}>
        {name}
      </h3>
      <h3 className="date-text" id={listID + "date"}>
        {timeConversion()}
      </h3>
      <h4 onClick={() => deleteItem()}>
        <ImCross color="red" />
      </h4>
    </div>
  );
}
