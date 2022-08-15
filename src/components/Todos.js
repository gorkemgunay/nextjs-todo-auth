import Todo from "./Todo";

export default function Todos({ sortedTodos, selectedCategory }) {
  return (
    <div className="flex flex-col gap-4 h-[36rem] overflow-y-scroll my-8 py-8">
      {!selectedCategory &&
        sortedTodos.map((todo) => <Todo key={todo._id} todo={todo} />)}
      {selectedCategory &&
        sortedTodos.map((todo) => <Todo key={todo._id} todo={todo} />)}
    </div>
  );
}
