import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Layout.css";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}