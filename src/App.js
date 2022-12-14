import React from "react";
import "./App.css";
import Clock from "./components/Clock";
import Quotes from "./components/Quotes";
import ToDoList from "./components/ToDoList";
import Weather from "./components/Weather";

function App() {
    return (
        <div className="App">
            <div className="header">
                <Weather />
            </div>
            <div className="clock">
                <Clock />
            </div>
            <div className="todoList">
                <ToDoList />
            </div>
            <footer>
                <Quotes />
            </footer>
        </div>
    );
}

export default App;