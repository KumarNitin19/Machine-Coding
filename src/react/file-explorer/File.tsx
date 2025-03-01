type Props = {
  fileData: {
    id: string;
    name: string;
    type: "folder" | "file";
  };
};
const File = ({ fileData }: Props) => {
  return (
    <div className="file-header">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24">
        <path
          fill="#fff"
          d="M6 19V1h9l6 6v12zm8-11h5l-5-5zM2 23V7h2v14h11v2z"
        />
      </svg>
      <div className="file-name">{fileData?.name}</div>
    </div>
  );
};

export default File;
