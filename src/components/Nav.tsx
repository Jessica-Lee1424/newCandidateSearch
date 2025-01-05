import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <Link className="nav-link nav-item" to="/">
        Home
      </Link>
      <Link className="nav-link nav-item" to="/SavedCandidates">
        Potential Candidates
      </Link>
    </nav>
  );
};

export default Nav;
