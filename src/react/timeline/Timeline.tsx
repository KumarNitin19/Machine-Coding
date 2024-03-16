import React from "react";
import { useEffect, useState } from "react";
import { TIMELINE } from "./Timeline.constant";

const Timeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  useEffect(() => {
    addStyle();
  }, []);

  const handleNext = () => {
    setActiveTab((prev) => prev + 1);
  };

  return (
    <div className="react-timeline">
      {TIMELINE?.map((item: string | number, index: number) => (
        <React.Fragment key={item}>
          <div
            key={item}
            className={`react-timeline-tab ${
              activeTab >= index ? "active" : ""
            }`}>
            {item}
          </div>
          {index !== TIMELINE.length - 1 ? (
            <div
              className={`react-timeline-bar ${
                activeTab >= index + 1 ? "active" : ""
              }`}></div>
          ) : (
            ""
          )}
        </React.Fragment>
      ))}

      <div className="react-timeline-next">
        <button
          disabled={activeTab === TIMELINE?.length - 1}
          onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Timeline;

const addStyle = () => {
  const Timeline = `
  .react-timeline{
    display:flex;
    align-items:center;
    gap:8px;
  }
  .react-timeline-tab{
    display:flex;
    align-items:center;
    justify-content:center;
    height:32px;
    width:32px;
    border-radius:50%;
    border:1px solid rgba(0,0,0,0.1);
    background:whitesmoke;
  }
  .react-timeline-bar{
    height: 2px;
    width:50px;
    background:whitesmoke;
  }
  .active{
    background:lightgreen;
    color:white;
    font-weight:500;
  }
  .react-timeline-next button{
    border:none;
    padding:8px 12px;
    cursor:pointer;
    margin-left:12px;
  }
  `;
  const styled = document.createElement("style");

  styled.innerHTML = Timeline;
  document.head.appendChild(styled);
};
