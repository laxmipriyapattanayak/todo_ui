// src/component/NotificationPopover/NotificationPopover.tsx

import React from "react";
import { Popover } from "@mui/material";
import "./index.css";

interface NotificationPopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  notifications: { title: string; date: string }[];
}

export const NotificationPopover: React.FC<NotificationPopoverProps> = ({
  anchorEl,
  onClose,
  notifications,
}) => {
  const open = Boolean(anchorEl);
  const id = open ? "notification-popover" : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <div className="notification-container">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index} className="notification-item">
              <div className="notification-title">{notification.title}</div>
              <div className="notification-date">{notification.date}</div>
            </div>
          ))
        ) : (
          <div className="no-notification">No notifications</div>
        )}
      </div>
    </Popover>
  );
};
