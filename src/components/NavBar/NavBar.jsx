import { Link } from 'react-router-dom';

export default function NavBar() {

    return (
        <div className="navbar bg-base-100">
            <Link className="btn btn-ghost normal-case text-xl" to="/formPageAddImages" >
                Get Windows
            </Link>

            <Link className="btn btn-ghost normal-case text-xl" to="/displayPriorProjectsView" >
                My Projects
            </Link>
        </div>
    )
};