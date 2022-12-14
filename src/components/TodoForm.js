import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateTodoMutation } from "../features/todo/todoApi";

export default function TodoForm({ selectedCategory }) {
  const [todoText, setTodoText] = useState("");
  const [createTodo, { isLoading: isLoadingCreate }] = useCreateTodoMutation();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          await createTodo({
            text: todoText,
            categoryId: selectedCategory,
          }).unwrap();
          toast.success("Todo created");
          setTodoText("");
        } catch (error) {
          toast.error(error.data.message);
        }
      }}
      className="flex items-center gap-4"
    >
      <input
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="Type a todo..."
        className="h-10 px-2 rounded border border-gray-200 flex-1 outline-blue-600"
      />
      <button
        disabled={isLoadingCreate || !todoText}
        className="flex items-center justify-center h-10 px-2 rounded text-sm font-semibold bg-blue-100 text-blue-600 transition hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/20 hover:-translate-y-1 disabled:cursor-not-allowed whitespace-nowrap"
      >
        Add Todo
      </button>
    </form>
  );
}
