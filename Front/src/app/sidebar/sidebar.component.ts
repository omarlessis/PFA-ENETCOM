import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { CookieService } from 'ngx-cookie-service';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  photoUrl: string;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  user: User | undefined;
  private unsubscribe$ = new Subject<void>();
  userRole!: string;
  constructor(private UserService: UserService,private router:Router, private authService:AuthService,private cookieService: CookieService, private changeDetectorRef: ChangeDetectorRef,) { }
  ngOnInit() {
 
    this.fetchUserData();
    this.userRole = this.authService.getUserRole();
  }
  fetchUserData() {
  const userId = this.cookieService.get('userId');
  // const userId="641b14014b612bdd03af24c2"
  if (!userId) {
    console.error('User ID not found in cookie');
    return;
  }

  this.UserService.getUser(userId).subscribe(
    (user: User) => {
      this.user = user;
      this.changeDetectorRef.detectChanges();
    },
    (error) => {
      console.error(error);
    }
  );
  }
  onUserLogin() {
    if (this.authService.isAuthenticated()) {
      this.fetchUserData();
    }
  }
  
  
 
  logout() {
    this.UserService.logout().subscribe(
      data => {
        console.log(data);

        // this.cookieService.delete('userId');
        this.authService.clearCookies()
        this.router.navigateByUrl('/');
      },
      error => {
        console.log(error);
      }
    );
  }

}

