import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="max-w-2xl w-full mx-auto px-4 mt-10">{children}</div>
    </>
  );
}
