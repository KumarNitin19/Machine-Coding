import { BREADCRUMB_LIST } from "./Breadcrumb.constant";

const Breadcrumb = () => {
  return (
    <div className="react-breadcrumb">
      {BREADCRUMB_LIST?.map((item, index) => (
        <div key={item?.label} className="breadcrumb">
          {`${item?.label} ${index === BREADCRUMB_LIST?.length - 1 ? "" : ">"}`}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
