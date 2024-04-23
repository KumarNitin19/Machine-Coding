import "./App.css";
import Sidebar from "./feature/sidebar";
import Introduction from "./pages/introduction";
import DraggableNotes from "./react/draggable-notes";

function App() {
  return (
    <div className="app">
      <Sidebar />
      {/* <Introduction /> */}
      <DraggableNotes />
    </div>
  );
}

export default App;
