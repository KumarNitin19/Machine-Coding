type Props = {
  fileData: {
    id: string;
    name: string;
    type: "folder" | "file";
  };
};
const File = ({ fileData }: Props) => {
  return (
    <div>
      <div className="file-name">{fileData?.name}</div>
    </div>
  );
};

export default File;
