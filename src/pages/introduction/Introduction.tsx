import { useEffect } from "react";
import { addStyle } from "../../utils/addStyle";

const Introduction: React.FC = () => {
  const styles = `
    .introduction{
        height:100%;
        width:100%;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        gap:20px;
        text-align:center;
    }
    .introduction-heading{
        display:flex;
        flex-direction:column;
        gap:16px;
    }
    .introduction-heading > .heading{
        font-size:52px;
        font-weight:500;
    }
    .introduction-heading > .description{
        font-size:24px;
        font-weight:400;
    }
    .introduction-search{
        width:100%;
    }
    .introduction-search > input{
        border:none;
        font-size:14px;
        width:60%;
        background:white;
        padding: 8px;
        border-radius:20px;
        box-sizing:border-box;
    }
    .introduction-search > input:focus{
        outline:none;
    }
    `;

  useEffect(() => {
    addStyle(styles);
  }, []);

  return (
    <div className="introduction">
      <div className="introduction-heading">
        <div className="heading">
          Advance your frontend <br /> journey with us!!
        </div>
        <div className="description">
          We provide you the best knowledge we had.
        </div>
      </div>
      <div className="introduction-search">
        <input type="text" placeholder="Search for components" />
      </div>
      <div className="introduction-follow-us"></div>
    </div>
  );
};

export default Introduction;
