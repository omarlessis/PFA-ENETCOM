import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NgToastService } from 'ng-angular-popup';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-add-reponse',
  templateUrl: './add-reponse.component.html',
  styleUrls: ['./add-reponse.component.css']
})
export class AddReponseComponent implements OnInit {

  constructor( private toast:NgToastService ,private userService: UserService,private route: ActivatedRoute,private router: Router,private cookieService: CookieService) { }
  description: string="";
  questionId: string="";
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.questionId = params['id'];
    });
  }
  register()
  {
    let bodyData=
    {
      "description" :this.description,
      "auteur": this.cookieService.get('userId'),
      "question": this.questionId
      
      
    };
    this.userService.addReponse(bodyData).subscribe((resultData: any)=>
    
    {if(resultData.status){
      console.log(resultData);
      this.toast.success({detail:'success message',summary:"Reponse registered successfully",duration:5000})
      // this.router.navigateByUrl('/question');
    }
    else{
      console.log(Error)
      this.toast.error({detail:'error message',summary:"register failed, try again later!",duration:5000})
    }
    });
  }
  save(){
    this.register();
  }
}
