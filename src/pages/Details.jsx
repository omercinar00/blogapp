import React from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DeleteBlog} from "../helpers/functions";
import { AuthContext } from '../context/AuthContext';

const Details = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams;
  const { state } = useLocation();
  const handleDelete = () => {
    DeleteBlog(state.id);
    navigate(-1);
  };
  const handleEdit = () => {
    navigate("/updateblog", { state: state });
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "3rem",
        marginTop: "3rem",
        marginBottom: "2rem",
      }}
    >
      <Card
        sx={{
          maxWidth: 1200,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      >
        <CardMedia
          component="img"
          alt="photo"
          image={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRvURrxVdCQ-qh_VmG80K7iMWpsKzuUOrVBA&usqp=CAU" ||
            state.photoUrl
          }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {state.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {state.content}
          </Typography>
        </CardContent>
        <CardActions>
          {currentUser.email === state.email && (
            <>
              <Button onClick={handleEdit} variant="contained">
                Edit
              </Button>
              <Button onClick={handleDelete} color="error" variant="contained">
                Delete
              </Button>
            </>
          )}
        </CardActions>
      </Card>
    </Container>
  );
};

export default Details