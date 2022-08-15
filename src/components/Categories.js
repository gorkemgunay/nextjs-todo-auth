import Link from "next/link";
import Category from "./Category";

export default function Categories({ categories, selectedCategory }) {
  return (
    <div className="flex items-center justify-center mt-16">
      <Link href="/">
        <a
          className={`p-2 w-48 flex items-center justify-center text-sm font-semibold border-b-2 border-transparent ${
            !selectedCategory && "border-b-blue-600"
          } cursor-pointer transition-all`}
        >
          All
        </a>
      </Link>
      {categories.map((category) => (
        <Category
          key={category._id}
          category={category}
          selectedCategory={selectedCategory}
        />
      ))}
    </div>
  );
}
