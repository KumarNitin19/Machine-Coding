import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { addStyle } from "../../utils/addStyle";
import { NOTES } from "./constant";
import { NoteProp, NotesProp } from "./type";

const DraggableNotes = () => {
  const [notes, setNotes] = useState<NotesProp>([]);
  const noteRef = useRef([]);
  const style = ` 
    .notes{
        position:relative;
    }
      `;

  useEffect(() => {
    addStyle(style);
  }, []);

  useEffect(() => {
    const notesFromLocalStorage = localStorage.getItem("notes");
    const savedNotes = notesFromLocalStorage
      ? JSON.parse(notesFromLocalStorage)
      : [];
    const updatedNotes: NotesProp = NOTES.map((note) => {
      const savedNote = savedNotes.find((n: NoteProp) => n.id === note.id);
      if (savedNote) {
        return { ...note, position: savedNote?.position };
      }
      const position = determinNewPosition();
      return { ...note, position };
    });
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
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
        <Note key={item.id} {...item} />
      ))}
    </div>
  );
};

const Note = (props: any) => {
  console.log(props);
  const { text, position, id } = props;
  const style = ` 
    .note-${id}{
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
    <div className={`note-${id}`} {...props}>
      📍 {text}
    </div>
  );
};

export default DraggableNotes;
