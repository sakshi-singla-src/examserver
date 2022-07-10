import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';



@Injectable()
export class AuthInterceptor implements HttpInterceptor{
	
		constructor(private loginService:LoginService){}
		intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
	    
	    let authReq=req;
	    //add jwt token from local storage to every request
	    const token = this.loginService.getToken();
	    console.log('inside interceptor');
	    
	    if(token!=null){
			authReq=authReq.clone({setHeaders:{Authorization:`Bearer ${token}`},
			});
			console.log(authReq);
		}
		else{
			console.log(token);
		}
		return next.handle(authReq);
  	}
}

//configuration in app.module.ts
export const authInterceptorProviders=[
	{
		provide:HTTP_INTERCEPTORS,
		useClass:AuthInterceptor,
		multi:true,
	}
];