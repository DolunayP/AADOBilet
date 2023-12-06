import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <img src="/logo-removebg-preview.png" alt="Logo" className="h-44" />
    </Link>
  );
}

export default Logo;
