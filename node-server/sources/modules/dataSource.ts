import { CallbackData } from "./callback";

export interface DataSource {
    init: (callback: (data: CallbackData) => void) => void;
    pop: (callback: (data: CallbackData) => void) => void; 
}