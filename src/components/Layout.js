import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Loader from "./Loader";

export default function Layout({ children }) {
  const loading = useSelector((state) => state.loader.loading);
  return (
    <>
      {loading && <Loader />}
      <Navbar />
      <div className="max-w-2xl w-full mx-auto px-4 mt-10">{children}</div>
    </>
  );
}
