import { GridApi, createGrid, ColGroupDef, GridOptions, GridReadyEvent } from '@ag-grid-community/core';

const columnDefs: ColGroupDef[] = [
  {
    headerName: 'Top Level Column Group',
    children: [
      {
        headerName: 'Group A',
        children: [
          { field: 'athlete', minWidth: 200 },
          { field: 'country', minWidth: 200 },
          { headerName: 'Group', valueGetter: 'data.country.charAt(0)' },
        ],
      },
      {
        headerName: 'Group B',
        children: [
          { field: 'sport', minWidth: 150 },
          { field: 'gold' },
          { field: 'silver' },
          { field: 'bronze' },
          { field: 'total' },
        ],
      },
    ],
  },
]

let gridApi: GridApi<IOlympicData>;

const gridOptions: GridOptions<IOlympicData> = {
  columnDefs: columnDefs,
  defaultColDef: {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  },

  onGridReady: (params: GridReadyEvent) => {
    (document.getElementById('columnGroups') as HTMLInputElement).checked = true
  },

  popupParent: document.body,
}

function getBoolean(id: string) {
  return !!(document.querySelector('#' + id) as HTMLInputElement).checked
}

function getParams() {
  return {
    skipColumnGroupHeaders: getBoolean('columnGroups'),
    skipColumnHeaders: getBoolean('skipHeader'),
  }
}

function onBtExport() {
  gridApi!.exportDataAsExcel(getParams())
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
  const gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  gridApi = createGrid(gridDiv, gridOptions);
  fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
    .then(response => response.json())
    .then(data =>
      gridApi!.setGridOption('rowData', data.filter((rec: any) => rec.country != null))
    )
})
