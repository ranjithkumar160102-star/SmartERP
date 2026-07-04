import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">

      <div className="flex items-center justify-between px-8 h-20">

        {/* Left */}
        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            SmartERP
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            {today}
          </p>

        </div>

        {/* Right */}
        <div className="flex items-center gap-5">

          <div className="text-right">

            <p className="text-sm text-gray-500">
              Welcome
            </p>

            <h3 className="font-semibold text-slate-700">
              {user?.name || "Admin"}
            </h3>

          </div>

          <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow">

            {(user?.name || "A").charAt(0).toUpperCase()}

          </div>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition duration-200 shadow"
          >
            Logout
          </button>

        </div>

      </div>

    </header>
  );
}

export default Header;