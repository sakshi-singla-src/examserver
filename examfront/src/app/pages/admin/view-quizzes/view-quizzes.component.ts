import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes:any=[
    

]
  constructor(private _quiz : QuizService) { }

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(data);
      },
      (error:any)=>{
        console.log(error);
        Swal.fire('error','Error in loading Quizzes!!',error);
      }
    );
  }

  deleteQuiz(qid:any){
      Swal.fire({
        icon:'info',
        'title':"Are you sure ?",
        confirmButtonText:'Delete',
        showCancelButton:true,
      }).then((result)=>{

        if(result.isConfirmed){
          //delete
          this._quiz.deleteQuiz(qid).subscribe(
            (data:any)=>{
              
              this.quizzes=this.quizzes.filter((quiz:any)=>quiz.qid!=qid)
              Swal.fire('Sucess','Quiz was deleted Successfully','success');
            },
            (error:any)=>{
              console.log(error);
              Swal.fire('error','Quiz couldnt be deleted',error);
            }
    
          );
        }

      });

  }

}
