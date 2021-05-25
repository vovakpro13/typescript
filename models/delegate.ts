import {EGender} from "../enums/gender";

export interface IDelegate {
    name: string;
    age: number;
    gender: EGender;
    honesty: number;
    minBribe?: number;
    giveBribe: Function;

}