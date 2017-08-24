import { Injectable } from '@angular/core';
import * as pouchDB from 'pouchdb';

@Injectable()
export class DBServices {
  private db : any;

  constructor() {
  }

  initDB(dbName : string) {
    this.db = new pouchDB(dbName);
    return 'Created'+this.db.adapter;
  }

  dbInfo() {
    return this.db.info();
  }

  addData(dbObject : Object) {
    return this.db.put(dbObject);
  }

  getAllData() {
    return this.db.allDocs(
      {
        include_docs : true
      }
    );
  }

  removeData(docId : string, revId : string) {
    return this.db.remove(docId, revId);
  }

  destroyDB() {
    return this.db.destroy();
  }

}
