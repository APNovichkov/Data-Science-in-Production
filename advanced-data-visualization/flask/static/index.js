chart = Chartist.Line("graph", {});

// Colors for lines
colors = ["#056674", "#d54062", "#f4a8e"];

const getData = () => {};

const updateGraph = () => {
  let minYear = document.getElementById("min-year").value;
  let maxYear = document.getElementById("max-year").value;

  let isDiet = document.getElementById("diet").checked;
  let isGym = document.getElementById("gym").checked;
  let isFinance = document.getElementById("finance").checked;

  console.log(`minYear: ${minYear} maxYear: ${maxYear} isDiet: ${isDiet} isGym: ${isGym} isFinance: ${isFinance}`);
};
