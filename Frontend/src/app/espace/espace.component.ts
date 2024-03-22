import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-espace',
  templateUrl: './espace.component.html',
  styleUrls: ['./espace.component.css']
})
export class EspaceComponent implements OnInit {


  constructor(private toast:NgToastService,private userService: UserService,private cookieService: CookieService,private router:Router) { }
  description: string="";
  title: string="";
 
  ngOnInit(): void {
  }
  register()
  {
    let bodyData=
    {
      "description" :this.description,
      "title" :this.title,
      "auteur": this.cookieService.get('userId')
      
      
    };
    this.userService.addQuestion(bodyData).subscribe((resultData: any)=>
    
    {if(resultData.status){
      console.log(resultData);
      this.toast.success({detail:'success message',summary:"Question registered successfully",duration:5000})
      this.router.navigateByUrl('/question');
    }
    else{
      console.log(Error)
      this.toast.error({detail:'error message',summary:"register failed, try again later!",duration:5000})
    }
    });
  }
  save(){
    this.register();
  }
}
