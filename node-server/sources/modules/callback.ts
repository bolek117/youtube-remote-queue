export class CallbackData {
    error: any;
    data: any;

    constructor(error: any, data: any) {
        this.error = error;
        this.data = data;
    }
}