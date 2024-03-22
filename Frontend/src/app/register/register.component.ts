import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
// import { AuthServiceService } from '../services/auth-service.service';
import {NgToastService} from 'ng-angular-popup'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstname: string="";
  lastname: string="";
  email: string="";
  password: string="";
  role: string="";
  phoneNumber: string= "" ;
  constructor(private http:HttpClient,private toast:NgToastService) { }
  // registering(g){
  //   //console.log(f.value)
  //   let data=g.value
  //   this.sa.signup(data.email,data.password).then(()=>{
  //   console.log("done!")
  //   }).catch(()=>{
  //     console.log("error!")
  //   })
  //     }
  

  ngOnInit(): void {
  }
  register()
  {
    let bodyData=
    {
      "firstname" :this.firstname,
      "lastname" :this.lastname,
      "email" :this.email,
      "password" :this.password,
      "role" : this.role,
      "phoneNumber": this.phoneNumber
      
    };
    this.http.post("http://127.0.0.1:9000/student/create",bodyData).subscribe((resultData: any)=>
    
    {if(resultData.status){
      console.log(resultData);
      this.toast.success({detail:'success message',summary:"student registered successfully",duration:5000})
    }
    else{
      this.toast.error({detail:'error message',summary:"register failed, try again later!",duration:5000})
    }
    });
  }
  save(){
    this.register();
  }
}
