import { IoHome, IoFileTrayFull, IoPower } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-2/12 h-screen p-2 flex flex-col justify-between">
      <div>
        <div className="bg-purple-700 h-48 rounded-2xl text-4xl flex items-end py-2 px-3 font-playfair hover:bg-purple-800">
          Purse
        </div>
        <div className="flex bg-neutral-900 rounded-xl my-2 h-16 items-center px-3 hover:bg-neutral-800">
          <IoHome className="text-3xl" />
          <span className="pl-3">Home</span>
        </div>
        <Link to="records">
          <div className="flex bg-neutral-900 rounded-xl my-2 h-16 items-center px-3 hover:bg-neutral-800">
            <IoFileTrayFull className="text-3xl" />
            <span className="pl-3">Records</span>
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
