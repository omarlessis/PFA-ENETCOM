import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.css']
})
export class InscriptionsComponent implements OnInit {
  displayedColumns: string[] = ['user','formation','weight','symbol','actions'];
 dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private http: HttpClient,public _dialog: MatDialog,private userService: UserService) { }

  data  : any
  data2 : any
  ngOnInit(): void {

    this.http.get<any[]>('http://127.0.0.1:9000/formations').subscribe(
      (data) => {
        this.data = data
        // this.students = data;
        this.dataSource = new MatTableDataSource(data);
        console.log(data)
       this.dataSource.paginator=this.paginator

      },
      (error) => {
        console.error(error);
      }
    )

    this.http.get('http://127.0.0.1:9000/votes/avgVote').subscribe((data2:any)=>{
      this.data2 = data2
      console.log(data2)
    })
     console.log("huif")
      const voteMap = this.data2.reduce((acc:any, curr:any) => {
        acc[curr._id] = curr.averageRating;
        return acc;
      }, {})

      const mergedArray = this.data.map((obj:any) => ({
        ...obj,
        vote: voteMap[obj._id]
      }))
      
      
      console.log(mergedArray)
  }

}
