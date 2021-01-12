export interface Log{
  id: any;
  ip: string;
  date: Date;
  method: string;
  url: string;
  httpVersion: string;
  httpStatus: string;
  length: string;
  referer: string;
  userAgent: string;
}