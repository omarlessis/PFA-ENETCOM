import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-formation',
  templateUrl: './edit-formation.component.html',
  styleUrls: ['./edit-formation.component.css']
})
export class EditFormationComponent implements OnInit {

  constructor(private http: HttpClient,public _dialog: MatDialog,private toast:NgToastService,private _dialogRef:MatDialogRef<EditFormationComponent>,@Inject(MAT_DIALOG_DATA)public data:any,public userService: UserService) { }
  nameFormation: string="";
  picture: string="";
  nameFormateur: string="";
  dateAjout: string="";
  dateFin: string="";
  description: string= "" ;
  formationId:string="";
  ngOnInit(): void {
    if (this.data) {
      this.formationId = this.data._id;
      this.nameFormation = this.data.nameFormation;
      this.picture = this.data.picture;
      this.nameFormateur = this.data.nameFormateur;
      this.dateAjout = this.data.dateAjout;
      this.dateFin = this.data.dateFin;
      this.description = this.data.description;
    }
  }
  update(): void {
    const bodyData = {
      nameFormation: this.nameFormation,
      picture: this.picture,
      nameFormateur: this.nameFormateur,
      dateAjout: this.dateAjout,
      dateFin: this.dateFin,
      description: this.description,
    };
    this.userService.updateFormation(this.formationId, bodyData).subscribe(
      (resultData: any) => {
        console.log(resultData);
        this.toast.success({
          detail: "success message",
          summary: "Formation updated successfully",
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
