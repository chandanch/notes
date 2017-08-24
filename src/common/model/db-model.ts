export interface DBModel {
    _id : string;
    dbData : {
        title : string,
        notes : string,
        date : string,
        time : string
    };
    _rev ? : string
}