import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(private authService:AuthService,
    private router:Router){}
    ngOnInit(): void {
  
    }
  isLoginMode=true
  isLoading=false
  error:string="";
  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode
  }
  onSubmit(form:NgForm){

    const email=form.value.email;
    const password=form.value.password;
    this.isLoading=true

    let authObs:Observable<AuthResponseData>;
    this.isLoading=true
    if (this.isLoginMode){
      authObs =this.authService.login(email,password);
    }
    else{
     authObs= this.authService.signup(email,password);
    }
    authObs.subscribe( 
      resData=>{

        // console.log(resData);
        this.isLoading=false
        this.router.navigate(['/'])
      },
      errorMessage=>{
        this.error=errorMessage;
        this.isLoading=false;
      }
    );
    form.reset();

  }

}
