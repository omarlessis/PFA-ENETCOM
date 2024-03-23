import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgToastService} from 'ng-angular-popup'
import { AuthService } from '../services/auth-service.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
email :string='';
password:string='';
isLogin:boolean =true;
erroMessage: string="";
  constructor(private router:Router,private http:HttpClient,private toast:NgToastService,private authService: AuthService, private cookieService: CookieService) { }
  
  ngOnInit(): void {
    
  }
 
  // -------------------------------------------------------------------------
  login() {
    const bodyData = {
      email: this.email,
      password: this.password,
    };

    this.authService.loginUser(bodyData).subscribe(
      (resultData: any) => {
        if (resultData.status) {
          this.toast.success({
            detail: 'success message',
            summary: "login success",
            duration: 5000
          });
          this.authService.setToken(resultData.token);
          this.cookieService.set('role',resultData.message)
          // this.cookieService.delete('userId');
          
          this.cookieService.set('userId', String(resultData.id));
          if(resultData.message == "Bienvenue Admin")
          this.router.navigateByUrl('/dashboard');
          else
          this.router.navigateByUrl('/formation');
        } else {
          this.toast.error({
            detail: 'error message',
            summary: "login failed, incorrect email or password",
            duration: 5000
          });
        }
      },
      (error: any) => {
        console.error(error);
        this.erroMessage = 'Failed to connect to server';
      }
    );
  }
  Forgot(){
    this.toast.info({
      detail: 'Info',
      summary: "Please contact the administration",
      duration: 5000
    });
  }
  
  }

