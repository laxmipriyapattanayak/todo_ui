import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { createNewTodo } from "../../store/todo.slice";
import { useAppDispatch } from "../../store/hook";
import { TaskStatus } from "../../myApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

const CreateTodo = ({ onClose }: { onClose: () => void }) => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();

  const [errorState, setErrorState] = useState({
    title: "",
    desc: "",
  });

  const [todo, setTodo] = useState({
    title: "",
    description: "",
    status: TaskStatus.PENDING,
    date: "",
    //tags: [{ taskId: 0, tagId: 0 }],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
    console.log(todo);

    const errState = {
      title: "",
      desc: "",
    };
    if (e.target.name === "title" && e.target.value.length === 0) {
      errState.title = "please enter something";
    }
    if (e.target.name === "description" && e.target.value.length === 0) {
      errState.title = "please enter something";
    }
    setErrorState(errState);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userId) {
      const localTodo = todo;
      localTodo.date = new Date().toISOString();
      dispatch(createNewTodo({ userId, todo }));
    }
    setTodo({
      title: "",
      description: "",
      status: TaskStatus.PENDING,
      date: "",
    });
    onClose();
  };

  return (
    <Box sx={style}>
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}
      >
        Create New To-Do
      </Typography>

      <TextField
        label="Title"
        fullWidth
        name="title"
        value={todo.title}
        onChange={handleChange}
        sx={{ mb: 2 }}
        error={!!errorState.title.length}
        helperText={errorState.title}
      />
      <TextField
        label="Description"
        fullWidth
        multiline
        rows={3}
        name="description"
        value={todo.description}
        onChange={handleChange}
        sx={{ mb: 2 }}
        error={!!errorState.desc.length}
        helperText={errorState.desc}
      />
      <TextField
        select
        label="Status"
        fullWidth
        name="status"
        value={todo.status}
        onChange={handleChange}
        sx={{ mb: 2 }}
      >
        <MenuItem value="PENDING">Open</MenuItem>
        <MenuItem value="IN_PROGRESS">Started</MenuItem>
        <MenuItem value="COMPLETED">Done</MenuItem>
      </TextField>

      {/* <Typography variant="h6" sx={{ mt: 2 }}>
        Tags
      </Typography> */}

      {/* <Button>+ Add Tag</Button> */}

      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        disabled={!(todo.description.length && todo.title.length)}
      >
        Create To-Do
      </Button>
    </Box>
  );
};

export default CreateTodo;
