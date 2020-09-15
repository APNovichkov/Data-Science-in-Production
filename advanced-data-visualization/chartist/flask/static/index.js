const chart = new Chartist.Line(".ct-graph", {});

// Colors for lines
let colors = ["#056674", "#d54062", "#6f4a8e"];
let lineClasses = ["ct-series-a", "ct-series-b", "ct-series-c"];
let years = [
  "2004",
  "2005",
  "2006",
  "2007",
  "2008",
  "2009",
  "2010",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
];

const createChart = (years, isDiet, isGym, isFinance) => {
  let queryString = assembleQueryString(years, isGym, isDiet, isFinance);
  axios
    .get(`/getdata${queryString}`)
    .then((res) => {
      // Define the data
      let data = JSON.parse(res.data);
      console.log("data object:");
      console.log(data);

      let labels = Object.values(data.month);
      let series = [];

      if (isDiet) {
        series.push(Object.values(data.diet));
      } else {
        series.push([]);
      }
      if (isGym) {
        series.push(Object.values(data.gym));
      } else {
        series.push([]);
      }
      if (isFinance) {
        series.push(Object.values(data.finance));
      } else {
        series.push([]);
      }

      // Assemble graph
      let graphData = {
        labels: labels.map((datetime) => {
          let date = new Date(datetime);
          return `${date.getFullYear()}-${date.getMonth()}`;
        }),
        series: series,
      };

      // Update Chart
      chart.update(graphData);

      // Update Chart colors
      updateColors();
    })
    .catch((err) => {
      console.error(err);
    });
};

const updateColors = () => {
  for (let i = 0; i < lineClasses.length; i++) {
    let lineElement = document.getElementsByClassName(lineClasses[i])[0];

    if (lineElement) {
      console.log(`Line element: ${lineClasses[i]} is defined!`);
      // Set style of line
      document.querySelector(`.${lineClasses[i]} .ct-line`).style.stroke = colors[i];

      // Set style of points
      document.querySelectorAll(`.${lineClasses[i]} .ct-point`).forEach((point) => {
        point.style.stroke = colors[i];
      });
    }
  }
};

const assembleQueryString = (years, isGym, isDiet, isFinance) => {
  let query = "?";
  years.forEach((year) => {
    query += `years=${year}&`;
  });
  if (isGym) {
    query += "columns=gym&";
  }
  if (isDiet) {
    query += "columns=diet&";
  }
  if (isFinance) {
    query += "columns=finance&";
  }

  console.log(`Assembled query: ${query}`);

  return query;
};

const getYears = (minYear, maxYear) => {
  let output = [];
  let toStartAdding = false;
  console.log(`minYear: ${minYear}`);
  console.log(`maxYear: ${maxYear}`);
  years.forEach((year) => {
    console.log(`Looking at year: ${year}`);
    if (toStartAdding) {
      output.push(year);
    }
    if (year.localeCompare(maxYear) == 0) {
      toStartAdding = false;
    }
    if (year.localeCompare(minYear) == 0) {
      toStartAdding = true;
    }
  });

  console.log(`Found years: ${output}`);
  return output;
};

const updateGraph = () => {
  let minYear = document.getElementById("min-year").value;
  let maxYear = document.getElementById("max-year").value;

  let isDiet = document.getElementById("diet").checked;
  let isGym = document.getElementById("gym").checked;
  let isFinance = document.getElementById("finance").checked;

  console.log(`minYear: ${minYear} maxYear: ${maxYear} isDiet: ${isDiet} isGym: ${isGym} isFinance: ${isFinance}`);

  createChart(getYears(minYear, maxYear), isDiet, isGym, isFinance);
};
