import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-create-quizz',
  templateUrl: './create-quizz.component.html',
  styleUrls: ['./create-quizz.component.css']
})
export class CreateQuizzComponent implements OnInit {
   formation:any
   quizForm!: FormGroup;
  formation_id: any 
  constructor(private userService:UserService,private fb: FormBuilder, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params=>{
      this.formation_id = params['id']
    })
   }

  ngOnInit(): void {
    this.quizForm = this.fb.group({
      quizName: ['', Validators.required],
      questions: this.fb.array([
        this.createQuestion()
      ])
    })
  }
  createQuestion(): FormGroup {
    return this.fb.group({
      questionText: ['', Validators.required],
      options: ['', Validators.required],
      result:['false'],
      options2: ['', Validators.required],
      result2:['false'],
      options3: [''],
      result3:['false']
    });
  }

  addQuestion(): void {
    this.questions.push(this.createQuestion());
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }
  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }
  onSubmit(): void {
    const quiz = this.quizForm.value;
    console.log(quiz)
    this.userService.add_quiz({ quiz_name:quiz.quizName, questions: quiz.questions, formation_id: this.formation_id}).subscribe((res)=>{
      console.log(res)
      alert("quiz created")
    })
  }

}
