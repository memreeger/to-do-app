const TodoInput = (props) => {
  const {
    newTask,
    setNewTask,
    addTodo,
    handleKeyPress,
    categories,
    newCategory,
    handleCategoryChange,
  } = props;
  return (
    <div className="todo-input-container">
      <div className="input-row">
        <input
          type="text"
          className="todo-input"
          placeholder="Görev giriniz"
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
          onKeyPress={handleKeyPress}
        />

        <select
          className="category-select"
          value={newCategory}
          onChange={(e) => {
            handleCategoryChange(e.target.value);
          }}
        >
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <button className="add-btn" onClick={addTodo} disabled={!newTask.trim()}>
          Ekle
        </button>
      </div>
    </div>
  );
};

export { TodoInput };
