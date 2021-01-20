import { Byte } from "@angular/compiler/src/util";

export interface Batch {
  id: any;
  fileName: string;
  contentType: string;
  length?: number;
  bytes: string;
}