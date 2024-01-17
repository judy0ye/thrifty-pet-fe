import { Button, Modal, Skeleton, Stack, TextInput, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import type {NoteFormData, Note} from './Notes.types'
import { fetchAllNotes, postNote } from "@/pages/api/noteCalls";
import NoteModal from "../NoteModal";


export function Notes() {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedViewNotes, { open: openViewNotes, close: closeViewNotes }] = useDisclosure(false);
  const [notes, setNotes] = useState<Note[] | null>(null)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<NoteFormData>({
    product: '',
    description: ''
  })

  useEffect(() => {
    setLoading(true)
    const getAllNotes = async () => {
      try {
        const allNotes = await fetchAllNotes()
        setNotes(allNotes.notes)
        setLoading(false)
      } catch(error) {
        console.log(`${(error as Error).message}: Something went wrong`)
        setLoading(false)
      }
    }
    getAllNotes()
  }, [])

  const addNote = async (noteToAdd: NoteFormData) => {
    setLoading(true)
    try {
      const postedNote = await postNote(noteToAdd)
      setNotes([...notes ?? [], postedNote.note])
      setLoading(false)
      clearInputs()
      close()
    } catch (error) {
      console.log(`${(error as Error).message}: Something went wrong`)
      setLoading(false)
    }
  }
  //add logic to ask user to fill out all fields of form inputs

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;
  
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addNote(formData)
  }

  const clearInputs = () => {
    setFormData({product:'', description:''});
  }

  const addedNotes = notes?.map((note, index) => 
    <Stack key={index}>
      <Button  onClick={() => {openViewNotes(); setSelectedNote(note)}}  variant="default">
        {note.product}
      </Button>
    </Stack>
  )

  return(
    <>
      <Button onClick={open}>Add Notes</Button>
      <Modal 
        opened={opened} 
        onClose={() => {close(); clearInputs()}} 
        title="Add Notes" 
        centered
        overlayProps={{
          backgroundOpacity: 0.7,
          blur: 3,
        }}
        transitionProps={{ transition: 'slide-down' }}
      >
        <form onSubmit={handleSubmit}>

        <TextInput
          type="text"
          name="product"
          aria-label="Enter product here"
          placeholder="Enter product here"
          radius="md"
          value={formData.product}
          onChange={handleChange}
        ></TextInput>
        <Textarea
          name="description"
          py={16}
          size="md"
          radius="md"
          aria-label="Enter notes here"
          placeholder="Enter notes here"
          autosize
          minRows={2}
          maxRows={4}
          value={formData.description}
          onChange={handleChange}
      />
        <Button
        type="submit"
        >Save Notes</Button>
        </form>
      </Modal>
   
      {addedNotes}
      {selectedNote && (
        <NoteModal 
          notes={notes} 
          setNotes={setNotes}
          openedViewNotes={openedViewNotes} 
          closeViewNotes={closeViewNotes}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
        />
      )}
      <Skeleton  h={36} mt="sm" visible={loading} animate={false} />
    </>
  );
}