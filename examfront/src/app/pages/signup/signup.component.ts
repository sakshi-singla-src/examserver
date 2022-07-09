import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService, private snack:MatSnackBar) { }

  ngOnInit(): void {
  }
  
  public user={
	
	username:'',
	password:'',
	firstName:'',
	lastName:'',
	email:'',
	phone:'',
};

  formSubmit(){
	
	    console.log(this.user);
	
		if(this.user.username=='' || this.user.username==null)
		{
			//alert('User is required');
			this.snack.open("Username is Required !!",'',{
				duration:3000,
				verticalPosition:'top',
				horizontalPosition:'right',
			});
			return
		}
		
		//validate
		
		//add user function call from userservice
		this.userService.addUser(this.user).subscribe(
			(data : any)=>{
				console.log(data);
				//alert('success');
				Swal.fire('success','user is registered','success');
			},
			(error)=>{
				console.log(error);
				//alert('error');
				this.snack.open("Something went wrong",'',{
					duration:3000,
					verticalPosition:'top',
					horizontalPosition:'right',
				});
				
			}
		);
	
	}

}
