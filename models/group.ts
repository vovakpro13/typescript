import {IDelegate} from "./delegate";

export interface IGroup {
    name: string;
    chairman: IDelegate;
    members: Array<IDelegate>;
    addDelegate: Function;
    deleteDelegate: Function;
    showBribeTakers: Function;
    showTheBiggerBribeTaker: Function;
    showAllMembers: Function;
}