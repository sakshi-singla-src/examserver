import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories:any=[];

  quizData:any={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:''
    }
  };
  constructor(private _quiz:QuizService,private _category:CategoryService, private _snack:MatSnackBar) { }

  ngOnInit(): void {
    
      this._category.categories().subscribe(
        (data:any)=>
        {
          
          this.categories=data;
          console.log(this.categories);
        },
        (error:any)=>{
          console.log(error);
          Swal.fire('error !!','Error in loading categories',error);
        }
      );
  }

  addQuiz(){
    if(this.quizData.title.trim()=='' || this.quizData.title==null){
        this._snack.open("title required",'',{
          duration:3000,
        });
        return ;

    }
      //call server
      this._quiz.addQuiz(this.quizData).subscribe(
        (data:any)=>{
          Swal.fire('success','Quiz is added','success');
          this.quizData={
            title:'',
            description:'',
            maxMarks:'',
            numberOfQuestions:'',
            active:true,
            category:{
              cid:''
            },
        
          }
        },
        (error:any)=>{
            console.log(error);
            Swal.fire('error','Error adding quiz!!',error);
        }


      );

  }

}
