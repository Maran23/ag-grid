import { GridApi, createGrid, GridOptions } from '@ag-grid-community/core';

let gridApi: GridApi<IOlympicData>;

const gridOptions: GridOptions<IOlympicData> = {
  columnDefs: [
    {
      headerName: 'Participant',
      children: [{ field: 'athlete' }, { field: 'age' }],
    },
    {
      headerName: 'Details',
      children: [
        { field: 'country' },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
      ],
    },
  ],
  defaultColDef: {
    flex: 1,
    resizable: true,
  },
  columnHoverHighlight: true,
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  gridApi = createGrid(gridDiv, gridOptions);

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then((data: IOlympicData[]) => gridApi!.setGridOption('rowData', data))
})
