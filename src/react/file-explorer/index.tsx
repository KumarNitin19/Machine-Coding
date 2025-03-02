import { useState } from "react";
import Folder from "./Folder";
import "./style.css";

const Root = {
  id: "1",
  name: "root",
  type: "folder",
  isRoot: true,
  children: [],
};

const findAndAddItem = (mainData, parentId, itemToBeAdded) => {
  let output = {};
  if (mainData?.id === parentId) {
    output = {
      ...mainData,
      children: [...mainData?.children, itemToBeAdded],
    };
  } else {
    output = {
      ...mainData,
      children: mainData?.children?.map((child) => {
        if (child?.id === parentId) {
          return {
            ...child,
            children: [...child?.children, itemToBeAdded],
          };
        }
        return findAndAddItem(child, parentId, itemToBeAdded);
      }),
    };
  }
  return output;
};

const findAndDeleteItem = (mainData, itemId) => {
  let output = {};
  const updatedData = mainData?.children
    ?.map((child) => {
      if (child?.id !== itemId) {
        return findAndDeleteItem(child, itemId);
      }
    })
    .filter(Boolean);

  output = { ...mainData, children: updatedData };
  return output;
};

const FileExplorer = () => {
  const [rootFolder, setRootFolder] = useState(Root);

  const onAdd = (parentId, itemToBeAdded) => {
    const updatedData = findAndAddItem(rootFolder, parentId, itemToBeAdded);
    setRootFolder(updatedData);
  };

  const onDelete = (itemId) => {
    const updatedData = findAndDeleteItem(rootFolder, itemId);
    setRootFolder(updatedData);
  };

  return (
    <div className="file-explorer-container">
      <div>File Explorer</div>
      <Folder folderData={rootFolder} onAdd={onAdd} onDelete={onDelete} />
    </div>
  );
};

export default FileExplorer;
