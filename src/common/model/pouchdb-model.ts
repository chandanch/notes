export interface PouchDBModel {
    doc : {
        _id : string,
        _rev : string,
        dbData : {
            date : string,
            notes : string,
            time : string,
        },
    }
}