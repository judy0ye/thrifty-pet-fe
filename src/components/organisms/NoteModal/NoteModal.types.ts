export interface Note {
  _id: string;
  product: string;
  description: string;
}

export interface NoteModalTypes {
  notes: Note[] | null;
  setNotes: React.Dispatch<React.SetStateAction<Note[] | null>>
  openedViewNotes: boolean;
  closeViewNotes: () => void;
  selectedNote: Note | null;
  setSelectedNote: React.Dispatch<React.SetStateAction<Note | null>>
}