---
title: "Aligned Grids"
---

Aligning two or more grids means columns will be kept aligned in all grids. In other words, column changes to one grid (column width, column order, column visibility etc) are reflected in the other grid. This is useful if you have two grids, one above the other such that their columns are vertically aligned, and you want to keep the columns aligned.

## Configuration

Configure via the gridOptions property `alignedGrids`.

<api-documentation source='grid-options/properties.json' section='miscellaneous' names='["alignedGrids"]' ></api-documentation>

<framework-specific-section frameworks="react">

To link two grids provide `alignedGrids` with an array of corresponding grid refs.

<snippet language="jsx" transform={false}>
|const gridOne = useRef&lt;AgGridReact>(null);
|const gridTwo = useRef&lt;AgGridReact>(null);
|
|return (
|   &lt;>
|       &lt;AgGridReact ref={gridOne} alignedGrids={[gridTwo]} />
|       &lt;AgGridReact ref={gridTwo} alignedGrids={[gridOne]} />    
|   &lt;/>
|);
</snippet>
</framework-specific-section>


<framework-specific-section frameworks="javascript">

To link two grids provide `alignedGrids` with callbacks that return the corresponding grid apis.

<snippet transform={false}>
|gridOptionsFirst = {
|    alignedGrids: () => [secondApi]
|    ...
|};
|
|gridOptionsSecond = {
|    alignedGrids: () => [firstApi]
|    ...
|}
|firstApi = createGrid(gridDiv1, gridOptionsFirst);
|secondApi = createGrid(gridDiv2, gridOptionsSecond);
</snippet>
</framework-specific-section>

<framework-specific-section frameworks="angular">

Align grids in your component by providing the `alignedGrids` property with the other grids `GridApi`.

<snippet transform={false}>
|const firstApi: GridApi;
|
|gridOptionsSecond = {
|    alignedGrids: () => [this.firstApi],
|}
</snippet>

Align grids in your component by providing `alignedGrids` with a template reference to the other `AgGridAngular` component.

<snippet transform={false}>
|@ViewChild('firstGrid') firstGrid!: AgGridAngular;
|
|gridOptionsSecond = {
|    // Configure via callback as ViewChild only set after ngAfterViewInit
|    alignedGrids: () => [this.firstGrid],
|}
</snippet>

Alternatively it is possible to align grids via template variables in your component template.

<snippet transform={false}>
| // Link using template variables
|&lt;ag-grid-angular #firstGrid [alignedGrids]="[secondGrid]" ...>
|&lt;ag-grid-angular #secondGrid [alignedGrids]="[firstGrid]" ...>
|
</snippet>

</framework-specific-section>

<framework-specific-section frameworks="vue">

Align grids in your component by providing the `alignedGrids` property with the other grids `GridApi`.

<snippet transform={false}>
|gridOptionsSecond = {
|    alignedGrids: () => [this.firstApi],
|}
</snippet>

Align grids in your component by providing `alignedGrids` with a reference to the other `AgGridVue` component.

<snippet transform={false}>
|// Annotate with a template reference
|&lt;ag-grid-vue ref="firstGrid"
|
|gridOptionsSecond = {
|    // register first grid to receive events from the second
|    alignedGrids: () => [this.$refs.firstGrid],
|}
</snippet>


Alternatively it is possible to align grids via refs in your component template.

<snippet transform={false}>
| // Link using template variables
|&lt;ag-grid-vue 
|   ref="firstGrid" :alignedGrids="[this.$refs.secondGrid]" ...>
|&lt;ag-grid-vue 
|   ref="secondGrid" :alignedGrids="[this.$refs.firstGrid]" ...>
|
</snippet>

</framework-specific-section>

## Example: Aligned Grids

Below shows two grids, both aligned with the other (so any column change to one will be reflected in the other). The following should be noted:

- When either grid is scrolled horizontally, the other grid follows.
- Showing / hiding a column on either grid (via the checkbox) will show / hide the column on the other grid, despite the API been called on one grid only.
- When a column is resized on either grid, the other grid follows.
- When a column group is opened on either grid, the other grid follows.


<grid-example title='Aligned Grids' name='aligned-grids' type='mixed'></grid-example>

## Events

The events which are fired as part of the grid alignment relationship are as follows:

- Horizontal Scroll
- Column Hidden / Shown
- Column Moved
- Column Group Opened / Closed
- Column Resized
- Column Pinned

## Pivots

The pivot functionality does not work with aligned grids. This is because pivoting data changes the columns, which would make the aligned grids incompatible, as they are no longer sharing the same set of columns.

## Example: Aligned Grid as Footer

So why would you want to align grids like this? It's great for aligning grids that have different data but similar columns. Maybe you want to include a footer grid with 'summary' data. Maybe you have two sets of data, but one is aggregated differently to the other.

This example is a bit more useful. In the bottom grid, we show a summary row. Also note the following:

- The top grid has no horizontal scroll bar, suppressed via a grid option*.
- The bottom grid has no header, suppressed via a grid option.
- `autoSizeStrategy` is only passed to the top grid, the bottom grid receives the new column widths from the top grid.

<grid-example title='Aligned Grid as Footer' name='aligned-floating-footer' type='mixed'></grid-example>

## Example: Align Column Groups

It is possible that you have column groups that are split because of pinning or the order of the columns. The grid below has only two groups that are split, displayed as many split groups. The column aligning also works here in that a change to a split group will open / close all the instances of that group in both tables.

<grid-example title='Aligned Column Groups' name='aligned-column-groups' type='mixed'></grid-example>

## Event Propagation

When a grid fires an event, it will be processed to all registered aligned grids. However if a grid is processing such an event, it will not fire an event to other aligned grids. For example, consider the grids A, B and C where B is aligned to A and C is aligned to B (ie A -> B -> C). If A gets a column resized, it will fire the event to B, but B will not fire the event to C. If C is also dependent on A, it needs to be set up directly. This stops cyclic dependencies between grids causing infinite firing of events if two grids are aligned to each other.
