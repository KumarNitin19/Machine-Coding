import { useCallback, useState } from "react";
import File from "./File";

type Props = {
  folderData: {
    id: string;
    name: string;
    type: "folder" | "file";
    isRoot?: boolean;
    children?: Array<unknown>;
  };
  onAdd: (id: any, item: any) => void;
  onDelete: (id: any) => void;
};

const OpenCollapseIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <svg
      className={`open-close-icon ${isOpen ? "open" : "close"}`}
      width="1em"
      height="1em"
      viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 14.975q-.2 0-.375-.062T11.3 14.7l-4.6-4.6q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275t.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062"></path>
    </svg>
  );
};

const Folder = ({ folderData, onAdd, onDelete }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAddItem, setIsAddItem] = useState(false);
  const [selectedAddItem, setSelectedAddItem] = useState("");
  const [itemName, setItemName] = useState("");

  const handleFolderExpandCollapse = useCallback(
    () => setIsExpanded((prev) => !prev),
    []
  );

  const handleOpenAddItem = useCallback((itemType) => {
    setIsAddItem(true);
    setSelectedAddItem(itemType);
    setIsExpanded(true);
  }, []);

  const handleCloseAddItem = useCallback(() => {
    setIsAddItem(false);
    setSelectedAddItem("");
  }, []);

  const handleAddItem = useCallback(
    (parentId: string) => {
      onAdd(parentId, {
        id: Date.now(),
        name: itemName,
        type: selectedAddItem,
        children: [],
      });
      handleCloseAddItem();
    },
    [selectedAddItem, itemName, onAdd, handleCloseAddItem]
  );

  const handleDelete = useCallback(
    (itemId) => {
      onDelete(itemId);
    },
    [onDelete]
  );

  return (
    <div className="folder-container">
      <div className="folder-header">
        <div className="folder-name" onClick={handleFolderExpandCollapse}>
          <OpenCollapseIcon isOpen={isExpanded} />
          <div>{folderData?.name}</div>
        </div>
        <div className="folder-actions">
          <button onClick={() => handleOpenAddItem("folder")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24">
              <path
                fill="#fff"
                d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h5.175q.4 0 .763.15t.637.425L12 6h8q.825 0 1.413.588T22 8v10q0 .825-.587 1.413T20 20zm10-6v1q0 .425.288.713T15 16t.713-.288T16 15v-1h1q.425 0 .713-.288T18 13t-.288-.712T17 12h-1v-1q0-.425-.288-.712T15 10t-.712.288T14 11v1h-1q-.425 0-.712.288T12 13t.288.713T13 14z"
              />
            </svg>
          </button>
          <button onClick={() => handleOpenAddItem("file")}>
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
          </button>
          {!folderData?.isRoot ? (
            <button onClick={() => handleDelete(folderData?.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24">
                <path
                  fill="#fff"
                  d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
                />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
      {isAddItem ? (
        <div className="add-new-item">
          <input
            type="text"
            placeholder="Enter name"
            onChange={(e) => setItemName(e.target.value)}
          />
          <button onClick={handleCloseAddItem}>x</button>
          <button onClick={() => handleAddItem(folderData?.id)}>Add</button>
        </div>
      ) : null}
      {isExpanded ? (
        <div className="folder-children">
          {folderData?.children?.map((item: any) => {
            if (item?.type === "folder") {
              return (
                <Folder
                  key={item.id}
                  folderData={item}
                  onAdd={onAdd}
                  onDelete={onDelete}
                />
              );
            } else {
              return <File key={item?.id} fileData={item} />;
            }
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Folder;
