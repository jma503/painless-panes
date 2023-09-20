import { Link } from "react-router-dom";

export default function NavBar() {
  <div className="navbar bg-base-100">
    <Link className="btn btn-ghost normal-case text-xl" to="/formPageAddImagesView">
      Get Windows
    </Link>
    <Link className="btn btn-ghost normal-case text-xl" to="/priorProjectsPage">
      Prior Projects
    </Link>
  </div>
};
