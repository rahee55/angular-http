import { HttpInterceptorFn } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoggingInterceptorService {

//   constructor() { }
// }


export const LoggingInterceptorService: HttpInterceptorFn = (req, next) => {
  console.log('Logging interceptor');
  console.log('Request sent to URL: ' + req.url);
  return next (req)
}