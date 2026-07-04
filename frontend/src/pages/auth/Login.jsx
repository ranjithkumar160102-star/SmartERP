import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==============================
  // Handle Input Change
  // ==============================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==============================
  // Handle Login
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await loginUser(formData);

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-2">
          SmartERP
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to your account
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-4">

            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="w-full border rounded-lg p-3"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          <div className="mb-6">

            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="w-full border rounded-lg p-3"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>

                    <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Demo Login Details */}
        <div className="mt-6 border-t pt-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">
            Demo Login
          </p>

          <p>
            <strong>Email:</strong> admin@example.com
          </p>

          <p>
            <strong>Password:</strong> 123456
          </p>
        </div>

      </div>

    </div>
  );
}

export default Login;