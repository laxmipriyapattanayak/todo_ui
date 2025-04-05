import { TaskStatus } from "./myApi";

export const convertStatusToLabel = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.COMPLETED:
      return "Done";
    case TaskStatus.IN_PROGRESS:
      return "Started";
    case TaskStatus.PENDING:
      return "open";
  }
};
