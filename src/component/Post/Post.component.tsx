import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Chip, IconButton } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { convertStatusToLabel } from "../../helper";
import { Tag, Task, TaskStatus } from "../../myApi";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { deleteTodo, updateTodo } from "../../store/todo.slice";

import "./index.css";
import TagsMenu from "../Tag/TagsMenu.component";

export const Post = ({
  task,
  openEditModal,
}: {
  task: Task;
  openEditModal: (task: Task) => void;
}) => {
  const openAndPopulateModal = () => {
    openEditModal(task);
    //console.log("open and populatemodal", task);
  };
  const dispatch = useAppDispatch();
  const allTags = useAppSelector((state) => state.tagSlice.allTags.data);
  const { userId } = useParams();
  const [selectedTag, setSelectedTag] = useState<string[]>([]);

  useEffect(() => {
    const tagsMapping: string[] = [];
    task.tags.forEach((tag) => {
      allTags.forEach((t) => {
        if (t.id == tag.tagId) {
          tagsMapping.push(t.name);
        }
      });
    });
    setSelectedTag(tagsMapping);
  }, [task.tags]);

  const handleMenuItemClick = (tag: Tag | null) => {
    if (!tag || !userId) return;

    if (userId) {
      dispatch(
        updateTodo({
          userId,
          todo: {
            ...task,
            tags: [
              ...task.tags,
              {
                tagId: tag.id,
              },
            ],
          },
        })
      );
    }
  };

  const handledeletePost = () => {
    if (userId) dispatch(deleteTodo({ userId: userId, todo: task }));
  };

  return (
    <div className="post">
      <div className="post-title">
        <div className="title">
          <AssignmentIcon />
          <h2>{task.title}</h2>
        </div>

        <div className="actions">
          <TagsMenu handleMenuItemClick={handleMenuItemClick} />
          <IconButton onClick={openAndPopulateModal}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={handledeletePost}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      </div>

      <p className="post-description">{task.description}</p>

      <div className="post-date">
        <CalendarMonthIcon />
        <p>{dayjs(task.date).format("D MMM YY")}</p>
      </div>
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
      <div className="tags">
        {selectedTag.map((t) => (
          <Chip size="small" label={t} key={t} />
        ))}
      </div>
    </div>
  );
};
