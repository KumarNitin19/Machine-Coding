import { useEffect } from "react";
import { addStyle } from "../../utils/addStyle";

const Sidebar: React.FC = () => {
  const style = `
      .sidebar{
        width:30%;
        height:100%;
        border-right:1px solid grey;
      }
    `;
  useEffect(() => {
    addStyle(style);
  });
  return (
    <div className="sidebar">
      <div>Sidebar</div>
    </div>
  );
};

export default Sidebar;
