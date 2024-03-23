import { Component, Inject, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  
  constructor(private toast:NgToastService,public userService: UserService,private route: ActivatedRoute) { }
  title: string="";
  description: string= "" ;
  questionId:string="";
  question: any = {};

 
 
  ngOnInit() {
  this.route.params.subscribe(params => {
    this.questionId = params['id'];
    this.userService.getQuestionById(this.questionId).subscribe((data) => {
      this.question = data;
    });
  });
  }
  update(): void {
    const bodyData = {
      title: this.question.title,
      description: this.question.description,
    };
    this.userService.updateQuestion(this.questionId, bodyData).subscribe(
      (resultData: any) => {
        console.log(resultData);
        this.toast.success({
          detail: "success message",
          summary: "Question updated successfully",
          duration: 5000,
        })
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
  discard(): void{
    this.userService.getQuestionById(this.questionId).subscribe((data) => {
      this.question = data;
  });
  }
}
