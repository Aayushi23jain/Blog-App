import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from "../config";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const BlogDetail = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ title: "", description: "" });
  const { id } = useParams();

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`${config.BASE_URL}/api/blogs/${id}`);
        console.log("Fetch Details Response:", res);
        const data = res.data;
        if (data?.blog) {
          setInputs({
            title: data.blog.title,
            description: data.blog.description,
          });
        }
      } catch (err) {
        console.error("Error fetching blog details:", err);
      }
    };

    fetchDetails();
  }, [id]); // id as dependency

 const sendRequest = async () => {
  try {
    const res = await axios.put(`${config.BASE_URL}/api/blogs/update/${id}`, {
      title: inputs.title,
      description: inputs.description,
    });

    if (res && res.data) {
      console.log("Update Response:", res);
      return res.data;
    } else {
      console.warn("No response data found");
      return null;
    }
  } catch (err) {
    console.error("Error updating blog:", err);
    return null;
  }
};

  const handleSubmit = (e) => {
  e.preventDefault();
  sendRequest().then((data) => {
    if (data) navigate("/myBlogs/");
    else alert("Failed to update blog. Please try again.");
  });
};


  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="primary.main"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin="auto"
            marginTop={3}
            display="flex"
            flexDirection="column"
            width="80%"
          >
            <Typography
              fontWeight="bold"
              padding={3}
              color="grey"
              variant="h2"
              textAlign="center"
            >
              Update Blog
            </Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              name="title"
              onChange={handleChange}
              value={inputs.title}
              margin="auto"
              variant="outlined"
              required
            />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField
              name="description"
              onChange={handleChange}
              value={inputs.description}
              margin="auto"
              variant="outlined"
              required
            />
            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              color="warning"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetail;
