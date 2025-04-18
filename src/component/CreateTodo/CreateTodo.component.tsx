import { useState } from "react";
import { useParams } from "react-router-dom";
import { createNewTodo, updateTodo } from "../../store/todo.slice";
import { useAppDispatch } from "../../store/hook";
import { Task, TaskStatus } from "../../myApi";
import dayjs from "dayjs";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

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
const today = dayjs();

const CreateTodo = ({ onClose, data }: { onClose: () => void; data: Task }) => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();

  const [errorState, setErrorState] = useState({
    title: "",
    desc: "",
  });
  const [todo, setTodo] = useState<Task>({
    ...data,
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

  const handleSubmit = () => {
    if (userId) {
      if (todo.taskId) {
        dispatch(updateTodo({ userId, todo }));
      } else {
        const localTodo = todo;
        // localTodo.date = new Date().toISOString();
        dispatch(createNewTodo({ userId, todo: localTodo }));
      }
    }
    setTodo({
      title: "",
      description: "",
      status: TaskStatus.PENDING,
      date: "",
      tags: [],
    });
    onClose();
  };

  return (
    <Box sx={style}>
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}
      >
        {todo?.taskId ? "Update To-do" : "Create To-do"}
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Select date"
          disablePast
          value={todo.date ? today : null} // Convert string to Dayjs
          onChange={(newDate) => {
            if (newDate) {
              const formatted = newDate.format("YYYY-MM-DD");
              setTodo((prev) => ({ ...prev, date: formatted }));
              console.log("Selected date:", formatted);
            }
          }}
          sx={{ width: "100%" }}
        />
      </LocalizationProvider>
      {/* <Typography variant="h6" sx={{ mt: 2 }}>
        Tags
      </Typography>
      <Button>+ Add Tag</Button> */}

      <Button
        onClick={() => handleSubmit()}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        disabled={!(todo.description?.length && todo.title.length)}
      >
        {todo?.taskId ? "Update To-do" : "Create To-do"}
      </Button>
    </Box>
  );
};

export default CreateTodo;
