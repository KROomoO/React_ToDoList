const ToDoItem = ({ todo_date, todo_text }) => {
    return (
        <div>
            <ul>
                <li>{todo_date}</li>
                <li>{todo_text}</li>
            </ul>
        </div>
    );
};

export default ToDoItem;