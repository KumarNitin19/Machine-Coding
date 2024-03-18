import "./App.css";
import Sidebar from "./feature/sidebar";
import Introduction from "./pages/introduction";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Introduction />
    </div>
  );
}

export default App;
