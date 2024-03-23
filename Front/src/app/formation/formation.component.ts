import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddFormationComponent } from './add-formation/add-formation.component';
import { EditFormationComponent } from './edit-formation/edit-formation.component';
import { AuthService } from '../services/auth-service.service';
import { CookieService } from 'ngx-cookie-service';
import { NgToastService } from 'ng-angular-popup';
import { Location } from '@angular/common';
@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {
  userRole: string | undefined;
  students: any[] = [];
  public pageSlice =this.students.slice (0.3)
  selectedFormations: { [key: string]: boolean } = {};
  constructor(private toast:NgToastService,private http: HttpClient,public _dialog: MatDialog,private cookieService: CookieService,private userService: UserService,private authService: AuthService,private location: Location) { }
  
  ngOnInit() {
    this.http.get<any[]>('http://127.0.0.1:9000/formations').subscribe(
      (data) => {
        this.students = data;
       console.log(data)
      },
      (error) => {
        console.error(error);
      }
    );
    this.userRole = this.authService.getUserRole();
  }
  user=this.cookieService.get('userId')
  onClickDelete(formationId: string) {
    const confirmDelete = confirm('Are you sure you want to delete this course ?');
    if (confirmDelete) {
      this.userService.deleteFormation(formationId).subscribe(
        (response) => {
          console.log('Formation deleted successfully:', response);
          this.ngOnInit();
        },
        (error) => {
          console.error('Error deleting student:', error);
        }
      );
    }
  }




  openAddEditUser(){
    const dialogRef= this._dialog.open(AddFormationComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.ngOnInit();
        }
      },
    });
   } 
   openEditUser(data: any){
    const dialogRef= this._dialog.open(EditFormationComponent ,{
      data,
    });
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.ngOnInit();
          }
        },
      });

    }
   

  
    
 
    
    onSubmit() {
      const selectedIds = Object.keys(this.selectedFormations).filter(id => this.selectedFormations[id]);
      if(selectedIds.length === 0) {
        this.toast.error({detail:'success message',summary:"please select formation",duration:5000})
        return;
      }
      const data = { user: this.cookieService.get('userId'), formation: selectedIds };
      this.http.post('http://127.0.0.1:9000/inscription/create', data).subscribe(
        (response) => {
          console.log('Inscription réussie:', response);
          this.toast.success({detail:'success message',summary:"registered successfully",duration:5000})
        },
        (error) => {
          console.error('Erreur lors de l\'inscription:', error);
          if (error.status === 400 && error.error && error.error.message === "User already registered for one of the selected formations.") {
            this.toast.error({detail:'error message', summary:"Formation already registered for user", duration:5000});
          } else {
            this.toast.error({detail:'error message',summary:"error when saving !",duration:5000})
          }
        }
      );
      // window.location.reload();
    }
    
    
    

  

    
  
    OnpageChange(event:any){
      console.log(event);
      const startIndex = event.pageIndex * event.pageSize;
      let endIndex = startIndex + event.pageSize;
      if(endIndex > this.students.length){
        endIndex = this.students.length;
      }
      this.pageSlice = this.students.slice(startIndex, endIndex);
    }
  
  
    
}
