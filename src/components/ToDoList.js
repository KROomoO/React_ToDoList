import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import Modal from "react-modal";

import ToDoItem from "./ToDoItem";

Modal.setAppElement("#root");

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

const ToDoList = () => {
    const [text, setText] = useState("");
    const [mark, setMark] = useState([]);
    const [todoList, setToDoList] = useState([]);
    const [calendarDate, setCalendarDate] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const todoRef = useRef(0);

    const date = new Date();
    const FormatDate = "YYYY-MM-DD";

    const saveToDo = () => {
        localStorage.setItem("ToDo", JSON.stringify(todoList));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputToDo = {
            todoDate: moment(date).format(FormatDate),
            todoId: todoRef.current++,
            todoText: text,
        };
        setToDoList([...todoList, inputToDo]);
        if (mark.find((it) => inputToDo.todoDate === it) === undefined) {
            setMark([...mark, inputToDo.todoDate]);
        }
    };

    const deleteToDo = (e) => {
        const delToDO = todoList.filter(
            (it) => it.todoId !== parseInt(e.target.value)
        );
        setToDoList(delToDO);
    };

    useEffect(() => {
        if (todoList !== undefined) saveToDo();
    }, [todoList]);

    useEffect(() => {
        const todoStorage = localStorage.getItem("ToDo");
        // 여기 빈배열 체크
        if (todoStorage !== null && todoStorage.length > 2) {
            todoRef.current =
                JSON.parse(todoStorage).sort(
                    (a, b) => parseInt(b.todoId) - parseInt(a.todoId)
                )[0].todoId + 1;
            setToDoList(...[JSON.parse(todoStorage)]);
            const copyDate = new Set(
                JSON.parse(todoStorage).map((it) => it.todoDate)
            );
            setMark([...mark, ...copyDate]);
        }
    }, []);

    return (
        <div className="todoform">
            <div className="todoinputform">
                <Box
                    component="form"
                    className="inputform"
                    sx={{
                        "& > :not(style)": { m: 1, width: "300px" },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <TextField
                        id="standard-basic"
                        label="ToDo"
                        variant="standard"
                        helperText="Write Your ToDoList"
                        onChange={(e) => setText(e.target.value)}
                    />
                </Box>
                <div className="todolistview">
                    {todoList !== undefined &&
                        todoList
                            .filter(
                                (it) =>
                                    it.todoDate ===
                                    moment(date).format(FormatDate)
                            )
                            .map((it) => (
                                <ToDoItem
                                    key={it.todoId}
                                    todo_date={moment(it.todoDate).format(
                                        "MM-DD"
                                    )}
                                    todo_text={it.todoText}
                                />
                            ))}
                </div>
            </div>
            <div>
                <Calendar
                    formatDay={(locale, date) => moment(date).format("DD")}
                    tileContent={({ date, view }) => {
                        let html = [];
                        if (
                            mark.find(
                                (it) => it === moment(date).format(FormatDate)
                            )
                        ) {
                            html.push(<div className="dot" key={0}></div>);
                        }
                        return <div className="dotform">{html}</div>;
                    }}
                    onChange={(e) =>
                        setCalendarDate(moment(e).format("YYYY-MM-DD"))
                    }
                    onClickDay={() => setIsOpen(!isOpen)}
                    value={date}
                    minDetail="month"
                    maxDetail="month"
                    navigationLabel={null}
                    showNeighboringMonth={false}
                />
                <div>
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={() => setIsOpen(!isOpen)}
                        contentLabel="example"
                        style={customStyles}
                    >
                        <div className="modallayout">
                            {calendarDate.length >= 1 &&
                                todoList
                                    .filter(
                                        (it) => it.todoDate === calendarDate
                                    )
                                    .map((it, idx) => {
                                        return (
                                            <ul key={idx}>
                                                <li>
                                                    <b>{idx + 1}</b>
                                                </li>
                                                <li>{it.todoText}</li>
                                                <button
                                                    value={it.todoId}
                                                    onClick={deleteToDo}
                                                >
                                                    X
                                                </button>
                                            </ul>
                                        );
                                    })}
                        </div>
                        <button onClick={() => setIsOpen(!isOpen)}>
                            close
                        </button>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default ToDoList;
