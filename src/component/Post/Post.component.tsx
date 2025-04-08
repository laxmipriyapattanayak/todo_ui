import { Task, TaskStatus } from "../../myApi";
import dayjs from "dayjs";
import "./index.css";
import { convertStatusToLabel } from "../../helper";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const Post = ({
  task,
  openEditModal,
}: {
  task: Task;
  openEditModal: (task: Task) => void;
}) => {
  const openAndPopulateModal = () => {
    openEditModal(task);
  };

  return (
    <div className="post">
      <div className="post-title">
        <AssignmentIcon />
        <h2>{task.title}</h2>
        <IconButton onClick={openAndPopulateModal}>
          <EditIcon />
        </IconButton>
      </div>
      <p className="post-description">{task.description}</p>
      <div className="post-date">
        <CalendarMonthIcon />
        <p>{dayjs(task.date).format("D MMM YY")}</p>
      </div>
      <div className="post_action">
        <Chip
          label={convertStatusToLabel(task.status!)}
          variant="filled"
          sx={{
            backgroundColor:
              task.status === TaskStatus.COMPLETED
                ? "#c8e6c9"
                : task.status === TaskStatus.IN_PROGRESS
                  ? "#bbdefb"
                  : "#ffe0b2",
            color: "#000000",
          }}
        />
      </div>
    </div>
  );
};
