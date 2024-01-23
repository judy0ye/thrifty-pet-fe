import { deletePost, patchNote } from '@/pages/api/noteCalls';
import {
  Box,
  Button,
  Flex,
  Group,
  InputLabel,
  Menu,
  Modal,
  Stack,
  Text,
  TextInput,
  Textarea,
  rem
} from '@mantine/core';
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { Note, NoteModalTypes } from './NoteModal.types';

export const NoteModal = ({
  notes,
  setNotes,
  openedViewNotes,
  closeViewNotes,
  selectedNote,
  setSelectedNote
}: NoteModalTypes) => {
  const [editedNote, setEditedNote] = useState({
    product: '',
    description: ''
  });
  const [editClicked, setEditClicked] = useState(false);
  const [alert, setAlert] = useState<string | null>(null);

  const isFormIncomplete = () => {
    return Object.values(editedNote).some((input) => input === '');
  };

  const editNote = async (noteId: string, updatedNote: object) => {
    try {
      if (isFormIncomplete()) {
        setAlert('Please fill out all input fields');
      } else {
        await patchNote(noteId, updatedNote);
        const updatedNotes = (notes ?? []).map((note) => {
          if (note._id === noteId) {
            setSelectedNote({ ...note, ...updatedNote });
            return { ...note, ...updatedNote };
          } else {
            return note;
          }
        });

        setNotes(updatedNotes);
        setEditClicked(false);
      }
    } catch (error) {
      console.log(`${(error as Error).message}: Something went wrong`);
    }
  };

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setAlert(null);
    const { name, value } = e.target;

    if (selectedNote) {
      setEditedNote({ ...editedNote, [name]: value });
    }
  };

  const handledSelectedNoteClose = () => {
    editClicked && setEditClicked(false);
    closeViewNotes();
    setSelectedNote(null);
  };

  const handleEditClick = () => {
    setEditClicked(true);
    if (selectedNote) {
      setEditedNote({
        product: selectedNote.product,
        description: selectedNote.description
      });
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      await deletePost(noteId);
      const updatedNotes: Note[] | null = notes
        ? notes.filter((note) => note._id !== noteId)
        : null;
      setNotes(updatedNotes);
      closeViewNotes();
    } catch (error) {
      console.log(`${(error as Error).message}: Something went wrong`);
    }
  };

  return (
    <Modal.Root
      opened={openedViewNotes}
      onClose={handledSelectedNoteClose}
      centered>
      <Modal.Overlay backgroundOpacity={0.7} blur={3} />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title fz={28} fw={'bolder'}>
            Your Notes
          </Modal.Title>
          <Flex style={{ alignItems: 'center' }}>
            <Menu>
              <Menu.Target>
                <Button
                  aria-label="menu dropdown"
                  variant="default"
                  size="compact-sm"
                  style={{ border: 'none' }}>
                  <IconDotsVertical
                    style={{ height: '20px', strokeWidth: 1.5 }}
                  />
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label aria-label="Edit or Delete"></Menu.Label>
                <Menu.Item
                  onClick={handleEditClick}
                  leftSection={
                    <IconEdit style={{ width: rem(14), height: rem(14) }} />
                  }>
                  Edit
                </Menu.Item>
                <Menu.Item
                  onClick={() => selectedNote && deleteNote(selectedNote._id)}
                  leftSection={
                    <IconTrash style={{ width: rem(14), height: rem(14) }} />
                  }>
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Modal.CloseButton aria-label="Close Modal" />
          </Flex>
        </Modal.Header>
        <Modal.Body>
          {editClicked ? (
            <Box>
              <Stack gap={0}>
                <InputLabel fz={'md'} fw={'bold'}>
                  Product:
                </InputLabel>
                <TextInput
                  type="text"
                  name="product"
                  radius="md"
                  value={editedNote.product}
                  onChange={handleChange}
                />
              </Stack>
              <Stack gap={0} py={16}>
                <InputLabel fz={'md'} fw={'bold'}>
                  Description:
                </InputLabel>
                <Textarea
                  name="description"
                  size="md"
                  radius="md"
                  autosize
                  minRows={2}
                  maxRows={4}
                  value={editedNote.description}
                  onChange={handleChange}></Textarea>
              </Stack>
            </Box>
          ) : (
            <Box>
              <Stack gap={0}>
                <Text fz={'md'} fw={'bold'}>
                  Product:
                </Text>
                <Text>{selectedNote?.product}</Text>
              </Stack>
              <Stack gap={0} py={16}>
                <Text fz={'md'} fw={'bold'}>
                  Description:
                </Text>
                <Text>{selectedNote?.description}</Text>
              </Stack>
            </Box>
          )}
          {editClicked && (
            <Stack>
              <Group justify="space-between">
                <Button onClick={() => setEditClicked(false)}>
                  Cancel Edit
                </Button>
                <Button
                  onClick={() =>
                    selectedNote && editNote(selectedNote._id, editedNote)
                  }>
                  Save Edit
                </Button>
              </Group>
              <Text>{alert}</Text>
            </Stack>
          )}
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
