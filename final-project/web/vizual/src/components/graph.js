import React from "react";
import ChartistGraph from "react-chartist";

const Graph = (props) => {
  //   const chart = new Chartist.Line(".ct-graph", {});
  let { graphData, graphOptions, graphType } = props;

  console.log(`Generating graph with data: ${graphData}, graphOptions: ${graphOptions} and graphType: ${graphType}`);
  console.log(`Graph data`);

  // Example
  //   var data = ;

  //   var options = ;

  return <ChartistGraph data={graphData} options={graphOptions} type={graphType} />;
};

export default Graph;
