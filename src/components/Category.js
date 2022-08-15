import Link from "next/link";

export default function Category({ category, selectedCategory }) {
  return (
    <Link href={`/category/${category._id}`}>
      <a
        className={`p-2 w-48 flex items-center justify-center text-sm font-semibold border-b-2 border-transparent ${
          category._id === selectedCategory && "border-b-blue-600"
        } cursor-pointer transition-all`}
      >
        {category.name}
      </a>
    </Link>
  );
}
