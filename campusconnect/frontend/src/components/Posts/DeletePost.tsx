import {
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle,
  Fab,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Cookies from "js-cookie";

interface DeletePost {
  title: string;
  body: string;
  id: string;
  image?: string;
}

interface DeletePostProps {
  deletePostOpen: boolean;
  handleDeletePostClose: (event?: object, reason?: string) => void;
  handleClose: (reason: string) => void;
  // handleDeleteSubmit : (event: React.FormEvent<HTMLFormElement>) => void;
}

const DeletePost = (props: DeletePostProps) => {
  const { id } = useParams();
  const { deletePostOpen, handleDeletePostClose, handleClose } = props;

  return (
    <Dialog
      open={deletePostOpen}
      onClose={handleDeletePostClose}
      fullWidth
      maxWidth={"sm"}
      PaperProps={{
        sx: {
          border: "4px solid",
          borderColor: "back.dark",
          borderRadius: "20px",
        },
      }}
    >
      <DialogTitle
        sx={{
          background:
            "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
          color: "back.light",
          borderBottom: "4px #000 solid",
          borderRadius: "0",
        }}
      >
        <Container
          component="div"
          sx={{
            display: "flex",
            columnGap: 5,
            justifyContent: "space-between",
          }}
        >
          <Typography component="h2" variant="h2" fontFamily={"RampartOne"}>
            Delete Post
          </Typography>
        </Container>
      </DialogTitle>

      {/* <DialogContent> */}
      <Container
        component="div"
        sx={{
          height: "100%",
          py: 3,
          backgroundColor: "back.main",
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "center",
          alignContent: "center",
          border: "2px solid #000",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexFlow: "column nowrap",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Typography
            component="h3"
            variant="h3"
            color="primary"
            fontFamily={"Lobster"}
          >
            Are You Sure?
          </Typography>
          <Box sx={{ display: "flex", flexFlow: "column nowrap" }}>
            <Button
              onClick={() => handleClose("delete")}
              sx={{
                display: "flex",
                margin: 2,
                border: "2px solid",
                borderColor: "back.dark",
                borderRadius: "10px",
                backgroundColor: "back.light",
                "&:hover": { backgroundColor: "#0F0" },
              }}
            >
              <Typography fontFamily={"Lobster"}>Yes</Typography>
            </Button>
            <Button
              onClick={() => handleDeletePostClose()}
              sx={{
                display: "flex",
                margin: 2,
                border: "2px solid",
                borderColor: "back.dark",
                borderRadius: "10px",
                backgroundColor: "back.light",
                "&:hover": { backgroundColor: "#F00" },
              }}
            >
              {" "}
              <Typography fontFamily={"Lobster"}>No</Typography>
            </Button>
          </Box>
        </Box>
      </Container>
    </Dialog>
  );
};

export default DeletePost;
