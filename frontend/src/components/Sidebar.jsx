import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menus = [
    {
      title: "Dashboard",
      path: "/",
      icon: "🏠",
      section: "",
    },
    {
      title: "Customers",
      path: "/customers",
      icon: "👤",
      section: "MASTER",
    },
    {
      title: "Suppliers",
      path: "/suppliers",
      icon: "🏢",
      section: "",
    },
    {
      title: "Items",
      path: "/items",
      icon: "📦",
      section: "",
    },
    {
      title: "Sales",
      path: "/sales",
      icon: "🧾",
      section: "TRANSACTIONS",
    },
    {
      title: "Purchase",
      path: "/purchase",
      icon: "📥",
      section: "",
    },
    {
      title: "Reports",
      path: "/reports",
      icon: "📊",
      section: "REPORTS",
    },
  ];

  let lastSection = "";

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-slate-900 text-white shadow-xl">

      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-slate-700">

        <h1 className="text-3xl font-extrabold tracking-wide text-blue-400">
          SmartERP
        </h1>

      </div>

      {/* Menu */}
      <nav className="mt-6 px-3">

        {menus.map((menu) => (
          <div key={menu.path}>

            {menu.section && menu.section !== lastSection && (
              <>
                {(lastSection = menu.section)}
                <p className="text-xs uppercase text-slate-400 font-semibold mt-6 mb-2 px-3 tracking-widest">
                  {menu.section}
                </p>
              </>
            )}

            <Link
              to={menu.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200
                ${
                  location.pathname === menu.path
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
            >
              <span className="text-xl">{menu.icon}</span>

              <span className="font-medium">
                {menu.title}
              </span>

            </Link>

          </div>
        ))}

      </nav>

      {/* Footer */}
      <div className="absolute bottom-5 left-0 w-full px-5">

        <div className="border-t border-slate-700 pt-4">

          <p className="text-xs text-slate-400 text-center">
            SmartERP v1.0
          </p>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;