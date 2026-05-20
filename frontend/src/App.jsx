import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import LogInteraction from "./pages/LogInteraction";

function App() {

  return (

    <BrowserRouter>

      <div className="flex min-h-screen">

        {/* Sidebar */}

        <div className="w-64 bg-gray-900 text-white p-6">

          <h1 className="text-3xl font-bold mb-10">
            MediConnect CRM
          </h1>

          <div className="space-y-4">

            <Link
              to="/"
              className="block bg-gray-800 p-3 rounded-lg hover:bg-blue-600"
            >
              Dashboard
            </Link>

            <Link
              to="/log"
              className="block bg-gray-800 p-3 rounded-lg hover:bg-blue-600"
            >
              Log Interaction
            </Link>

            <Link
              to="/history"
              className="block bg-gray-800 p-3 rounded-lg hover:bg-blue-600"
            >
              History
            </Link>

          </div>

        </div>

        {/* Main Content */}

        <div className="flex-1 p-6 bg-gray-100">

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/log"
              element={<LogInteraction />}
            />

            <Route
              path="/history"
              element={<History />}
            />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;