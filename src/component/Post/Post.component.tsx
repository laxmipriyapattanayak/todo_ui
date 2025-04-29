// import { Task, TaskStatus } from "../../myApi";
// import dayjs from "dayjs";
// import "./index.css";
// import { useAppDispatch, useAppSelector } from "../../store/hook";
// import { convertStatusToLabel } from "../../helper";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import { Button, Chip, IconButton, Menu, MenuItem } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { deleteTodo } from "../../store/todo.slice";
// import { useParams } from "react-router-dom";
// import { tags } from "../../store/tag.slice";
// import { useState } from "react";

// export const Post = ({
//   task,
//   openEditModal,
// }: {
//   task: Task;
//   openEditModal: (task: Task) => void;
// }) => {
//   const openAndPopulateModal = () => {
//     openEditModal(task);
//   };
//   const dispatch = useAppDispatch();
//   const { userId } = useParams();
//   const allTags = useAppSelector((state) => state.tagSlice.allTags);

//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

//   // Handle Menu Open
//   const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//     if (userId) {
//       dispatch(tags(userId)); // Dispatch to fetch tags when button is clicked
//     }
//   };

//   // Handle Menu Close
//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//   };

//   const handledeletePost = () => {
//     console.log(task);
//     if (userId) dispatch(deleteTodo({ userId: userId, todo: task }));
//   };
//   // const handleShowTags = () => {
//   //   if (userId) {
//   //     dispatch(tags(userId));
//   //   } else {
//   //     console.error("userId is undefined. Cannot fetch tags.");
//   //   }
//   // };

//   //   return (
//   //     <div className="post">
//   //       <div className="post-title">
//   //         <AssignmentIcon />
//   //         <h2>{task.title}</h2>
//   //         <IconButton onClick={openAndPopulateModal}>
//   //           <EditIcon />
//   //         </IconButton>
//   //         <IconButton onClick={handledeletePost}>
//   //           <DeleteIcon />
//   //         </IconButton>
//   //         <Button onClick={handleShowTags}>Tags</Button>
//   //       </div>
//   //       <p className="post-description">{task.description}</p>
//   //       <div className="post-date">
//   //         <CalendarMonthIcon />
//   //         <p>{dayjs(task.date).format("D MMM YY")}</p>
//   //       </div>

//   //       <div className="post_action">
//   //         <Chip
//   //           label={convertStatusToLabel(task.status!)}
//   //           variant="filled"
//   //           sx={{
//   //             backgroundColor:
//   //               task.status === TaskStatus.COMPLETED
//   //                 ? "#c8e6c9"
//   //                 : task.status === TaskStatus.IN_PROGRESS
//   //                   ? "#bbdefb"
//   //                   : "#ffe0b2",
//   //             color: "#000000",
//   //           }}
//   //         />
//   //       </div>
//   //     </div>
//   //   );
//   // };
//   return (
//     <div className="post">
//       <div className="post-title">
//         <AssignmentIcon />
//         <h2>{task.title}</h2>
//         <IconButton onClick={openAndPopulateModal}>
//           <EditIcon />
//         </IconButton>
//         <IconButton onClick={handledeletePost}>
//           <DeleteIcon />
//         </IconButton>

//         {/* Button to open the Menu */}
//         <Button onClick={handleMenuClick}>Tags</Button>

//         {/* Material UI Menu to display tags */}
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleCloseMenu}
//         >
//           {/* Check if tags are loaded and render them */}
//           {status === "fulfilled" && allTags?.length > 0 ? (
//             allTags.map((tag: { id: number; name: string }) => (
//               <MenuItem key={tag.id} onClick={handleCloseMenu}>
//                 {tag.name}
//               </MenuItem>
//             ))
//           ) : (
//             <MenuItem disabled>No Tags Available</MenuItem>
//           )}
//         </Menu>
//       </div>
//       <p className="post-description">{task.description}</p>
//       <div className="post-date">
//         <CalendarMonthIcon />
//         <p>{dayjs(task.date).format("D MMM YY")}</p>
//       </div>

//       <div className="post_action">
//         <Chip
//           label={convertStatusToLabel(task.status!)}
//           variant="filled"
//           sx={{
//             backgroundColor:
//               task.status === TaskStatus.COMPLETED
//                 ? "#c8e6c9"
//                 : task.status === TaskStatus.IN_PROGRESS
//                   ? "#bbdefb"
//                   : "#ffe0b2",
//             color: "#000000",
//           }}
//         />
//       </div>
//     </div>
//   );
// };
import { Task, TaskStatus } from "../../myApi";
import dayjs from "dayjs";
import "./index.css";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { convertStatusToLabel } from "../../helper";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Button, Chip, IconButton, Menu, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTodo } from "../../store/todo.slice";
import { useParams } from "react-router-dom";
import { tags } from "../../store/tag.slice";
import { useState } from "react";

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
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const allTags = useAppSelector((state) => state.tagSlice.allTags.data);

  const [tagMenu, setTagMenu] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setTagMenu(event.currentTarget);
    if (userId) {
      dispatch(tags(userId));
    }
  };

  const handleCloseMenu = () => {
    setTagMenu(null);
  };

  const handledeletePost = () => {
    console.log(task);
    if (userId) dispatch(deleteTodo({ userId: userId, todo: task }));
  };

  return (
    <div className="post">
      <div className="post-title">
        <AssignmentIcon />
        <h2>{task.title}</h2>
        <IconButton onClick={openAndPopulateModal}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handledeletePost}>
          <DeleteIcon />
        </IconButton>

        {/* Button to open the Menu */}
        <Button onClick={handleMenuClick}>Tags</Button>

        {/* Material UI Menu to display tags */}
        <Menu
          anchorEl={tagMenu}
          open={Boolean(tagMenu)}
          onClose={handleCloseMenu}
        >
          {/* Check if tags are loaded and render them */}
          {allTags?.length > 0 ? (
            allTags.map((tag: { id: number; name: string }) => (
              <MenuItem key={tag.id} onClick={handleCloseMenu}>
                {tag.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No Tags Available</MenuItem>
          )}
        </Menu>
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
