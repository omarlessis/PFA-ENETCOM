import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../sidebar/sidebar.component';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:9000';
  constructor(private http: HttpClient,private cookieService: CookieService) {}
  
  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`http://127.0.0.1:9000/students/${id}`, data);
  }

  deleteStudent(studentId: string) {
    const url = `http://127.0.0.1:9000/students/${studentId}`;
    return this.http.delete(url);
  }
  updateStudent(studentId: string, studentData: any): Observable<any> {
    const url = `http://127.0.0.1:9000/students/${studentId}`;
    return this.http.put(url, studentData);
  }
  addUser(bodyData: any): Observable<any> {
    const url = 'http://127.0.0.1:9000/student/create';
    return this.http.post(url, bodyData);
  }
  deleteFormation(formationId: string) {
    const url = `http://127.0.0.1:9000/formation/${formationId}`;
    return this.http.delete(url);
  }
  addFormation(bodyData: any): Observable<any> {
    const url = 'http://127.0.0.1:9000/formation/create';
    return this.http.post(url, bodyData);
  }
  updateFormation(formationId: string, formationData: any): Observable<any> {
    const url = `http://127.0.0.1:9000/formation/${formationId}`;
    return this.http.put(url, formationData);
  }
  loginUser(bodyData: any): Observable<any> {
    const url = 'http://127.0.0.1:9000/student/login';
    return this.http.post(url, bodyData);
  }
  logout(): Observable<any> {
    const Url = 'http://127.0.0.1:9000/students/logout';
    return this.http.post<any>(Url, null);
  }
  getUser(userId: string) {
    const url = `http://127.0.0.1:9000/students/${userId}`;
    return this.http.get<User>(url);
  }
  addQuestion(bodyData: any): Observable<any> {
    const url = 'http://127.0.0.1:9000/question/create';
    return this.http.post(url, bodyData);
  }
  getQuestions():Observable<any> {
    const url = `http://127.0.0.1:9000/questions`;
    return this.http.get<any[]>(url);
  }
  deleteQuestion(questionId: string) {
    const url = `http://127.0.0.1:9000/question/${questionId}`;
    return this.http.delete(url);
  }
  getQuestionById(questionId: string) {
    const url = `http://127.0.0.1:9000/question/${questionId}`;
    return this.http.get<any>(url);
  }
  updateQuestion(questionId: string, questionData: any): Observable<any> {
    const url = `http://127.0.0.1:9000/question/${questionId}`;
    return this.http.put(url, questionData);
  }
  addReponse(bodyData: any): Observable<any> {
    const url = 'http://127.0.0.1:9000/reponse/create';
    return this.http.post(url, bodyData);
  }
  // getUser(userId:string): Observable<User> {
    
  //   const url = `http://127.0.0.1:9000/students/${userId}`;
  //   return this.http.get<User>(url);
  // }
  download(){
    return this.http.get('http://127.0.0.1:9000/download',
    {responseType: 'blob', reportProgress:true,observe:"events"})
  }
  getReponses():Observable<any> {
    const url = `http://127.0.0.1:9000/reponses`;
    return this.http.get<any[]>(url);
  }
  add_quiz(body:any){
    return this.http.post(`http://127.0.0.1:9000/quizz/create`, body)
  }
  get_quiz(id:any){
    return this.http.get(`http://127.0.0.1:9000/quizz/${id}`)
  }
}
