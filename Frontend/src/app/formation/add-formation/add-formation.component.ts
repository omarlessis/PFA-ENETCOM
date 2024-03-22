import { Component, OnInit } from '@angular/core';
import {NgToastService} from 'ng-angular-popup';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css']
})
export class AddFormationComponent implements OnInit {

  constructor(private toast:NgToastService,private _dialogRef:MatDialogRef<AddFormationComponent>,public userService: UserService) { }
  nameFormation: string="";
  picture: string="";
  nameFormateur: string="";
  dateAjout: string="";
  dateFin: string="";
  description: string= "" ;
  ngOnInit(): void {
  }
  register()
  {
    let bodyData=
    {
      "nameFormation" :this.nameFormation,
      "picture" :this.picture,
      "nameFormateur" :this.nameFormateur,
      "dateAjout" :this.dateAjout,
      "dateFin" : this.dateFin,
      "description": this.description
      
    };
    this.userService.addFormation(bodyData).subscribe((resultData: any)=>
    
    {if(resultData.status){
      console.log(resultData);
      this.toast.success({detail:'success message',summary:"formation registered successfully",duration:5000})
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
