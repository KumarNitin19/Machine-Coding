import { useState } from "react";
import Folder from "./Folder";
import "./style.css";

const Root = {
  id: "1",
  name: "root",
  type: "folder",
  children: [
    {
      id: "2",
      name: "File 1",
      type: "file",
    },
    {
      id: "3",
      name: "Folder 1",
      type: "folder",
    },
    {
      id: "4",
      name: "File 2",
      type: "file",
    },
  ],
};

const findAndAddItem = (mainData, parentId, itemToBeAdded) => {
  let output;
  if (mainData?.id === parentId) {
    output = {
      ...mainData,
      children: [...mainData?.children, itemToBeAdded],
    };
  } else {
    const updatedData = mainData?.children?.map((child) => {
      if (child?.id === parentId) {
        return {
          ...child,
          children: [...child?.children, itemToBeAdded],
        };
      }
      return findAndAddItem(child, parentId, itemToBeAdded);
    });
    output = { ...mainData, children: updatedData };
  }
  return output;
};

const FileExplorer = () => {
  const [rootFolder, setRootFolder] = useState(Root);

  const onAdd = (parentId, itemToBeAdded) => {
    const updatedData = findAndAddItem(rootFolder, parentId, itemToBeAdded);
    setRootFolder(updatedData);
  };

  return (
    <div className="file-explorer-container">
      <div>File Explorer</div>
      <Folder folderData={rootFolder} onAdd={onAdd} />
    </div>
  );
};

export default FileExplorer;
