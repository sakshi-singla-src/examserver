import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId:any;
  qTitle:any;
  questions:any=null;
  
  constructor(
      private _question:QuestionService,
      private _route:ActivatedRoute,
      private _snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    this.qTitle=this._route.snapshot.params['title'];
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any)=>{
          this.questions=data;
      },
      (error:any)=>{
        console.log(error);
      }
    );
  }

  deleteQuestion(quesId:any){
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:"Are you Sure?"
    }).then((result)=>{
      if(result.isConfirmed){
        this._question.deleteQuestion(quesId).subscribe(
          (data:any)=>{
              this._snack.open('question deleted successfully','',{
                duration:3000,
              });
              this.questions=this.questions.filter((q:any)=>q.quesId!=quesId)
          },
          (error:any)=>{
            this._snack.open('Error in deleting Question','',{
              duration:3000,
            });
            console.log(error);
          }
        );
      }
    });
  }

}
