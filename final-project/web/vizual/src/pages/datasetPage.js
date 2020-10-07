import Axios from "axios";
import React, { useState, useEffect } from "react";
import axios from "axios";

//import components
import Graph from "./../components/graph";

const API_URL = "http://127.0.0.1:5000/";

const columnColors = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];

const DatasetPage = (props) => {
  let datasetName = "titanic.csv";

  let [columns, updateColumns] = useState([]);
  let [toGenerateGraph, updateToGenerateGraph] = useState(false);

  let [graphData, updateGraphData] = useState({});
  let [graphOptions, updateGraphOptions] = useState({});
  let [graphType, updateGraphType] = useState("");

  let [graphTypeSelectedOption, updateGraphTypeSelectedOption] = useState("countBar");

  let [checkedColumns, updateCheckedColumns] = useState({});
  let [checkedColumn, updateCheckedColumn] = useState("");

  let [currentFile, updateCurrentFile] = useState("");

  useEffect(() => {
    //Send request for columns

    const fetchData = () => {
      axios.get(`${API_URL}/dataset/columns`).then((res) => {
        updateColumns(res.data.columns);
      });
    };

    fetchData();
  }, []);

  const onClickGenerateGraph = (event) => {
    console.log("generate button clicked");

    // get values of column checks
    console.log("Graph type: " + graphTypeSelectedOption);

    if (graphTypeSelectedOption == "countBar") {
      updateGraphType("Bar");
      axios.get(`${API_URL}/dataset/generate/data/counts/bar?column=${checkedColumn}`).then((res) => {
        let graphData = res.data.graphData;
        let minBound = res.data.minBound;
        let maxBound = res.data.maxBound;
        updateCurrentFile(res.data.filename);
        console.log("Graph Data from API:", graphData);
        updateGraphData(graphData);

        updateGraphOptions({
          high: maxBound,
          low: minBound,
          height: 400,
          axisX: {
            labelInterpolationFnc: function (value, index) {
              return index % 1 === 0 ? value : null;
            },
          },
        });
        updateToGenerateGraph(true);
      });
    } else if (graphTypeSelectedOption == "countPie") {
      console.log("Graphing Pie");
      updateGraphType("Pie");
      axios.get(`${API_URL}/dataset/generate/data/counts/pie?column=${checkedColumn}`).then((res) => {
        // let graphData = res.data.graphData;
        // let minBound = res.data.minBound;
        // let maxBound = res.data.maxBound;
        // console.log("Graph Data from API:", graphData);

        console.log("Graphing Pie 2");

        let data = {
          series: res.data.graphData.series,
        };

        // var data = {
        //   series: [
        //     {
        //       value: 3,
        //     },
        //     {
        //       value: 3,
        //     },
        //     {
        //       value: 4,
        //     },
        //   ],
        // };

        updateGraphData(data);

        updateGraphOptions({
          height: 400,
        });

        updateToGenerateGraph(true);
      });
    }
  };

  //   useEffect(() => {}, [graphData]);

  return (
    <div className="dataset-page-wrapper">
      <div className="text-center dataset-page-header">
        <h3>
          <span className="light-text">Viewing</span> - {datasetName}
        </h3>
      </div>
      <div className="dataset-page-card-wrapper">
        <div className="dataset-page-card">
          <div className="row">
            <div className="col-md-2">
              {/* THIS IS FOR COLUMNS */}

              <div className="columns-header">
                <h6>Columns</h6>
              </div>

              <div className="columns-wrapper ">
                {columns.map((col, index) => {
                  return (
                    <div class="form-check">
                      <input
                        class="form-check-input position-static"
                        type="checkbox"
                        id={col}
                        value={col}
                        onChange={(event) => updateCheckedColumn(event.target.value)}
                      />
                      <span style={{ color: columnColors[index] }} className="column-text">
                        {col}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-md-10">
              {/* THIS IS FOR TYPES OF GRAPHS AND GRAPH ITSELF */}
              <form>
                <div className="row graph-type-wrapper">
                  {/* THIS IS FOR TYPES OF GRAPHS */}
                  <div className="col-md-3">
                    <h6 className="types-of-graphs-header">Choose Graph Type:</h6>
                  </div>

                  <div className="col-md-2">
                    <div className="graph-type-item-wrapper radio">
                      <label className="radio-input">
                        <input
                          className="radio-input-circle"
                          type="radio"
                          value="countBar"
                          checked={graphTypeSelectedOption === "countBar"}
                          onChange={(event) => updateGraphTypeSelectedOption(event.target.value)}
                        />
                        Count Bar
                      </label>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="graph-type-item-wrapper radio">
                      <label className="radio-input">
                        <input
                          className="radio-input-circle"
                          type="radio"
                          value="countPie"
                          checked={graphTypeSelectedOption === "countPie"}
                          onChange={(event) => updateGraphTypeSelectedOption(event.target.value)}
                        />
                        Count Pie
                      </label>
                    </div>
                  </div>
                </div>
              </form>
              <div className="row">
                <div className="col-md-12">
                  {/* THIS IS FOR GRAPH */}
                  <div className="graph-wrapper">
                    {/* <div class="ct-graph"></div> */}
                    {toGenerateGraph ? (
                      <Graph
                        className="graph"
                        graphData={graphData}
                        graphOptions={graphOptions}
                        graphType={graphType}
                      ></Graph>
                    ) : (
                      <div className="no-graph-wrapper text-center">
                        <h5 className="no-graph-text">Generate Graph!</h5>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="generate-graph-button-wrapper">
              <button className="generate-graph-button" onClick={onClickGenerateGraph}>
                Generate Graph
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetPage;
