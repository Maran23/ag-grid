<framework-specific-section frameworks="angular">
<snippet transform={false}>
|const KEY_LEFT = 'ArrowLeft';
|const KEY_UP = 'ArrowUp';
|const KEY_RIGHT = 'ArrowRight';
|const KEY_DOWN = 'ArrowDown';
|const KEY_PAGE_UP = 'PageUp';
|const KEY_PAGE_DOWN = 'PageDown';
|const KEY_PAGE_HOME = 'Home';
|const KEY_PAGE_END = 'End';
|
|@Component({
|    selector: 'my-editor',
|    template: `&lt;input (keydown)="onKeyDown($event)" ...rest of input/>`
|})
|export class MyCellEditor implements ICellEditorAngularComp {
|    /* Component Editor Lifecycle method */
|    agInit(params: ICellEditorParams) {
|        this.params = params;
|    }
|
|    onKeyDown(event) {
|       const key = event.key;
|
|        const isNavigationKey = key === KEY_LEFT ||
|           key === KEY_RIGHT ||
|           key === KEY_UP ||
|           key === KEY_DOWN ||
|           key === KEY_PAGE_DOWN ||
|           key === KEY_PAGE_UP ||
|           key === KEY_PAGE_HOME ||
|           key === KEY_PAGE_END;
|
|           if (isNavigationKey) {
|               // this stops the grid from receiving the event and executing keyboard navigation
|               event.stopPropagation();
|           }
|    }
|   
|    ..rest of the component
|})
</snippet>
</framework-specific-section>