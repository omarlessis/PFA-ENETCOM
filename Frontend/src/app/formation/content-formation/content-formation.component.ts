import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import {FileSelectDirective,FileUploader} from'ng2-file-upload';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-content-formation',
  templateUrl: './content-formation.component.html',
  styleUrls: ['./content-formation.component.css']
})


export class ContentFormationComponent implements OnInit {
  voteValue: number | undefined;
  setVote(vote: number) {
    this.voteValue = vote;
  }
  uploadedFiles:any;
  selectedFile: File | undefined;
  uploadResponse: any | undefined;
  errorMessage: string | undefined;
  formation_id:string | undefined;
  userRole: string | undefined;
  filesRetrieved: boolean = false; // Ajout d'une variable pour vérifier si les fichiers ont été récupérés
  
  constructor(private http: HttpClient, private toast: NgToastService,private cookieService: CookieService, private route: ActivatedRoute,private authService: AuthService) {}

  ngOnInit(): void {
    this.uploadResponse = null;
   
    
    this.route.queryParams.subscribe(params=>{
      this.formation_id = params['id']
      console.log(params['id'])
    })
    this.getFiles();
    this.userRole = this.authService.getUserRole();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (!this.selectedFile) {
      this.errorMessage = 'Veuillez sélectionner un fichier.';
      return;
    }
  }

  upload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post<any>(`http://127.0.0.1:9000/upload/${this.formation_id}`, formData).subscribe(
        (response) => {
          console.log(response);
          this.uploadResponse = response;
          if (this.filesRetrieved) { // Vérification que les fichiers ont été récupérés avant de télécharger
            this.downloadFile(response.fileName);
          }
          this.uploadedFiles.push(response);
        },
        (error) => {
          console.log(error);
          this.errorMessage =
            "Une erreur s'est produite lors du téléchargement du fichier.";
          this.toast.error({
            detail: 'error message',
            summary:
              "error.",
            duration: 5000,
          });
        }
      );
    } else {
      this.toast.error({
        detail: 'error message',
        summary: 'No file selected !',
        duration: 5000,
      });
    }
  }

  getFiles() {
    console.log(this.formation_id)
    this.http.get<any[]>(`http://127.0.0.1:9000/files/${this.formation_id}`).subscribe(
      (response) => {
        console.log(response);
        this.uploadedFiles = response;
        console.log(this.uploadedFiles)
        this.filesRetrieved = true; // Indique que les fichiers ont été récupérés avec succès
      },
      (error) => {
        console.log(error);
        this.errorMessage =
          "Une erreur s'est produite lors de la récupération des fichiers.";
      }
    );
  }

  downloadFile(filename: string) {
    console.log(filename)
    const downloadUrl = `http://127.0.0.1:9000/download/${filename}`;
  
    this.http
      .get(downloadUrl, { responseType: 'blob' })
      .subscribe(
        (response: any) => {
          const blob = new Blob([response], { type: response.type });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.style.display = 'none';
          a.href = url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);
        },
        (error) => {
          console.log(error);
          this.errorMessage = "Une erreur s'est produite lors du téléchargement du fichier.";
        }
      );
  }


  submitVote() {
  
    const userId = this.cookieService.get('userId');
    const voteData = {
      formationId:this.formation_id,
      userId: userId,
      voteValue: this.voteValue
    };
  
    this.http.post('http://127.0.0.1:9000/votes', voteData)
      .subscribe(
        response => {
          console.log(response);
          this.toast.success({
            detail: 'success vote',
            summary:
              "You have voted for this training program",
            duration: 5000,
          });
        },
        error => {
          console.error(error);
          this.toast.error({
            detail: 'Problem!',
            summary:
              "You have already voted this formation!",
            duration: 5000,
          });
        }
      );
  }
  
}
