import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../features/user/userApi";
import { clearAccessToken } from "../features/user/userSlice";
import CreateCategory from "../components/CreateCategory";
import { useDeleteCategoryMutation } from "../features/category/categoryApi";

export default function Profile({
  user,
  selectedCategory,
  setSelectedCategory,
}) {
  const [deleteCategory, { isLoading: isLoadingDeleteCategory }] =
    useDeleteCategoryMutation();
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [logout] = useLogoutMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <>
      {showCreateCategory && (
        <CreateCategory setShowCreateCategory={setShowCreateCategory} />
      )}
      <div className="flex items-center justify-center flex-col gap-4 pb-10">
        <h2 className="text-xl font-semibold">{user.email}</h2>
        <div className="flex item-center gap-4">
          <div>
            {user.todos.length > 1 && (
              <h4 className="text-sm font-semibold">
                {user.todos.length} todos
              </h4>
            )}
            {user.todos.length === 1 && (
              <h4 className="text-sm font-semibold">
                {user.todos.length} todo
              </h4>
            )}
          </div>
          <div>
            {user.categories.length > 1 && (
              <h4 className="text-sm font-semibold">
                {user.categories.length} categories
              </h4>
            )}
            {user.categories.length === 1 && (
              <h4 className="text-sm font-semibold">
                {user.categories.length} category
              </h4>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {selectedCategory === "all" && (
            <button
              type="button"
              onClick={() => setShowCreateCategory(true)}
              className="flex items-center justify-center h-10 px-2 rounded text-sm font-semibold bg-blue-100 text-blue-600 transition hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/20 hover:-translate-y-1 disabled:cursor-not-allowed"
            >
              Create Category
            </button>
          )}
          {selectedCategory !== "all" && (
            <button
              type="button"
              disabled={isLoadingDeleteCategory}
              onClick={async () => {
                try {
                  await deleteCategory({
                    categoryId: selectedCategory,
                  }).unwrap();
                  setSelectedCategory("all");
                  toast.success("Category deleted");
                } catch (error) {
                  toast.error(error.data.message);
                }
              }}
              className="flex items-center justify-center h-10 px-2 rounded text-sm font-semibold bg-red-100 text-red-600 transition hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-600/20 hover:-translate-y-1 disabled:cursor-not-allowed"
            >
              Delete This Category
            </button>
          )}
          <button
            type="button"
            onClick={async () => {
              try {
                await logout().unwrap();
                dispatch(clearAccessToken());
                toast.success("Successfully logout");
                router.push("/auth/login");
              } catch (error) {
                toast.error(error.data.message);
              }
            }}
            className="flex items-center justify-center h-10 px-2 rounded text-sm font-semibold bg-blue-100 text-blue-600 transition hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/20 hover:-translate-y-1 disabled:cursor-not-allowed"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
