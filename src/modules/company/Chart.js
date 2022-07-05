import { 
  refactorHistoricalArray,
  generateConfig,
  generateDataObj
} from "../../utils/chartUtils.js";
const { Chart } = window;

export default class HistoryChart {

  static generateParentContainer() {
    const section = document.createElement("section");
    section.classList.add("section", "history-chart");
    return section;
  }

  static generateDates(history, limit) {
    return refactorHistoricalArray(history, "date", limit);
  }

  static generateValues(history, limit) {
    return refactorHistoricalArray(history, "high", limit);
  }

  static generateCanvas(parentContainer) {
    const canvas = document.createElement("canvas");
    canvas.id = "company-history-chart";
    parentContainer.appendChild(canvas);
    return canvas;
  }

  static generateChart(labels,values,canvas) {
    const data = generateDataObj(labels,values,"high");
    const config = generateConfig("line", data);
    console.log(config);
    return new Chart(canvas, config);
  }
  
  constructor(history, limit) {
    this.parentContainer = HistoryChart.generateParentContainer();
    this.canvas = HistoryChart.generateCanvas(this.parentContainer);
    this.dates = HistoryChart.generateDates(history, limit);
    this.values = HistoryChart.generateValues(history,limit);
    this.chart = HistoryChart.generateChart(this.dates, this.values,this.canvas);
  }

  init() {
    document.body.appendChild(this.parentContainer);
  }
}

