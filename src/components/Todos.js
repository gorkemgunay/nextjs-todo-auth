import Todo from "./Todo";

export default function Todos({
  sortedTodos,
  selectedCategory,
  deleteTodo,
  isLoadingDelete,
}) {
  return (
    <div className="flex flex-col gap-4 h-[36rem] overflow-y-scroll my-8 py-8">
      {selectedCategory === "all" &&
        sortedTodos.map((todo) => (
          <Todo
            key={todo._id}
            todo={todo}
            deleteTodo={deleteTodo}
            isLoadingDelete={isLoadingDelete}
          />
        ))}
      {sortedTodos
        .filter((filterTodo) => filterTodo.category === selectedCategory)
        .map((todo) => (
          <Todo
            key={todo._id}
            todo={todo}
            deleteTodo={deleteTodo}
            isLoadingDelete={isLoadingDelete}
          />
        ))}
    </div>
  );
}
