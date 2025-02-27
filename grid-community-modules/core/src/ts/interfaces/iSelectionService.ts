import { RowNode } from "../entities/rowNode";
import { SelectionEventSourceType } from "../events";
import { ChangedPath } from "../utils/changedPath";
import { ServerSideRowGroupSelectionState, ServerSideRowSelectionState } from "./selectionState";

export interface ISelectionService {
    getSelectionState(): string[] | ServerSideRowSelectionState | ServerSideRowGroupSelectionState | null;
    setSelectionState(state: string[] | ServerSideRowSelectionState | ServerSideRowGroupSelectionState, source: SelectionEventSourceType): void;
    getSelectedNodes(): RowNode<any>[];
    getSelectedRows(): any[];
    getSelectionCount(): number;
    setNodesSelected(params: ISetNodesSelectedParams): number;
    filterFromSelection(predicate: (node: RowNode) => boolean): void;
    updateGroupsFromChildrenSelections(source: SelectionEventSourceType, changedPath?: ChangedPath): boolean;
    syncInRowNode(rowNode: RowNode, oldNode: RowNode | null): void;
    reset(source: SelectionEventSourceType): void;
    getBestCostNodeSelection(): RowNode[] | undefined;
    isEmpty(): boolean;
    /**
     * @param justFiltered whether to just include nodes which have passed the filter
     * @param justCurrentPage whether to just include nodes on the current page
     * @returns all nodes including unselectable nodes which are the target of this selection attempt
     */
    getSelectAllState(justFiltered?: boolean, justCurrentPage?: boolean): boolean | null;
    selectAllRowNodes(params: {
        source: SelectionEventSourceType;
        justFiltered?: boolean;
        justCurrentPage?: boolean;
    }): void;
    deselectAllRowNodes(params: {
        source: SelectionEventSourceType;
        justFiltered?: boolean;
        justCurrentPage?: boolean;
    }): void;
}

interface INodeSelectionParams {
    // true or false, whatever you want to set selection to
    newValue: boolean;
    // whether to remove other selections after this selection is done
    clearSelection?: boolean;
    // true when action is NOT on this node, ie user clicked a group and this is the child of a group
    suppressFinishActions?: boolean;
    // gets used when user shift-selects a range
    rangeSelect?: boolean;
    // used in group selection, if true, filtered out children will not be selected
    groupSelectsFiltered?: boolean;
    // event source, if from an event
    source: SelectionEventSourceType;
    // event
    event?: Event;
}

export interface ISetNodesSelectedParams extends INodeSelectionParams {
    // node to change selection of
    nodes: RowNode[];
}