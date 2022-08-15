import { useMemo } from "react";
import { useRouter } from "next/router";
import { useMeQuery } from "../../features/user/userApi";
import { useGetTodosByCategoryQuery } from "../../features/todo/todoApi";
import { useGetCategoriesQuery } from "../../features/category/categoryApi";
import withAuth from "../../hoc/withAuth";
import Profile from "../../components/Profile";
import Categories from "../../components/Categories";
import Todos from "../../components/Todos";
import TodoForm from "../../components/TodoForm";
import Layout from "../../components/Layout";

function Category() {
  const router = useRouter();
  const { categoryId } = router.query;
  const { data: user } = useMeQuery();
  const { data: categoryTodos = [], isLoading: isLoadingCategoryTodos } =
    useGetTodosByCategoryQuery(categoryId);
  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategoriesQuery();

  const sortedCategoryTodos = useMemo(() => {
    const sortedCategoryTodos = categoryTodos.slice();
    sortedCategoryTodos.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    return sortedCategoryTodos;
  }, [categoryTodos]);

  return (
    <Layout>
      <Profile user={user} selectedCategory={categoryId} />
      <TodoForm selectedCategory={categoryId} />
      {!isLoadingCategories && (
        <Categories categories={categories} selectedCategory={categoryId} />
      )}
      {!isLoadingCategoryTodos &&
        categoryTodos.length === 0 &&
        !isLoadingCategories && (
          <div className="p-4 bg-yellow-100 text-yellow-600 rounded my-8 text-sm font-semibold">
            {categories.length === 0
              ? "There is no todo here. To create todo, first create category."
              : "There is no todo here. Create one."}
          </div>
        )}
      {!isLoadingCategoryTodos && (
        <Todos
          sortedTodos={sortedCategoryTodos}
          selectedCategory={categoryId}
        />
      )}
    </Layout>
  );
}

export default withAuth(Category);
