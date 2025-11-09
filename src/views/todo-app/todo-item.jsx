import { useState } from "react";
import { EditTodoInput } from "./edit-todo-input";

const TodoItem = ({ todo, onDelete, toggleTodo, editTodo }) => {
  const [isDblClickEditTodo, setIsDblClickEditTodo] = useState(false);

  const toggleDblClickEditTodo = () => {
    setIsDblClickEditTodo(!isDblClickEditTodo);
  };

  return (
    <div
      className={`todo-item ${todo.completed ? "completed" : ""}`}
      onDoubleClick={toggleDblClickEditTodo}
    >
      <div className="todo-content">
        {isDblClickEditTodo ? (
          <EditTodoInput
            id={todo.id}
            editTodo={editTodo}
            todoText={todo.text}
            setCloseEdit={setIsDblClickEditTodo}
          />
        ) : (
          <>
            <button
              className={`todo-checkbox ${todo.completed ? "checked" : ""}`}
              onClick={() => {
                toggleTodo(todo.id);
              }}
            >
              {todo.completed && <span className="checkmark">✓</span>}
            </button>

            <span
              className={`todo-text ${todo.completed ? "strikethrough" : ""} `}
            >
              {todo.text}
            </span>

            <span
              className="todo-category"
              style={{
                backgroundColor: todo.categoryColor,
              }}
            >
              {todo.category}
            </span>

            <button
              className="delete-btn"
              title="Delete Task"
              onClick={() => {
                const confirmation = window.confirm(
                  "Sileceğinize emin misiniz? Siliniyor, bu işlem geri alınamaz!"
                ); // silmek için emin misin
                if (confirmation) {
                  onDelete(todo.id);
                }
              }}
            >
              x
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export { TodoItem };
