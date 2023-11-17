import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  cancelText: string;
  confirmText: string;
  onConfirm: () => void;
  confirmLoading: boolean;
};

const RevokeModal: React.FC<Props> = ({
  open,
  onClose,
  title,
  description,
  cancelText,
  confirmText,
  onConfirm,
  confirmLoading,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 2,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
          }}
        >
          <Button variant="contained" color="success" onClick={onClose}>
            {cancelText}
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{
              marginLeft: "10px",
            }}
            onClick={onConfirm}
          >
            {confirmLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              confirmText
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RevokeModal;
