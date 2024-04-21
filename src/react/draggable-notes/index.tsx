import { useState } from "react";
import { useEffect } from "react";
import { addStyle } from "../../utils/addStyle";
import { NOTES } from "./constant";
import { NotesProp } from "./type";

const DraggableNotes = () => {
  const [notes, setNotes] = useState<NotesProp>([]);
  const style = ` 
    .notes{
        position:relative;
    }
      `;

  useEffect(() => {
    addStyle(style);
  }, []);

  useEffect(() => {
    const updatedNotes: NotesProp = NOTES.map((note) => {
      const position = determinNewPosition();
      return { ...note, position };
    });
    setNotes(updatedNotes);
  }, [NOTES.length]);

  const determinNewPosition = () => {
    const maxX = window.innerWidth - 250;
    const maxY = window.innerHeight - 250;
    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  };
  return (
    <div className="notes">
      {notes.map((item) => (
        <Note key={item.id} position={item?.position} text={item.text} />
      ))}
    </div>
  );
};

const Note = (props: any) => {
  const { text, position } = props;
  const style = ` 
    .note{
        position:absolute;
        left:${position?.x}px;
        top:${position?.y}px;
        border:1px solid black;
        user-select:none;
        padding:10px;
        cursor:move;
        background:lightgoldenrodyellow;
        color:black;
        border-radius:4px;
    }
      `;

  useEffect(() => {
    addStyle(style);
  }, []);

  return (
    <div className="note" {...props}>
      📍 {text}
    </div>
  );
};

export default DraggableNotes;
