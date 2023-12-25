import { IoPower } from "react-icons/io5";
import { Link, Location, useLocation } from "react-router-dom";
import { data } from "./data";
import { IconType } from "react-icons";

const Navbar = () => {
  let location: Location = useLocation();

  const links: Array<{
    name: string;
    href: string;
    iconOutline: IconType;
    iconFill: IconType;
  }> = data;

  return (
    <nav className="w-2/12 h-screen p-2 flex flex-col justify-between">
      <div>
        <Link to="/">
          <div className="bg-purple-700 h-48 rounded-2xl text-4xl flex items-end py-2 px-3 font-playfair hover:bg-purple-800">
            Purse
          </div>
        </Link>
        {links.map((link) => {
          let LinkIcon = link.iconOutline;
          if (location.pathname === link.href) {
            LinkIcon = link.iconFill;
          }
          return (
            <Link to={`${link.href}`}>
              <div
                className={`flex rounded-xl my-2 h-16 items-center px-3 hover:bg-neutral-800 ${
                  location.pathname === link.href
                    ? "bg-neutral-800"
                    : "bg-neutral-900"
                }`}
              >
                <LinkIcon className="text-3xl" />
                <span className="pl-3">{link.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
      <div>
        <div className="flex bg-neutral-900 rounded-xl h-16 items-center px-3 hover:bg-neutral-800">
          <IoPower className="text-3xl" />
          <span className="pl-3">Logout</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
