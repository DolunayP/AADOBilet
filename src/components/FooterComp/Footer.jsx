import { Link } from "react-router-dom";
import { FaFacebook, FaWhatsapp, FaTwitter, FaInstagram } from "react-icons/fa";
import Logo from "../LogoComp/Logo";

function Footer() {
  return (
    <div className=" bg-color-secondary py-4 text-[#f7caca]">
      <div className="flex justify-center ">
        <Logo />
      </div>
      <div className="text-xl mb-8">
        Dive into the fun, renew yourself. Look for subtlety, not details.
      </div>
      <div className="mb-8">
        <ul className="flex justify-center text-md">
          <li className="mx-5 hover:text-white transition-all duration-200">
            <Link to="/events">Events</Link>
          </li>
          <li className="mx-5 hover:text-white transition-all duration-200">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="mx-5 hover:text-white transition-all duration-200">
            <Link to="/">Homepage</Link>
          </li>
        </ul>
      </div>
      <div className="flex justify-center space-x-5">
        <FaFacebook
          size={36}
          className="hover:text-white transition-all duration-200 cursor-pointer"
        />
        <FaWhatsapp
          size={36}
          className="hover:text-white transition-all duration-200 cursor-pointer"
        />
        <FaTwitter
          size={36}
          className="hover:text-white transition-all duration-200 cursor-pointer"
        />
        <FaInstagram
          size={36}
          className="hover:text-white transition-all duration-200 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Footer;
