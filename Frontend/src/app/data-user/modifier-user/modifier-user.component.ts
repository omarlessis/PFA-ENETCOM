import { Component, Inject, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { AddUpdateUserComponent } from '../add-update-user/add-update-user.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {NgToastService} from 'ng-angular-popup';
import { UserService } from 'src/app/services/user.service';

// import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-modifier-user',
  templateUrl: './modifier-user.component.html',
  styleUrls: ['./modifier-user.component.css']
})

export class ModifierUserComponent implements OnInit {

  
  // @Input() userService: UserService;
  constructor(private http: HttpClient,public _dialog: MatDialog,private toast:NgToastService,private _dialogRef:MatDialogRef<ModifierUserComponent>,@Inject(MAT_DIALOG_DATA)public data:any,public userService: UserService) { }
  firstname: string="";
  lastname: string="";
  email: string="";
  password: string="";
  role: string="";
  phoneNumber: string= "" ;
  studentId: string="";
  ngOnInit(): void {
      if (this.data) {
    this.studentId = this.data._id;
    this.firstname = this.data.firstname;
    this.lastname = this.data.lastname;
    this.email = this.data.email;
    this.password = this.data.password;
    this.role = this.data.role;
    this.phoneNumber = this.data.phoneNumber;
  }

  }
    
  
  update(): void {
    const bodyData = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      role: this.role,
      phoneNumber: this.phoneNumber,
    };
    this.userService.updateStudent(this.studentId, bodyData).subscribe(
      (resultData: any) => {
        console.log(resultData);
        this.toast.success({
          detail: "success message",
          summary: "Student updated successfully",
          duration: 5000,
        });
        this._dialogRef.close(true);
      },
      (error) => {
        console.error(error);
        this.toast.error({
          detail: "error message",
          summary: "Update failed, try again later!",
          duration: 5000,
        });
      }
    );
  }
  
}

