import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { EditBlog } from '../helpers/functions';

const UpdateBlog = () => {
 const navigate = useNavigate();
 const { state } = useLocation();
 const [editPost, setEditPost] = useState(state);
 const handleChange = (e) => {
   const name = e.target.name;
   const value = e.target.value;
   setEditPost({ ...editPost, [name]: value });
 };
 const handleEdit = () => {
   EditBlog(editPost);
   navigate("/");
 };
  return (
    <Box
      onSubmit={handleEdit}
      autoComplete="off"
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: { xs: "500px", lg: "650px" },
        height: "624px",
        boxShadow: 12,
        borderRadius: "20px",
        margin: "auto",
        alignItems: "center",
        marginTop: "1rem ",
        marginBottom: "1rem ",
      }}
    >
      <img
        width="250px"
        src="https://img.freepik.com/free-vector/add-files-concept-illustration_114360-341.jpg?w=740&t=st=1668774252~exp=1668774852~hmac=5bc77556396d41bb1ca82647cb8dc512c1ed81633eef2c808c35de2e42e679b8"
        alt="resim"
      />
      <TextField
        id="outlined-basic"
        label="New Post Title"
        variant="outlined"
        margin="normal"
        name="title"
        required
        value={editPost.title}
        onChange={handleChange}
        sx={{ width: "400px" }}
      />
      <TextField
        id="outlined-basic"
        label="Image URL"
        variant="outlined"
        margin="normal"
        name="photoUrl"
        onChange={handleChange}
        value={editPost.photoUrl}
        sx={{ width: "400px" }}
      />
      <TextField
        required
        id="outlined-multiline-static"
        label="Content"
        name="content"
        onChange={handleChange}
        value={editPost.content}
        multiline
        rows={5}
        // value={}
        sx={{ width: "400px" }}
      />
      <Button
        component="button"
        type="submit"
        sx={{ width: "400px", margin: "1rem" }}
        variant="contained"
      >
        Submit
      </Button>
    </Box>
  );
}

export default UpdateBlog


