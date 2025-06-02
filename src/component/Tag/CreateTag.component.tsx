import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tag } from "../../myApi";
import { useAppDispatch } from "../../store/hook";
import { createNewTag, updateTag } from "../../store/tag.slice";

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
  tag?: Tag | null;
}

const CreateTag = ({ open, onClose, tag }: CreateTagProps) => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const [tagName, setTagName] = useState(tag?.name || "");

  useEffect(() => {
    setTagName(tag?.name || "");
  }, [tag]);

  const closeModal = () => {
    setTagName("");
    onClose();
  };

  const handleSubmit = () => {
    if (!userId) return;

    if (tag?.id) {
      dispatch(updateTag({ tagId: tag.id, userId, tagName }));
      console.log("Edit tag", tag.id, tagName);
    } else {
      dispatch(createNewTag({ userId, tagName }));
    }
    closeModal();
  };

  return (
    <Modal open={open} onClose={closeModal}>
      <Box sx={boxStyle}>
        <Typography variant="h6" mb={2}>
          {tag?.id ? "Edit Tag" : "Create a Tag"}
        </Typography>
        <TextField
          label="Tag Name"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" fullWidth onClick={handleSubmit}>
          {tag?.id ? "Update Tag" : "Create Tag"}
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateTag;
