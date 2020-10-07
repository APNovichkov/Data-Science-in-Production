import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/";

const LoadDatasetCard = (props) => {
  let fileInput = React.createRef();
  //   let [datasetFile, updateDatasetFile] = useState(fileInput);

  const onChooseFileClick = (event) => {
    event.preventDefault();
    let datasetFile = fileInput.current.files[0];

    let formData = {
      filename: datasetFile.name,
      file: datasetFile,
    };

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    console.log("form data:", formData);

    axios
      .post(API_URL, formData, config)
      .then((res) => {
        console.log("Response from API:", res);
      })
      .catch((err) => {
        console.log(err);
      });

    alert(`Selected file - ${datasetFile.name}`);
  };

  const onChangeDatasetFile = (fileInput) => {
    if (fileInput.current) {
      console.log("Updating fileInput to:", fileInput.current.files[0].name);
      //   updateDatasetFile(fileInput.current.files[0]);
    }
  };

  return (
    <div className="home-page-card-wrapper">
      <div className="home-page-card text-center">
        <h4>Load Dataset</h4>
        <form onSubmit={onChooseFileClick} className="load-data-form-wrapper">
          <input type="file" ref={fileInput} />
          <button type="submit" className="choose-file-button">
            Load Dataset
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoadDatasetCard;
