import { GridApi, createGrid, GridOptions } from '@ag-grid-community/core';

interface IOlympicDataTypes extends IOlympicData {
  countryObject: {
    code: string;
  };
  sportObject: {
    name: string;
  };
}

let gridApi: GridApi<IOlympicDataTypes>;

const gridOptions: GridOptions<IOlympicDataTypes> = {
  columnDefs: [
    { field: 'athlete' },
    { field: 'countryObject', headerName: 'Country' },
    { field: 'sportObject', headerName: 'Sport' },
  ],
  defaultColDef: {
    filter: true,
    floatingFilter: true,
    sortable: true,
    resizable: true,
    editable: true,
  },
  dataTypeDefinitions: {
    country: {
      baseDataType: 'object',
      extendsDataType: 'object',
      valueParser: params => params.newValue == null || params.newValue === '' ? null : { code: params.newValue },
      valueFormatter: params => params.value == null ? '' : params.value.code,
      dataTypeMatcher: (value: any) => value && !!value.code,
    },
    sport: {
      baseDataType: 'object',
      extendsDataType: 'object',
      valueParser: params => params.newValue == null || params.newValue === '' ? null : { name: params.newValue },
      valueFormatter: params => params.value == null ? '' : params.value.name,
      dataTypeMatcher: (value: any) => value && !!value.name,
    },
  },
  enableFillHandle: true,
  enableRangeSelection: true,
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
  const gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  gridApi = createGrid(gridDiv, gridOptions);


  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then((data: IOlympicDataTypes[]) => gridApi!.setGridOption('rowData', data.map(rowData => {
      const dateParts = rowData.date.split('/');
      return {
        ...rowData,
        countryObject: {
          code: rowData.country,
        },
        sportObject: {
          name: rowData.sport,
        },
      };
    })))
})
