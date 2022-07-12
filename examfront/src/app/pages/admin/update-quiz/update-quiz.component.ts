import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  categories:any;
  qId=0;
  quiz:any;
  constructor(private _snack:MatSnackBar,private _route:ActivatedRoute, private _quiz:QuizService, private _category:CategoryService, private _router:Router) { }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    
    this._quiz.getSingleQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quiz=data;
        console.log(this.quiz);
      },
      (error:any)=>{
          console.log(error);
      }

    );

    this._category.categories().subscribe(

      (data:any)=>{
        this.categories=data;

      },
      (error:any)=>{
        alert("error in loading categories!!");
      }
    );
  }

  public updateData(){

    if(this.quiz.title.trim()==''|| this.quiz.title==null){
      this._snack.open("Title is required",'',{
        duration:3000,
      });
    }

    this._quiz.updateQuiz(this.quiz).subscribe(

      (data:any)=>{
        Swal.fire('Success',"Quiz data Updated Successfully",'success').then((e)=>{
          this._router.navigate(['/admin/quizzes']);
        });
      },
      (error:any)=>{
        Swal.fire('error',"Quiz data Update error",error);
     
      }
    );

  }

}
