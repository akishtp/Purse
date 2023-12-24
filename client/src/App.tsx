// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

import AddRecord from "./components/AddRecord/AddRecord";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="flex">
      <Navbar />
      <div className="w-6/12 bg-neutral-900 my-2 mx-1 rounded-xl">Content</div>
      <AddRecord />
    </div>
  );
}

export default App;
