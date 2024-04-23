export type NotesProp = Array<NoteProp>;

export type NoteProp = {
  id: string | number;
  text: string;
  position: {
    x: number;
    y: number;
  };
};
