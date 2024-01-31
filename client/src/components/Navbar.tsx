import { IoPower } from "react-icons/io5";
import { Link, Location, useLocation } from "react-router-dom";
import { links } from "../data/navbar";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/user/userSlice";

const Navbar = () => {
  let location: Location = useLocation();
  const dispatch = useAppDispatch();

  return (
    <nav className="w-4/12 h-screen p-2 flex flex-col justify-between md:w-2/12">
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
            <Link to={`${link.href}`} key={link.name}>
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
        <div
          className="flex bg-neutral-900 rounded-xl h-16 items-center px-3 hover:bg-neutral-800"
          onClick={() => {
            dispatch(logout());
          }}
        >
          <IoPower className="text-3xl" />
          <span className="pl-3">Logout</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
