import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AddBlog } from "../helpers/functions";
const NewBlog = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  console.log('currentuser', currentUser)

  // console.log(currentUser)

  const [newblogInput, setNewblogInput] = useState({
    title: "",
    photoUrl: "",
    content: "",
    email: currentUser?.email,
    displayName: currentUser?.displayName,
    userphotoUrl:currentUser?.photoURL
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setNewblogInput({ ...newblogInput, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    AddBlog(newblogInput);
    navigate("/")
  };

  return (
    <Box
    onSubmit={handleSubmit}
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
        value={newblogInput.title}
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
        value={newblogInput.photoUrl}
        sx={{ width: "400px" }}
      />
      <TextField
      required
        id="outlined-multiline-static"
        label="Content"
        name="content"
        onChange={handleChange}
        value={newblogInput.content}
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
};
export default NewBlog;
