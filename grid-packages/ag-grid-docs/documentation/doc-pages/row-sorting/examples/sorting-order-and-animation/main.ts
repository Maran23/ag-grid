import { GridApi, createGrid, ColDef, GridOptions } from '@ag-grid-community/core';

const columnDefs: ColDef[] = [
  { field: 'athlete', sortingOrder: ['asc', 'desc'] },
  { field: 'age', width: 90, sortingOrder: ['desc', 'asc'] },
  { field: 'country', sortingOrder: ['desc', null] },
  { field: 'year', width: 90, sortingOrder: ['asc'] },
  { field: 'date' },
  { field: 'sport' },
  { field: 'gold' },
  { field: 'silver' },
  { field: 'bronze' },
  { field: 'total' },
]

let gridApi: GridApi<IOlympicData>;

const gridOptions: GridOptions<IOlympicData> = {
  defaultColDef: {
    width: 170,
    sortable: true,
  },
  columnDefs: columnDefs,
  rowData: null,
  animateRows: true,
  sortingOrder: ['desc', 'asc', null],
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  gridApi = createGrid(gridDiv, gridOptions);

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then((data: IOlympicData[]) => gridApi!.setGridOption('rowData', data))
})
