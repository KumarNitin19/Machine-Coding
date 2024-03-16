import * as React from "react";
import { useEffect } from "react";
import { BREADCRUMB_LIST } from "./Breadcrumb.constant";

const Breadcrumb = () => {
  useEffect(() => {
    addStyle();
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

const addStyle = () => {
  const Breadcrumb = ` 
    .react-breadcrumb, .react-breadcrumb-label{
        display:flex;
        gap:8px;
    }
    .react-breadcrumb-label{
        cursor:pointer;
        font-size:14px;
        font-weight:500;
    }
    .active{
      color:blue;
    }
      `;
  const styled = document.createElement("style");

  styled.innerHTML = Breadcrumb;
  document.head.appendChild(styled);
};
