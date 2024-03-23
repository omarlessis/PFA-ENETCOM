import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth-service.service';
// import { UserService } from 'src/app/services/user.service';
@Injectable()
export class PdfInterceptor implements HttpInterceptor {
  private url: string = environment.url;
  activeRequests = 0;
  skipUrls = [];
  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  
        console.log('Token:', this.authService.getToken());
 const token =request.clone({
  headers: request.headers.set("Authorization",   this.authService.getToken()),
});
      return next.handle(token);
    // return next.handle(request);
  
}

}
// ------------------------------------------------------------------------------------------
// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { finalize } from 'rxjs/operators';
// import { environment } from 'src/environments/environment';
// import { AuthService } from 'src/app/services/auth-service.service';
// // import { AuthService } from '../services/auth-service.service';


// @Injectable()
// export class PdfInterceptor implements HttpInterceptor {
//   private url: string = environment.url;
//   activeRequests = 0;
//   skipUrls = [];

//   constructor(private authService: AuthService) {}

//   intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     console.log('Request headers:', req.headers);

//     if (this.checkLoadingScreen(req)) {
//       if (this.activeRequests === 0) {
//         return new Observable((observer: any) => {
//           console.log('Token:', this.authService.getToken());
//           const subscription = next.handle(this.addAuthToken(req)).subscribe({
//             next: (event: any) => {
//               next.handle(req).subscribe(observer);
//             },
//             error: (err: any) => {
//               observer.error(err);
//             },
//             complete: () => {
//               observer.complete();
//             }
//           });
//           return () => {
//             subscription.unsubscribe();
//           };
//         });
//       }
//       this.activeRequests++;
//       return next.handle(req).pipe(
//         finalize(() => {
//           this.activeRequests--;
//         })
//       );
//     } else {
//       return next.handle(req);
//     }
//   }

//   addAuthToken(request: HttpRequest<any>): HttpRequest<any> {
//     const token = this.authService.getToken();
//     if (!token) {
//       return request;
//     }
//     // If you are calling an outside domain then do not add the token.
//     if (!request.url.match(this.url)) {
//       return request;
//     } else {
//       return request.clone({
//         headers: request.headers.set("Authorization", "Bearer " + token),
//       });
//     }
//   }

//   checkLoadingScreen(req: HttpRequest<any>): boolean {
//     let displayLoadingScreen = true;
//     for (const skipUrl of this.skipUrls) {
//       if (new RegExp(skipUrl).test(req.url)) {
//         displayLoadingScreen = false;
//         break;
//       }
//     }
//     return displayLoadingScreen;
//   }
// }

