import {
  ChartModel,
  ChartRef,
  createGrid,
  FirstDataRenderedEvent,
  GridApi,
  GridOptions,
  GridReadyEvent
} from '@ag-grid-community/core';
import {getData} from "./data";

let gridApi: GridApi;
let chartModel: ChartModel | undefined;
let currentChartRef: ChartRef | undefined;

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'country', chartDataType: 'category' },
    { field: 'sugar', chartDataType: 'series' },
    { field: 'fat', chartDataType: 'series' },
    { field: 'weight', chartDataType: 'series' },
  ],
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },
  enableRangeSelection: true,
  popupParent: document.body,
  enableCharts: true,
  onGridReady : (params: GridReadyEvent) => {
    getData().then(rowData => params.api.setGridOption('rowData', rowData));
  },
  onFirstDataRendered,
  createChartContainer,
};



function onFirstDataRendered(params: FirstDataRenderedEvent) {
  currentChartRef = params.api.createRangeChart({
    chartContainer: document.querySelector('#myChart') as any,
    cellRange: {
      columns: ['country', 'sugar', 'fat', 'weight'],
      rowStartIndex: 0,
      rowEndIndex: 2
    },
    chartType: 'groupedColumn',
  });
}

function createChartContainer(chartRef: ChartRef) {
  if (currentChartRef) {
    currentChartRef.destroyChart();
  }

  const eChart = chartRef.chartElement;
  const eParent = document.querySelector<HTMLElement>('#myChart')!;
  eParent.appendChild(eChart);
  currentChartRef = chartRef;
}

function saveChart() {
  const chartModels = gridApi!.getChartModels() || []
  if (chartModels.length > 0) {
    chartModel = chartModels[0]
  }
}

function clearChart() {
  if (currentChartRef) {
    currentChartRef.destroyChart()
    currentChartRef = undefined
  }
}

function restoreChart() {
  if (!chartModel) return
  currentChartRef = gridApi!.restoreChart(chartModel)!
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  const gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  gridApi = createGrid(gridDiv, gridOptions);
})
