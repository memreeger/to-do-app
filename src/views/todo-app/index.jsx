import React, { useEffect, useState } from "react";
import "./styles.css";
import { TodoInput } from "./todo-input";
import { TodoItem } from "./todo-item";
import { addData, deleteData } from "../../services/firebase";

import { firebaseDB } from "../../config/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";



const categories = [
  { name: "Work", color: "#2196F3" },
  { name: "Study", color: "#FF9800" },
  { name: "Sports", color: "#9C27B0" },
  { name: "Groceries", color: "#4CAF50" },
  { name: "Personal", color: "#E91E63" },
];

const defaultCategory = categories[0];

const TodoApp = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Todo uygulaması yapacağım",
      completed: false,
      category: "Work",
      categoryColor: "#2196F3",
    },
  ]);
  const [newTask, setNewTask] = useState("");
  const [newCategory, setNewCategory] = useState(defaultCategory.name);
  const [newCategoryColor, setNewCategoryColor] = useState(
    defaultCategory.color
  );

  async function getTodosToFirebase() {

    const q = query(collection(firebaseDB, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempTodos = [];
      querySnapshot.forEach((doc) => {

        tempTodos.push({
          ...doc.data(),
          docId: doc.id
        });
      });

      setTodos(tempTodos)
    });
  }

  useEffect(() => {
    getTodosToFirebase()
  }, [])

  const addTodo = () => {
    if (newTask.trim() != "") {
      const newTodo = {
        id: Date.now(),
        text: newTask,
        completed: false,
        category: newCategory,
        categoryColor: newCategoryColor,
      };


      addData('todos', newTodo)


      setTodos([...todos, newTodo]);
      setNewTask("");
    }
  };

  const editTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((todoItem) => {
        if (todoItem.id === id) {
          return {
            ...todoItem,
            text: todo,
          };
        }

        return todoItem;
      })
    );


  };


  console.log(todos, "todos")

  const deleteTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)
    deleteData('todos', todo.docId)

  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleCategoryChange = (categoryName) => {
    const selectedCategory = categories.find(
      (cat) => cat.name === categoryName
    );
    setNewCategory(categoryName);
    setNewCategoryColor(selectedCategory.color);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="todo-app">
      <div className="todo-container">
        <h1 className="todo-title">Tüm Görevler 1</h1>
        <TodoInput
          setNewTask={setNewTask}
          newTask={newTask}
          addTodo={addTodo}
          handleKeyPress={handleKeyPress}
          categories={categories}
          newCategory={newCategory}
          handleCategoryChange={handleCategoryChange}
        />

        <div className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              editTodo={editTodo}
              onDelete={deleteTodo}
            // categories={categories}
            // newCategory={newCategory}
            // handleCategoryChange={handleCategoryChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
