import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import toast from "react-hot-toast";
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../features/todo/todoApi";

export default function Todo({ todo }) {
  const [deleteTodo, { isLoading: isLoadingDeleteTodo }] =
    useDeleteTodoMutation();
  const [updateTodo, { isLoading: isLoadingUpdateTodo }] =
    useUpdateTodoMutation();
  dayjs.extend(relativeTime);
  return (
    <div
      className={`flex items-center justify-between gap-4 p-6 ${
        todo.done ? "bg-gray-100" : "bg-white"
      } rounded-lg transition hover:shadow-lg hover:-translate-y-1`}
    >
      <div
        onClick={async () => {
          try {
            await updateTodo({ todoId: todo._id });
          } catch (error) {
            toast.error(error.data.message);
          }
        }}
        className={`w-full text-sm font-semibold break-words whitespace-normal cursor-pointer ${
          todo.done && "line-through"
        }`}
      >
        {todo.text}
      </div>
      <div className="flex items-center gap-4">
        <small className="text-gray-400 whitespace-nowrap">
          {dayjs().from(dayjs(todo.createdAt))}
        </small>
        <button
          type="button"
          disabled={isLoadingDeleteTodo || isLoadingUpdateTodo}
          onClick={async () => {
            try {
              await deleteTodo({
                todoId: todo._id,
                categoryId: todo.category,
              }).unwrap();
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
    </div>
  );
}
