import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-700 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Organ Connect</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/finder">Finder</Link>
        <Link to="/donor-form">Become a Donor</Link>
        <Link to="/distributor">Distributor</Link>
      </div>
    </nav>
  );
};

export default Navbar;
