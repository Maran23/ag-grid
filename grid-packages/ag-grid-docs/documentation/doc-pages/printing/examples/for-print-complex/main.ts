import { ColDef, FirstDataRenderedEvent, createGrid, GridApi, GridOptions } from '@ag-grid-community/core';
import { getData } from "./data";

let gridApi: GridApi;
const columnDefs: ColDef[] = [
  { field: 'group', rowGroup: true, hide: true },
  { field: 'id', pinned: 'left', width: 70 },
  { field: 'model', width: 180 },
  { field: 'color', width: 100 },
  {
    field: 'price',
    valueFormatter: "'$' + value.toLocaleString()",
    width: 100,
  },
  { field: 'year', width: 100 },
  { field: 'country', width: 120 },
]

const gridOptions: GridOptions = {
  defaultColDef: {
    sortable: true,
  },
  columnDefs: columnDefs,
  rowData: getData(),
  animateRows: true,
  groupDisplayType: 'groupRows',
  onFirstDataRendered: onFirstDataRendered,
}

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  params.api.expandAll()
}

function onBtPrint() {
  setPrinterFriendly(gridApi)

  setTimeout(() => {
    print()
    setNormal(gridApi)
  }, 2000)
}

function setPrinterFriendly(api: GridApi) {
  const eGridDiv = document.querySelector<HTMLElement>('#myGrid')! as any;
  eGridDiv.style.width = ''
  eGridDiv.style.height = ''
  api.setGridOption('domLayout', 'print')
}

function setNormal(api: GridApi) {
  const eGridDiv = document.querySelector<HTMLElement>('#myGrid')! as any;
  eGridDiv.style.width = '700px'
  eGridDiv.style.height = '200px'

  api.setGridOption('domLayout', undefined)
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
  const gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  gridApi = createGrid(gridDiv, gridOptions)
})
