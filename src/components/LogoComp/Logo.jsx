import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <img src="/ado-bilet-logo.png" alt="Logo" className="h-[120px]" />
    </Link>
  );
}

export default Logo;
