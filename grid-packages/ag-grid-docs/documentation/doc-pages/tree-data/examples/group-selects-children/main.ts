import { GridApi, createGrid, GridOptions } from '@ag-grid-community/core';
import { getData } from "./data";

let gridApi: GridApi;

const gridOptions: GridOptions = {
  columnDefs: [
    // we're using the auto group column by default!
    { field: 'jobTitle' },
    { field: 'employmentType' },
  ],
  defaultColDef: {
    flex: 1,
  },
  autoGroupColumnDef: {
    headerName: 'Organisation Hierarchy',
    minWidth: 300,
    cellRendererParams: {
      suppressCount: true,
      checkbox: true,
    },
  },
  rowData: getData(),
  treeData: true, // enable Tree Data mode
  animateRows: true,
  groupDefaultExpanded: -1, // expand all groups by default
  rowSelection: 'multiple',
  groupSelectsChildren: true,
  suppressRowClickSelection: true,
  getDataPath: (data: any) => {
    return data.orgHierarchy
  },
}

// wait for the document to be loaded, otherwise
// AG Grid will not find the div in the document.
document.addEventListener('DOMContentLoaded', function () {
  // lookup the container we want the Grid to use
  var eGridDiv = document.querySelector<HTMLElement>('#myGrid')!

  // create the grid passing in the div to use together with the columns & data we want to use
  gridApi = createGrid(eGridDiv, gridOptions);
})
