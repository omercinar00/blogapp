import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import * as yup from "yup";
import { signIn, signUpWithGoogle } from "../helpers/firebase";
import { useState } from "react";
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Please  enter an email"),
  password: yup
    .string()
    .required("Please enter a password ")
    // .min(8, "Password must have min 8 chars")
    // .max(16, "Password must have max 16 chars")
    // .matches(/\d+/, "Password must have a number")
    // .matches(/[a-z]+/, "Password must have a lowercase")
    // .matches(/[A-Z]+/, "Password must have an uppercase")
    // .matches(/[!,?{}><%&$#£+-.]+/, " Password must have a special char"),
});
const Login = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  // const { currentUser, error, loading } = useSelector((state) => state?.auth);
  const handleChangeUser = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const handleGoogle = () => {
    signUpWithGoogle(navigate);
  };
   const handleSubmit = () => {
     signIn(user?.email,user?.password,navigate);
   };

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        // direction="row-reverse"
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        {/* <Grid item xs={12} mb={3}>
          <Typography variant="h3" color="primary" align="center">
            STOCK APP
          </Typography>
        </Grid> */}
        <Grid
          justifyContent="center"
          alignItems="-moz-initial"
          item
          xs={12}
          sm={10}
          md={6}
        >
          <Avatar
            sx={{
              backgroundColor: "black",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography variant="h4" align="center" mb={4} color="black">
            Login
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              //!login(values)
              actions.resetForm();
              actions.setSubmitting(false);
            }}
          >
            {({
              values,
              isSubmitting,
              handleChange,
              handleBlur,
              touched,
              errors,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    variant="outlined"
                    value={user?.email}
                    onChange={handleChangeUser}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    label="Password"
                    name="password"
                    id="password"
                    type="password"
                    variant="outlined"
                    value={user?.password}
                    onChange={handleChangeUser}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <LoadingButton
                    type="submit"
                    // loading={loading}
                    loadingPosition="center"
                    variant="contained"
                  >
                    Submit
                  </LoadingButton>
                  <LoadingButton
                    sx={{ backgroundColor: "black" }}
                    loadingPosition="center"
                    variant="contained"
                    onClick={handleGoogle}
                  >
                    Login With Google
                    <svg
                      style={{ marginLeft: "1rem" }}
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M3.064 7.51A9.996 9.996 0 0 1 12 2c2.695 0 4.959.99 6.69 2.605l-2.867 2.868C14.786 6.482 13.468 5.977 12 5.977c-2.605 0-4.81 1.76-5.595 4.123c-.2.6-.314 1.24-.314 1.9c0 .66.114 1.3.314 1.9c.786 2.364 2.99 4.123 5.595 4.123c1.345 0 2.49-.355 3.386-.955a4.6 4.6 0 0 0 1.996-3.018H12v-3.868h9.418c.118.654.182 1.336.182 2.045c0 3.046-1.09 5.61-2.982 7.35C16.964 21.105 14.7 22 12 22A9.996 9.996 0 0 1 2 12c0-1.614.386-3.14 1.064-4.49z"
                      />
                    </svg>
                  </LoadingButton>
                </Box>
              </Form>
            )}
          </Formik>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/register">Do you have not an account?</Link>
          </Box>
        </Grid>
        {/* <Grid item xs={10} sm={7} md={6}>
        </Grid> */}
      </Grid>
    </Container>
  );
};
export default Login;
