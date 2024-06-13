import {ItemDetailsDto} from "./itemDetails.dto.ts";

export class OrderDto{

    private _date:string;
    private _totalQty:number;
    private _totalAmount:number;
    private _customerId:string;
    private _orderDetails:ItemDetailsDto[];



    constructor(date: string, totalQty: number, totalAmount: number, customerId: string, orderDetails: ItemDetailsDto[]) {
        this._date = date;
        this._totalQty = totalQty;
        this._totalAmount = totalAmount;
        this._customerId = customerId;
        this._orderDetails = orderDetails;
    }


    get date(): string {
        return this._date;
    }

    set date(value: string) {
        this._date = value;
    }

    get totalQty(): number {
        return this._totalQty;
    }

    set totalQty(value: number) {
        this._totalQty = value;
    }

    get totalAmount(): number {
        return this._totalAmount;
    }

    set totalAmount(value: number) {
        this._totalAmount = value;
    }

    get customerId(): string {
        return this._customerId;
    }

    set customerId(value: string) {
        this._customerId = value;
    }

    get orderDetails(): ItemDetailsDto[] {
        return this._orderDetails;
    }

    set orderDetails(value: ItemDetailsDto[]) {
        this._orderDetails = value;
    }

    toJSON(){
        return {
            date:this.date,
            totalQty:this.totalQty,
            totalAmount:this.totalAmount,
            customerId:this.customerId,
            orderDetails:this.orderDetails
        }
    }
}