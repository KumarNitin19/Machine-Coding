import { useEffect } from "react";
import { addStyle } from "../../utils/addStyle";

const Sidebar: React.FC = () => {
  const style = `
      .sidebar{
        width:25%;
        height:100%;
        border-right:1.5px solid grey;
      }
    `;
  useEffect(() => {
    addStyle(style);
  });
  return (
    <div className="sidebar">
      <div>Ming</div>
    </div>
  );
};

export default Sidebar;
