import "./App.css";
import Sidebar from "./feature/sidebar";
import FileExplorer from "./react/file-explorer";
// import InfiniteScroll from "./react/infinite-scroll";
// import Introduction from "./pages/introduction";
// import DraggableNotes from "./react/draggable-notes";

function App() {
  return (
    <div className="app">
      <Sidebar />
      {/* <Introduction /> */}
      {/* <DraggableNotes /> */}
      {/* <InfiniteScroll /> */}
      <FileExplorer />
    </div>
  );
}

export default App;
