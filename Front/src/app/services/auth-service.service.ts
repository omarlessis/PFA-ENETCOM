import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { CookieService } from "ngx-cookie-service";
import { Observable } from 'rxjs';

import jwt_decode, { JwtPayload } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(    private cookieService: CookieService,private http: HttpClient) { }
    /** if token valid */
    isAuthenticated(): boolean {
      const jwtHelper = new JwtHelperService();
      const token = this.getToken();
      if (token) {
        return !jwtHelper.isTokenExpired(token);
      } else {
        return false;
      }
    }
  
    /** get Token */
    getToken(): string {
      return this.cookieService.get("token");
    }
     /** set Token  */
  setToken(value: string): void {
    this.cookieService.delete("token");
    this.cookieService.set("token", value, 365, "/");    
  }
   /** clear cookies */
   clearCookies() {
    this.cookieService.deleteAll("/");
    const cookies = document.cookie.split(";");
    for (const element of cookies) {
      const cookie = element;
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
   /** get user role from token */
   getUserRole(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwt_decode(token) as {role: string};
      return decodedToken.role;
    } else {
      return "";
    }
  }
  
  loginUser(bodyData: any): Observable<any> {
    const url = 'http://127.0.0.1:9000/student/login';
    return this.http.post(url, bodyData);
  }
}
