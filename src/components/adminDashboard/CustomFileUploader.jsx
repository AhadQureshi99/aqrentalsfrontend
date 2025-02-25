import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Typography,
  Button,
  Grid,
  Stack,
  IconButton,
  CircularProgress,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import axios from "axios";

// Cloudinary details
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dcuicx8lo/image/upload";
const UPLOAD_PRESET = "carrental";

const CustomFileUploader = ({ formFields, setFormFields }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Handle file drop
  const onDrop = useCallback(async (acceptedFiles) => {
    setUploading(true);

    const uploadPromises = acceptedFiles.map(async (file) => {
      const previewUrl = URL.createObjectURL(file);

      // Prepare form data for Cloudinary upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      try {
        const response = await axios.post(CLOUDINARY_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Cloudinary Response:", response.data);

        return {
          file,
          preview: previewUrl,
          name: file.name,
          size: (file.size / 1024).toFixed(2) + " KB",
          cloudinaryUrl: response.data.secure_url,
        };
      } catch (error) {
        console.error(
          "Upload failed:",
          error.response ? error.response.data : error.message
        );
        toast.error(`Failed to upload ${file.name}`);
        return null;
      }
    });

    const results = await Promise.all(uploadPromises);
    const successfulUploads = results.filter(Boolean);

    setFormFields((prevValues) => ({
      ...prevValues,
      car_images: successfulUploads,
    }));

    setUploadedFiles((prev) => [...prev, ...successfulUploads]);
    setUploading(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [uploadedFiles]);

  // Remove all uploaded files
  const handleRemoveAll = () => {
    uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    setUploadedFiles([]);
    toast.success("All files removed!");
  };

  // Remove a specific file
  const handleRemoveFile = (index) => {
    const updatedFiles = [...uploadedFiles];
    URL.revokeObjectURL(updatedFiles[index].preview);
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
    toast.success("File removed!");
  };

  // Submit files
  const handleSubmit = () => {
    if (uploadedFiles.length === 0) {
      toast.error("No files to submit!");
      return;
    }

    // Extract Cloudinary URLs
    const uploadedUrls = uploadedFiles.map((file) => file.cloudinaryUrl);

    if (uploadedUrls.length === 0) {
      toast.error("No files have been successfully uploaded to Cloudinary.");
      return;
    }

    console.log("Submitted files:", uploadedUrls);
    toast.success("Files submitted successfully!");
  };

  return (
    <Box
      sx={{
        border: "2px dashed #f9a826",
        borderRadius: "8px",
        p: 4,
        textAlign: "center",
        backgroundColor: "#F9FAFB",
      }}
    >
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <UploadFileIcon sx={{ fontSize: 48, color: "#f9a826" }} />
        <Typography variant="body1" sx={{ mt: 2 }}>
          {isDragActive
            ? "Drop your files here..."
            : "Drag and drop or click to upload"}
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#f9a826",
            color: "white",
            ":hover": { backgroundColor: "#7245D1" },
          }}
        >
          Browse Files
        </Button>
      </div>

      {uploading && (
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}

      <Grid container spacing={2} sx={{ mt: 4 }}>
        {uploadedFiles.map((file, index) => (
          <Grid item xs={12} key={index}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #ddd",
                borderRadius: "8px",
                p: 2,
                backgroundColor: "white",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <img
                  src={file.cloudinaryUrl || file.preview}
                  alt={`Preview ${index}`}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {file.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {file.size}
                  </Typography>
                </Box>
              </Box>
              <IconButton color="error" onClick={() => handleRemoveFile(index)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 4, justifyContent: "center" }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#f9a826",
            color: "white",
            ":hover": { backgroundColor: "#7245D1" },
          }}
          onClick={handleSubmit}
          disabled={uploadedFiles.length === 0}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleRemoveAll}
          disabled={uploadedFiles.length === 0}
        >
          Remove All
        </Button>
      </Stack>
    </Box>
  );
};

export default CustomFileUploader;
