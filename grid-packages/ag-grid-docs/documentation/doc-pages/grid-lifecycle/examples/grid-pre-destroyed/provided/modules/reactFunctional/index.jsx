
'use strict';

import React, { useCallback, useMemo, useRef, useState, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])

const GridExample = () => {
    const containerStyle = useMemo(() => ({width: '100%', height: '100%'}), []);
    const [gridVisible, setGridVisible] = useState(true);
    const [columnsWidthOnPreDestroyed, setColumnsWidthOnPreDestroyed] = useState([]);
    const [gridApi, setGridApi] = useState();
    const [rowData, setRowData] = useState(getDataSet());
    const [columnDefs, setColumnDefs] = useState([
        {field: 'name', headerName: 'Athlete'},
        {field: 'medals.gold', headerName: 'Gold Medals'},
        {field: 'person.age', headerName: 'Age'},
    ]);
    const defaultColDef = useMemo(() => {
        return {
            editable: true,
            resizable: true,
        }
    }, []);

    const onGridReady = useCallback((params) => {
        setGridApi(params.api);
    }, []);

    const onGridPreDestroyed = useCallback((params) => {
        if (!gridApi) {
            return;
        }

        const allColumns = gridApi.getColumns();
        if (!allColumns) {
            return;
        }

        const currentColumnWidths = allColumns.map(column => ({
            field: column.getColDef().field || '-',
            width: column.getActualWidth(),
        }));

        setColumnsWidthOnPreDestroyed(currentColumnWidths);
        setGridApi(undefined);
    }, [gridApi])

    const updateColumnWidth = useCallback(() => {
        if (!gridApi) {
            return;
        }

        const columns = gridApi.getColumns();
        if (!columns) {
            return;
        }

        columns.forEach(column => {
            const newRandomWidth = Math.round((150 + Math.random() * 100) * 100) / 100;
            gridApi.setColumnWidth(column, newRandomWidth);
        });
    }, [gridApi])

    const destroyGrid = useCallback(() => {
        setGridVisible(false);
    }, [])

    const reloadGrid = useCallback(() => {
        const updatedColumnDefs = columnDefs.map(val => {
            const colDef = val;
            const result = {
                ...colDef,
            };

            if (colDef.field) {
                const width = columnsWidthOnPreDestroyed.find(columnWidth => columnWidth.field === colDef.field);
                result.width = width ? width.width : colDef.width;
            }

            return result;
        });

        setColumnsWidthOnPreDestroyed([]);
        setColumnDefs(updatedColumnDefs);
        setGridVisible(true);
    }, [columnsWidthOnPreDestroyed, columnDefs])

    return (
        <div style={containerStyle}>
            <div className="test-container">
                <div className="test-header">
                {gridVisible && (
                    <div id="exampleButtons" style={{"marginBottom": "1rem"}}>
                        <button onClick={() => updateColumnWidth()}>Change Columns Width</button>
                        <button onClick={() => destroyGrid()}>Destroy Grid</button>
                    </div>
                )}
                {Array.isArray(columnsWidthOnPreDestroyed) && columnsWidthOnPreDestroyed.length > 0 && (
                    <div id="gridPreDestroyedState">
                        State captured on grid pre-destroyed event:<br/>
                        <strong>Column fields and widths</strong>
                        <div className="values">
                            <ul>
                                {columnsWidthOnPreDestroyed.map((columnWidth, index) => (
                                    <li key={index}>{columnWidth.field} : {columnWidth.width}px</li>
                                ))}
                            </ul>
                        </div>
                        <button onClick={() => reloadGrid()}>Reload Grid</button>
                    </div>
                )}
                </div>
                <div style={{"height": "100%", "boxSizing": "border-box"}}>
                    <div
                        style={{
                            height: '100%',
                            width: '100%'
                        }}
                        className="ag-theme-alpine">
                        {gridVisible && (
                            <AgGridReact
                                columnDefs={columnDefs}
                                defaultColDef={defaultColDef}
                                rowData={rowData}
                                onGridReady={onGridReady}
                                onGridPreDestroyed={onGridPreDestroyed}
                            />
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<StrictMode><GridExample/></StrictMode>);
