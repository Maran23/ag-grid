<?php
$pageTitle = "Charts - Line Series";
$pageDescription = "ag-Grid is a feature-rich data grid that can also chart data out of the box. Learn how to chart data directly from inside ag-Grid.";
$pageKeyboards = "Javascript Grid Charting";
$pageGroup = "feature";
include '../documentation-main/documentation_header.php';
?>

<h1 class="heading-enterprise">Standalone Charts - Line Series</h1>

<p class="lead">
    This section covers the most common series type - Line series.
</p>

<h2>Introduction</h2>

<p>
    Line series is a great choice in many situations. It's the series of choice when you need to spot a trend,
    render large amounts of data or create a real-time chart.
</p>

<p>
    Since this series type is so common, the chart factory (<code>AgChart.create</code> method) uses it
    as the default type, so it doesn't have to be specified explicitly.
</p>

<p>
    The simplest line series config therefore only requires two properties: <code>xKey</code> and <code>yKey</code>.
</p>

<snippet language="ts">
series: [{
    // type: 'line' <-- assumed
    xKey: 'quarter',
    yKey: 'spending'
}]
</snippet>

<p>
    The chart expects the data (<code>chart.data</code> property) to be an array of objects, where each object
    is a table row or a database record and each key is a column. To plot anything on a plane, we need at least
    two coordinates: <code>x</code> and <code>y</code>. The <code>xKey</code> and <code>yKey</code> line series
    configs tell the series what keys should be used to fetch the values from each object in the <code>data</code>
    array. For example, for a data like this:
</p>

<snippet language="ts">
[{
    quarter: 'Q1',
    spending: 200
}, {
    quarter: 'Q2',
    spending: 300
}]
</snippet>

<p>
    the line series will fetch <code>(Q1, 200)</code> and <code>(Q2, 300)</code>
    for the first and second data points and plot them:
</p>

<p>
    <img alt="Line Series X/Y" src="line-series-x-y.png" style="margin-bottom: 0px; height: 200px; max-width: 70%">
</p>

<h2>Visibility</h2>

<p>
    A legend is shown by default. To hide it, use the <code>enabled</code> config:
</p>

<p>
    <img alt="Legend Enabled" src="legend-enabled.gif" style="margin-bottom: 0px; max-width: 70%">
</p>

<snippet language="ts">
legend: {
    enabled: false
}
</snippet>

<h2>Layout</h2>

<p>
    Whenever the size of a chart changes, the legend layout is triggered.
    If the legend is vertical (positioned to the <code>right</code> or <code>left</code> of a chart),
    the layout algorithm tries to use the minimum number of columns possible to render all legend items
    using current constraints. Notice how the number of columns in a legend increases as the height of
    a chart shrinks:
</p>

<p>
    <img alt="Legend Vertical Layout Size" src="layout-vertical-size.gif" style="margin-bottom: 0px; height: 250px; max-width: 100%">
</p>

<p>
    If the legend is horizontal (positioned to the <code>bottom</code> or <code>top</code> of a chart),
    the layout algorithm tries to use the minimum possible number of rows. If a chart is not wide enough,
    the legend will keep subdividing its items into rows until everything fits:
</p>

<p>
    <img alt="Legend Horizontal Layout Size" src="layout-horizontal-size.gif" style="margin-bottom: 0px; width: 100%">
</p>

<h2>Constraints</h2>

<p>
    A few things other than the width and height of a chart can affect legend's layout and that is the amout of spacing
    between and within the legend items. For example, <code>layoutHorizontalSpacing</code> controls the amount
    of spacing between adjacent horizontal legend items:
</p>

<p>
    <img alt="Legend Horizontal Spacing Size" src="layout-horizontal-spacing.gif" style="margin-bottom: 0px; width: 300px; max-width: 100%">
</p>

<snippet language="ts">
legend: {
    layoutHorizontalSpacing: 16
}
</snippet>

<p>
    <code>layoutVerticalSpacing</code> controls the amount of spacing between adjacent vertical legend items.
    Notice how in this case the increased vertical spacing even forces the legend to use another column to fit
    all of its items:
</p>

<p>
    <img alt="Legend Vertical Spacing Size" src="layout-vertical-spacing.gif" style="margin-bottom: 0px; height: 250px; max-width: 100%">
</p>

<snippet language="ts">
legend: {
    layoutVerticalSpacing: 8
}
</snippet>

<p>
    And the <code>itemSpacing</code> config is responsible for the amount of spacing within a legend item, between the marker
    and the label:
</p>

<p>
    <img alt="Legend Item Spacing Size" src="layout-item-spacing.gif" style="margin-bottom: 0px; width: 300px; max-width: 100%">
</p>

<snippet language="ts">
legend: {
    itemSpacing: 8
}
</snippet>

<h2>Fonts</h2>

<p>
    There are a number of configs that affect the <code>fontSize</code>, <code>fontStyle</code>,
    <code>fontWeight</code>, <code>fontFamily</code>, and <code>color</code> of the legend item labels:
</p>

<p>
    <img alt="Legend Font Configs" src="legend-font-configs.gif" style="margin-bottom: 0px; width: 300px; max-width: 100%">
</p>

<snippet language="ts">
legend: {
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontFamily: 'Papyrus',
    color: 'red'
}
</snippet>

<h2>Markers</h2>

<h4>Marker Size and Stroke</h4>

<p>
    All legend items use the same size and stroke width, regardless of the size and stroke width
    used by the series they represent. It's possible to adjust the default size and stroke width
    using the following configs:
</p>

<p>
    <img alt="Legend Marker Size and Stroke" src="legend-marker-size-stroke.gif" style="margin-bottom: 0px; max-width: 100%">
</p>

<snippet language="ts">
legend: {
    markerSize: 20,
    strokeWidth: 3
}
</snippet>

<h4>Marker Shape</h4>

<p>
    Normally, the legend mirrors the marker shapes used by the series, unless the series
    in question doesn't support markers (for example, <code>column</code> series), in
    which case the legend will use the <code>square</code> marker shape for that series.
</p>

<p>
    It's also possible to override the default behavior and make the legend use
    the specified marker shape for all legend items, regardless of the shapes the series
    are using.
</p>

<p>
    <img alt="Legend Marker Shape" src="legend-marker-shape.gif" style="margin-bottom: 0px; max-width: 100%">
</p>

<snippet language="ts">
legend: {
    markerShape: 'circle' // 'square', 'diamond', 'cross', 'plus', 'triangle'
}
</snippet>

<?php include '../documentation-main/documentation_footer.php'; ?>
