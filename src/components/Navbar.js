import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-center p-5">
          Lux
        </Link>

        <ul className="navbar-nav d-flex flex-row">
          <li className="nav-item">
            <Link className="nav-link" to="/rotation">
              Champion Rotation
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
