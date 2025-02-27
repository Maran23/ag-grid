import {createGrid, FirstDataRenderedEvent, GridApi, GridOptions, GridReadyEvent,} from '@ag-grid-community/core';
import {getData} from "./data";

let gridApi: GridApi;

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'country', width: 150, chartDataType: 'category' },
    { field: 'group', chartDataType: 'category' },
    { field: 'gold', chartDataType: 'series' },
    { field: 'silver', chartDataType: 'series' },
    { field: 'bronze', chartDataType: 'series' },
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
  enableCharts: true,
  chartToolPanelsDef: { panels: []},
  popupParent: document.body,
  onGridReady : (params: GridReadyEvent) => {
    getData().then(rowData => params.api.setGridOption('rowData', rowData));
  },
  onFirstDataRendered,
  getChartToolbarItems:  () => [],
}



function onFirstDataRendered(event: FirstDataRenderedEvent) {
  createGroupedBarChart(event, '#chart1', ['country', 'gold', 'silver']);
  createPieChart(event, '#chart2', ['group', 'gold']);
  createPieChart(event, '#chart3', ['group', 'silver']);
}

function createGroupedBarChart(params: FirstDataRenderedEvent, selector: string, columns: string[]) {
  params.api.createRangeChart({
    chartContainer: document.querySelector(selector) as HTMLElement,
    cellRange: {
      rowStartIndex: 0,
      rowEndIndex: 4,
      columns,
    },
    suppressChartRanges: true,
    chartType: 'groupedBar',
  });
}

function createPieChart(params: FirstDataRenderedEvent, selector: string, columns: string[]) {
  params.api.createRangeChart({
    chartContainer: document.querySelector(selector) as HTMLElement,
    cellRange: {columns},
    suppressChartRanges: true,
    chartType: 'pie',
    aggFunc: 'sum',
    chartThemeOverrides: {
      common: {
        padding: {
          top: 20,
          left: 10,
          bottom: 30,
          right: 10,
        },
        legend: {
          position: 'right',
        },
      },
    },
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
  gridApi = createGrid(gridDiv, gridOptions);
});