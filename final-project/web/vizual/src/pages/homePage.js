import React from "react";

// import components
import LoadDatasetCard from "./../components/loadDatasetCard";

const HomePage = (props) => {
  const onChooseFileClick = (event) => {
    event.preventDefault();

    console.log("File is clicked");
  };

  return (
    <div className="home-page-wrapper">
      <div className="row">
        <div className="col-md-4 home-page-col-wrapper">
          <LoadDatasetCard></LoadDatasetCard>
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default HomePage;
