import { IoHome, IoPower } from "react-icons/io5";
import { BsCashStack } from "react-icons/bs";
import { Link, Location, useLocation } from "react-router-dom";

const Navbar = () => {
  let location: Location = useLocation();
  console.log(location);

  return (
    <nav className="w-2/12 h-screen p-2 flex flex-col justify-between">
      <div>
        <Link to="/">
          <div className="bg-purple-700 h-48 rounded-2xl text-4xl flex items-end py-2 px-3 font-playfair hover:bg-purple-800">
            Purse
          </div>
        </Link>
        <Link to="/">
          <div
            className={`flex rounded-xl my-2 h-16 items-center px-3 hover:bg-neutral-800 ${
              location.pathname === "/" ? "bg-neutral-800" : "bg-neutral-900"
            }`}
          >
            <IoHome className="text-3xl" />
            <span className="pl-3">Home</span>
          </div>
        </Link>
        <Link to="loans">
          <div
            className={`flex rounded-xl my-2 h-16 items-center px-3 hover:bg-neutral-800 ${
              location.pathname === "/loans"
                ? "bg-neutral-800"
                : "bg-neutral-900"
            }`}
          >
            <BsCashStack className="text-3xl" />
            <span className="pl-3">Loans</span>
          </div>
        </Link>
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
