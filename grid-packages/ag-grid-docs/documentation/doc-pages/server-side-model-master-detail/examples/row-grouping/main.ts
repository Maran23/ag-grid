import {
  GridApi,
  createGrid,
  GridOptions,
  IDetailCellRendererParams,
  IServerSideDatasource,
} from '@ag-grid-community/core';
declare var FakeServer: any;
let gridApi: GridApi;
const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'country', rowGroup: true, hide: true },
    { field: 'accountId', hide: true },
    { field: 'name' },
    { field: 'calls' },
    { field: 'totalDuration' },
  ],
  defaultColDef: {
    flex: 1,
  },
  autoGroupColumnDef: {
    field: 'accountId',
  },
  animateRows: true,

  // use the server-side row model
  rowModelType: 'serverSide',

  // enable master detail
  masterDetail: true,

  detailCellRendererParams: {
    detailGridOptions: {
      columnDefs: [
        { field: 'callId' },
        { field: 'direction' },
        { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
        { field: 'switchCode' },
        { field: 'number' },
      ],
      defaultColDef: {
        flex: 1,
      },
    },
    getDetailRowData: (params) => {
      // supply details records to detail cell renderer (i.e. detail grid)
      params.successCallback(params.data.callRecords)
    },
  } as IDetailCellRendererParams<IAccount, ICallRecord>,
  onGridReady: (params) => {
    setTimeout(() => {
      // expand some master row
      var someRow = params.api.getRowNode('1')
      if (someRow) {
        someRow.setExpanded(true)
      }
    }, 1000)
  },
}

function getServerSideDatasource(server: any): IServerSideDatasource {
  return {
    getRows: (params) => {
      console.log('[Datasource] - rows requested by grid: ', params.request)

      var response = server.getData(params.request)

      // adding delay to simulate real server call
      setTimeout(() => {
        if (response.success) {
          // call the success callback
          params.success({ rowData: response.rows, rowCount: response.lastRow })
        } else {
          // inform the grid request failed
          params.fail()
        }
      }, 200)
    },
  }
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  gridApi = createGrid(gridDiv, gridOptions);

  fetch('https://www.ag-grid.com/example-assets/call-data.json')
    .then(response => response.json())
    .then(function (data) {
      // setup the fake server with entire dataset
      var fakeServer = new FakeServer(data)

      // create datasource with a reference to the fake server
      var datasource = getServerSideDatasource(fakeServer)

      // register the datasource with the grid
      gridApi!.setGridOption('serverSideDatasource', datasource)
    })
})
