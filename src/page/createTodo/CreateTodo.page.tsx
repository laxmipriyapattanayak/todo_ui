import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { createNewTodo } from "../../store/createTodo.slice";
import { useAppDispatch } from "../../store/hook";

const CreateTodo = () => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  console.log(userId);
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    status: "pending",
    date: "",
    time: "",
    //tags: [{ taskId: 0, tagId: 0 }],
  });

  const handleChange = (e: any) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
    console.log(todo);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("todo created");
    console.log(todo);

    if (userId) {
      dispatch(createNewTodo({ userId, todo }));
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        p: 3,
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Create New To-Do
      </Typography>

      <TextField
        label="Title"
        fullWidth
        name="title"
        value={todo.title}
        onChange={handleChange}
        sx={{ mb: 2 }}
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
        <MenuItem value="PENDING">PENDING</MenuItem>
        <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
        <MenuItem value="COMPLETED">COMPLETED</MenuItem>
      </TextField>
      <TextField
        label="Date"
        type="date"
        fullWidth
        name="date"
        value={todo.date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Time"
        type="time"
        fullWidth
        name="time"
        value={todo.time}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />

      <Typography variant="h6" sx={{ mt: 2 }}>
        Tags
      </Typography>
      {/* {todo.tags.map((tag, index) => (
        <Box
          key={index}
          sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}
        >
          {/* <TextField
            label="Task ID"
            type="number"
            value={tag.taskId}
            // onChange={(e) =>
            //   handleTagChange(index, "taskId", Number(e.target.value))
            // }
            sx={{ flex: 1 }}
          /> */}
      {/* <TextField
            label="Tag ID"
            type="number"
            value={tag.tagId}
            // onChange={(e) =>
            //   handleTagChange(index, "tagId", Number(e.target.value))
            // }
            sx={{ flex: 1 }}
          /> 
        </Box>
      ))} */}
      <Button /*onClick={addTag} sx={{ mt: 1 }}*/>+ Add Tag</Button>

      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
      >
        Create To-Do
      </Button>
    </Box>
  );
};

export default CreateTodo;
