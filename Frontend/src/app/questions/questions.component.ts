import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: any[] = [];
  showAnswerInput: boolean = false;
  currentQuestion: any;
  description: string="";
  reponses:any[] = [];
  constructor(private userService:UserService,private cookieService: CookieService,private http: HttpClient) { }

  user = this.cookieService.get('userId')
  role = this.cookieService.get('role')
  ngOnInit(): void {
    
      this.userService.getQuestions().subscribe(data => {
        this.questions = data;
        console.log(this.questions)
      });
      // this.userService.getReponse().subscribe(data => {
      //   this.questions = data;
      // });
    this.userService. getReponses().subscribe(data => {
    this.reponses = data;
  });
      
      
  }
  
  deleteAnswer(id:any){
    const confirmDelete = confirm('Are you sure you want to delete this question ?');
    if (confirmDelete) {
    this.http.delete(`http://127.0.0.1:9000/reponse/${id}`).subscribe((data:any)=>{
      console.log(data)
      window.location.reload()
    })
    }
  }
 
  onClickDelete(questionId: string) {
    const confirmDelete = confirm('Are you sure you want to delete this question ?');
    if (confirmDelete) {
      this.userService.deleteQuestion(questionId).subscribe(
        (response) => {
          console.log('Question deleted successfully:', response);
          this.ngOnInit();
          // Add your code to update the list of students here
        },
        (error) => {
          console.error('Error deleting question:', error);
        }
      );
    }
  }
  showAnswerInputField(question: any) {
    this.showAnswerInput = true;
    this.currentQuestion = question;
  }

  addAnswer(description: string) {
    const bodyData = {
      "description": description,
      "auteur": this.cookieService.get('userId'),
      "question": this.currentQuestion._id
    };
    
    
    
    this.userService.addReponse(bodyData).subscribe((resultData: any) => {
      if (resultData.status) {
        console.log(resultData);
        // ajouter une notification de réussite ici
        this.showAnswerInput = false;
        this.ngOnInit();
      } else {
        console.log(Error)
        // ajouter une notification d'erreur ici
      }
    });
  }
}
 
