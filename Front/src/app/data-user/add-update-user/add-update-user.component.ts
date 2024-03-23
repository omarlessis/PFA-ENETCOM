import { Component, Inject, OnInit } from '@angular/core';
import {NgToastService} from 'ng-angular-popup';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.css']
})
export class AddUpdateUserComponent implements OnInit {
  
  constructor(private http:HttpClient,private toast:NgToastService,private _dialogRef:MatDialogRef<AddUpdateUserComponent>,@Inject(MAT_DIALOG_DATA)public data:any,public userService: UserService) { }
  firstname: string="";
  lastname: string="";
  email: string="";
  password: string="";
  role: string="";
  phoneNumber: string= "" ;
  ngOnInit(): void {

  if (this.data) {
    this.firstname = this.data.firstname;
    this.lastname = this.data.lastname;
    this.email = this.data.email;
    this.password = this.data.password;
    this.role = this.data.role;
    this.phoneNumber = this.data.phoneNumber;
  }
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
      this.userService.addUser(bodyData).subscribe((resultData: any)=>
      
      {if(resultData.status){
        console.log(resultData);
        this.toast.success({detail:'success message',summary:"student registered successfully",duration:5000})
        this._dialogRef.close(true);
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








