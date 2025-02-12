import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { tap } from 'rxjs';



// export class AuthInterceptorService implements HttpInterceptor{
//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     console.log('Auth Interceptor Called!');
//     return next.handle(req);
//   }
// }

export const AuthInterceptorService:HttpInterceptorFn = (req , next)=> {
  // console.log('Auth Interceptor Called!');
  const modifiedReq = req.clone({headers: req.headers.append('auth', 'serve')})
  return next (modifiedReq).pipe(tap((event) => {
    if(event.type === HttpEventType.Response){
      console.log('Responce has arrived. Responce data: ');
      console.log(event.body);
    }
  }))
    
}

