import { Byte } from "@angular/compiler/src/util";

export class Batch {
  id: any;
  fileName: string;
  numberLogs?: number;
  fileAsBase64: string;

  constructor() {
    this.id = undefined;
    this.fileName = '';
    this.numberLogs = 0;
    this.fileAsBase64 = '';
  }
}