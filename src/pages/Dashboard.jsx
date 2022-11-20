import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Container } from "@mui/system";
import { GetBlog } from "../helpers/functions";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { postList } = GetBlog();
  const navigate = useNavigate();
  console.log('postlist', postList)

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
      {postList &&
        postList.map((post) => {
          return (
            <Card
              onClick={() => navigate(`details/${post.id}`, { state: post })}
              sx={{ maxWidth: "345px" }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    src={post?.userphotoUrl}
                    sx={{ bgcolor: red[500] }}
                    aria-label="recipe"
                  ></Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={post.displayName}
              />
              <CardMedia
                component="img"
                height="194"
                image={
                  post.photoUrl ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRvURrxVdCQ-qh_VmG80K7iMWpsKzuUOrVBA&usqp=CAU"
                }
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {post.title}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>
          );
        })}
    </Container>
  );
};

export default Dashboard;
