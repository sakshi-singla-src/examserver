import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

import {MatSnackBar} from '@angular/material/snack-bar';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginData={
		username:'',
		password:'',
	};
  constructor(private loginService:LoginService,private snack:MatSnackBar,private router:Router) { }

  ngOnInit(): void {
  }

	formSubmit(){
		console.log("Login Button Clicked");
		if(this.loginData.username.trim()=='' || this.loginData.username==null){
			
			this.snack.open("Username is required",'',
			{
				duration:3000,
				verticalPosition:'top',
				horizontalPosition:'right',
			
			});
			return ;
		}
		if(this.loginData.password.trim()=='' || this.loginData.password==null){
			
			this.snack.open("Password is required",'',
			{
				duration:3000,
				verticalPosition:'top',
				horizontalPosition:'right',
			
			});
			return ;
		}
		
		//request to server to generate token
		//calling login service function generate token
		this.loginService.generateToken(this.loginData).subscribe(
		
		(data:any)=>{
			console.log('success');
			console.log(data);
			//login
			//save token from data
			this.loginService.loginUser(data.token);
			
			this.loginService.getCurrentUser().subscribe(
				(user:any)=>{
					this.loginService.setUser(user);
					console.log(user);
					
					//redirect --admin to admin dashboard
					//redirect norma --normal user dashboard
					if(this.loginService.getUserRole()=="ADMIN"){
						//admin dashboard
						//window.location.href='/admin';
						this.router.navigate(['admin']);
						this.loginService.loginStatusSubject.next(true);
					}else if(this.loginService.getUserRole()=="NORMAL"){
						//user dashboard
						//window.location.href='/user-dashboard';
						this.router.navigate(['user-dashboard']);
						this.loginService.loginStatusSubject.next(true);
					}else{
						//home page
						this.loginService.logout();
						location.reload();
						
					}
				}
				
			);
			
		},
		(error)=>{
			console.log('Error token not generated')
			console.log(error);
			this.snack.open("Invalid details!! Try Again",'',{
				duration:3000,
			});
		}
		
		);
	}
}
