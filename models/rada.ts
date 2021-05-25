import {IGroup} from "./group";

export interface IRada{
    groups: Array<IGroup>;
    addGroup: Function;
    deleteGroup: Function;
    showAllGroups: Function;
    showGroup: Function;
    showTheTotalBiggerBribeTaker: Function;
}