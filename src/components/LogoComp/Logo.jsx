import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <img src="/ado-bilet-logo.png" alt="Logo" className="h-44" />
    </Link>
  );
}

export default Logo;
