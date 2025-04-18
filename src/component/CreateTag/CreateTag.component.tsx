import { Box, Button, TextField, Typography, Modal } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/hook";
import { createNewTag } from "../../store/tag.slice";

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "24px",
  borderRadius: "8px",
  boxShadow: 24,
  width: 300,
};

interface CreateTagProps {
  open: boolean;
  onClose: () => void;
}

const CreateTag = ({ open, onClose }: CreateTagProps) => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const [tagName, setTagName] = useState("");

  const handleCreateTag = () => {
    if (userId) {
      dispatch(createNewTag({ userId, tagName }));
    }
    console.log("Tag created:", tagName);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={boxStyle}>
        <Typography variant="h6" mb={2}>
          Create a Tag
        </Typography>
        <TextField
          label="Tag Name"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" fullWidth onClick={handleCreateTag}>
          Create Tag
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateTag;
