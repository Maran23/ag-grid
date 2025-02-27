import { GridApi, createGrid, GridOptions } from '@ag-grid-community/core';
import {MedalRenderer} from './medalRendererComponent_typescript';

let gridApi: GridApi<IOlympicData>;

const gridOptions: GridOptions<IOlympicData> = {
    columnDefs: [
        {
            headerName: 'Component By Name',
            field: 'country',
            cellRenderer: 'medalRenderer',
        },
        {
            headerName: 'Component By Direct Reference',
            field: 'country',
            cellRenderer: MedalRenderer,
        },
    ],
    defaultColDef: {
        flex: 1,
        minWidth: 100,
        resizable: true,
    },
    components: {
        medalRenderer: MedalRenderer
    }
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
    gridApi = createGrid(gridDiv, gridOptions);

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then(response => response.json())
        .then((data: IOlympicData[]) => gridApi!.setGridOption('rowData', data))
})
