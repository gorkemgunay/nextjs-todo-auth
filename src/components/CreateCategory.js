import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateCategoryMutation } from "../features/category/categoryApi";

export default function CreateaCategory({ setShowCreateCategory }) {
  const [categoryName, setCategoryName] = useState("");
  const [createCategory, { isLoading: isLoadingCreateCategory }] =
    useCreateCategoryMutation();

  return (
    <div className="absolute w-full h-full inset-0 flex items-center justify-center bg-black/40">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await createCategory({ name: categoryName }).unwrap();
            toast.success("Category created");
            setCategoryName("");
            setShowCreateCategory(false);
          } catch (error) {
            toast.error(error.data.message);
          }
        }}
        className="max-w-2xl w-full mx-auto flex flex-col gap-4 bg-white p-8 rounded"
      >
        <input
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Type a category name..."
          className="h-10 px-2 rounded border border-gray-200 outline-blue-600"
        />
        <button
          disabled={isLoadingCreateCategory || !categoryName}
          className="flex items-center justify-center h-10 px-2 rounded text-sm font-semibold bg-blue-100 text-blue-600 transition hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/20 hover:-translate-y-1 disabled:cursor-not-allowed whitespace-nowrap"
        >
          Add Category
        </button>
        <button
          type="button"
          disabled={isLoadingCreateCategory}
          onClick={() => setShowCreateCategory(false)}
          className="flex items-center justify-center h-10 px-2 rounded text-sm font-semibold bg-red-100 text-red-600 transition hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-600/20 hover:-translate-y-1 disabled:cursor-not-allowed whitespace-nowrap"
        >
          Close
        </button>
      </form>
    </div>
  );
}
