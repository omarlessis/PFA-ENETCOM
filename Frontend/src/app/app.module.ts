import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from'@angular/common/http';
import { DataUSERComponent } from './data-user/data-user.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgToastModule } from 'ng-angular-popup';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ModifierUserComponent } from './data-user/modifier-user/modifier-user.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddUpdateUserComponent } from './data-user/add-update-user/add-update-user.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {  MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormationComponent } from './formation/formation.component';
import { AddFormationComponent } from './formation/add-formation/add-formation.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { EditFormationComponent } from './formation/edit-formation/edit-formation.component';
import { PdfInterceptor } from './core/interceptor/pdf.interceptor';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {MatListModule} from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { EspaceComponent } from './espace/espace.component';
import { QuestionsComponent } from './questions/questions.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { AddReponseComponent } from './add-reponse/add-reponse.component';
import { ContentFormationComponent } from './formation/content-formation/content-formation.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DatePipe } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CreateQuizzComponent } from './create-quizz/create-quizz.component';
import { QuizzComponent } from './quizz/quizz.component';
import {MatRadioModule} from '@angular/material/radio';


import { ReactiveFormsModule } from '@angular/forms';
import { InscriptionsComponent } from './inscriptions/inscriptions.component';
import { WelcomeComponent } from './welcome/welcome.component';

// import { ChattingComponent } from './chatting/chatting.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DataUSERComponent,
    SidebarComponent,
    DashboardComponent,
    ModifierUserComponent,
    AddUpdateUserComponent,
    FormationComponent,
    AddFormationComponent,
    EditFormationComponent,
    EspaceComponent,
    QuestionsComponent,
    EditQuestionComponent,
    AddReponseComponent,
    ContentFormationComponent,
    CreateQuizzComponent,
    QuizzComponent,
    InscriptionsComponent,
    WelcomeComponent,
   
   
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    NgxFileDropModule,
    MatProgressBarModule,
    MatCheckboxModule,
    DatePipe,
    NgApexchartsModule,
    MatRadioModule,
    ReactiveFormsModule,
    
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PdfInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
