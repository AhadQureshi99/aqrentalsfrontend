import { Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridLoader } from "react-spinners";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, userReset } from "../features/users/userSlice";
import toast from "react-hot-toast";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [formFields, setFormFields] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formFields;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userError, userMessage, userLoading, userSuccess, user } =
    useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (userError) {
      toast.error(userMessage);
    }
    if (userSuccess) {
      toast.success(`Greetings ${user?.username}`);

      navigate(`/home`);
    }

    return () => {
      dispatch(userReset());
    };
  }, [userError, userMessage, userSuccess, user?.username, dispatch, navigate]);

  const handleRegistration = (e) => {
    e.preventDefault();
    dispatch(registerUser({ email, username, password }));
  };

  return (
    <>
      <div className="container">
        <div className="row mt-3 align-items-center p-5 rounded-3 shadow ">
          <Typography
            style={{ fontFamily: "-moz-initial" }}
            className="text-center text-white"
            variant="h2"
          >
            AQ RENTALS
          </Typography>
          <Typography className="text-center text-white" variant="p">
            Welcome back!Please login to your account.
          </Typography>
          <div className="col-md-6 d-none d-md-block">
            <img
              className="object-fit-cover"
              width={"100%"}
              src="register.jpg"
              alt=""
            />
          </div>
          <div className="col-md-6">
            <form
              style={{
                background:
                  "linear-gradient(to right,rgb(41, 40, 40),rgb(255, 255, 255))",
              }}
              className=" mt-5 p-4 rounded-3 "
              onSubmit={handleRegistration}
            >
              <TextField
                fullWidth
                id="Username"
                name="username"
                label="Username"
                variant="outlined"
                value={username}
                onChange={handleChange}
                sx={{
                  my: 2,
                  "& label.Mui-focused": { color: "#8C57FF" },
                  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                    borderColor: "#8C57FF",
                  },
                }}
              />
              <TextField
                fullWidth
                id="Email"
                name="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={handleChange}
                sx={{
                  my: 2,
                  "& label.Mui-focused": { color: "#8C57FF" },
                  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                    borderColor: "#8C57FF",
                  },
                }}
              />
              <div style={{ position: "relative", width: "100%" }}>
                <TextField
                  fullWidth
                  id="Password"
                  name="password"
                  label="Password"
                  type={showPass ? "text" : "password"}
                  variant="outlined"
                  value={password}
                  onChange={handleChange}
                  sx={{
                    my: 2,
                    "& label.Mui-focused": { color: "#8C57FF" },
                    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                      borderColor: "#8C57FF",
                    },
                  }}
                />
                <IconButton
                  onClick={() => setShowPass(!showPass)}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                  }}
                >
                  {showPass ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </IconButton>
              </div>

              <Button
                type="submit"
                disabled={userLoading}
                sx={{
                  width: "100%",
                  my: 2,
                  bgcolor: userLoading ? "gray" : "#f9a826",
                  color: "white",
                }}
              >
                {userLoading ? <GridLoader size={8} color="white" /> : "Signup"}
              </Button>

              <p className="text-gray text-center my-2">
                Already have an account?{" "}
                <Link className="text-white text-decoration-none" to="/login">
                  Sign in instead
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
