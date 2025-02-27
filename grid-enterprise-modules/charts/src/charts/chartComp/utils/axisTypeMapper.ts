import { ChartType } from '@ag-grid-community/core';
import { AgCartesianAxisType } from 'ag-charts-enterprise';

export const ALL_AXIS_TYPES: AgCartesianAxisType[] = ['number', 'category', 'grouped-category', 'log', 'time'];

export function getLegacyAxisType(chartType: ChartType): [AgCartesianAxisType, AgCartesianAxisType] | undefined {
    switch (chartType) {
        case 'bar':
        case 'stackedBar':
        case 'normalizedBar':
            return ['number', 'category'];
        case 'groupedBar':
            return ['number', 'grouped-category'];
        case 'column':
        case 'stackedColumn':
        case 'normalizedColumn':
        case 'line':
        case 'area':
        case 'stackedArea':
        case 'normalizedArea':
        case 'histogram':
            return ['category', 'number'];
        case 'groupedColumn':
            return ['grouped-category', 'number'];
        case 'scatter':
        case 'bubble':
            return ['number', 'number'];
        default:
            return undefined;
    }
}
