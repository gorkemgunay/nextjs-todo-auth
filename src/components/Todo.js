import toast from "react-hot-toast";

export default function Todo({ todo, deleteTodo, isLoadingDelete }) {
  return (
    <div className="flex items-center justify-between p-6 bg-white rounded-lg transition hover:shadow-lg hover:-translate-y-1">
      <p className="text-sm font-semibold">{todo.text}</p>
      <button
        type="button"
        disabled={isLoadingDelete}
        onClick={async () => {
          try {
            await deleteTodo({ todoId: todo._id }).unwrap();
            toast.success("Todo deleted");
          } catch (error) {
            toast.error(error.data.message);
          }
        }}
        className="flex items-center justify-center h-10 px-2 rounded text-sm font-semibold bg-red-100 text-red-600 transition hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-600/20 hover:-translate-y-1 disabled:cursor-not-allowed"
      >
        Delete
      </button>
    </div>
  );
}
