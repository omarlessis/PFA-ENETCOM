import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
interface Question {
  questionText: string;
  options: string;
  options2: string;
  options3: string;
  result: string;
  result2: string;
  result3: string;
}
interface Results {
  result: string;
  result2: string;
  result3: string;
}
@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  quizName = 'first quiz';
  questions: Question[] = [];
  currentQuestionIndex = 0;
  question: Question | null = null;
  results: Results[] = []
  quiz_id:any;
  constructor(private userService:UserService,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params=>{
      this.quiz_id = params['id']
    })
   }

  ngOnInit(): void {
    this.fetchQuestions();
  }
  fetchQuestions() {
    this.userService.get_quiz(this.quiz_id).subscribe((res:any)=>{
      console.log(res)
      const data = res[0]
      this.quizName = data.quiz_name;
      this.questions = data.questions;
      console.log(data.questions)
      for (let index = 0; index < this.questions.length; index++) {
        this.results.push({result:'false', result2:'false', result3:'false'})
      }
    })
  }
  submit() {
    let score = 0
    let ind=0
    for (let index = 0; index < this.questions.length; index++) {
      let t:number = 0
      if (this.questions[index].result === this.results[index].result){
        t = t + 1
      }
      if (this.questions[index].result2 === this.results[index].result2){
        t = t + 1
      }
      if (this.questions[index].result3 === this.results[index].result3){
        t = t + 1
      }
      if(t===3)
        t = 1
      else{
        
        t=0
        ind=index+1
      }
    



      score = score + t

  
      
      

      score = (score )
        
      

    }
    
    

    
    alert("Votre score est " + score+"/"+this.questions.length + "\n"+"La question n° "+ind+" est fausse" )


  
  }

  
}
