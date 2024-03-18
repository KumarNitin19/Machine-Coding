import { useEffect } from "react";
import { addStyle } from "../../utils/addStyle";
import { BREADCRUMB_LIST } from "./Breadcrumb.constant";

const Breadcrumb = () => {
  const style = ` 
    .react-breadcrumb, .react-breadcrumb-label{
        display:flex;
        gap:8px;
    }
    .react-breadcrumb-label{
        cursor:pointer;
        font-size:14px;
        font-weight:500;
    }
    .react-breadcrumb .active{
      color:blue;
    }
      `;

  useEffect(() => {
    addStyle(style);
  }, []);
  return (
    <div className="react-breadcrumb">
      {BREADCRUMB_LIST?.map((item, index) => (
        <div key={item?.label} className="react-breadcrumb-label">
          <div>{item?.label}</div>
          <div>{index === BREADCRUMB_LIST?.length - 1 ? "" : ">"}</div>
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
