import React, { useState } from "react";

import "./App.css";

function App() {
  const [fileInputState, setFileInputState] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const handleUploadImage = () => {
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
  };

  const uploadImage = async (base64Image) => {
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64Image }),
        // body: JSON.stringify({ data: "hel" }),
        headers: { "Content-Type": "application/json" },
      });
      console.log("res", res);
      setFileInputState("");
      setPreviewImage("");
      console.log("calling backend api");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <input
        id="fileInput"
        type="file"
        name="image"
        onChange={handleFileInputChange}
        value={fileInputState}
      />
      <button type="submit" onClick={handleUploadImage}>
        Submit
      </button>
      {previewImage && (
        <img src={previewImage} alt="choosen" style={{ height: "200px" }} />
      )}
    </div>
  );
}

export default App;
