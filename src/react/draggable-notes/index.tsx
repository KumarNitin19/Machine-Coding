import { createRef, useRef } from "react";
import { useState } from "react";
import { forwardRef } from "react";
import { useEffect } from "react";
import { addStyle } from "../../utils/addStyle";
import { NOTES } from "./constant";
import { NoteProp, NotesProp } from "./type";

const DraggableNotes = () => {
  const [notes, setNotes] = useState<NotesProp>([]);
  const noteRefs = useRef<any>({});
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

  const handleDragStart = (e: Event, noteId: string | number) => {
    const noteRef = noteRefs.current[noteId].current;
    const rect = noteRef.getBoundingClientRect;
  };

  return (
    <div className="notes">
      {notes?.length
        ? notes?.map((item: NoteProp) => (
            <Note
              key={item?.id}
              ref={
                noteRefs?.current[item?.id]
                  ? noteRefs?.current[item.id]
                  : (noteRefs.current[item.id] = createRef())
              }
              id={item.id}
              text={item.text}
              position={item.position}
              onMouseDown={(e: Event) => handleDragStart(e, item.id)}
            />
          ))
        : null}
    </div>
  );
};

const Note: React.FC<any> = forwardRef((props, ref) => {
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
    <div ref={ref} className={`note-${id}`} {...props}>
      📍 {text}
    </div>
  );
});

export default DraggableNotes;
