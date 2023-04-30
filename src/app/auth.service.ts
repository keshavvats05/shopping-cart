import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './components/auth/user.model';

export interface AuthResponseData {
  kind:string,
  idToken:string,
  email:string,
  refreshTokan:string,
  expiresIn:string,
  localId:string,
  registered?:boolean,
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenExpirationTimer:any;
  user = new BehaviorSubject<User>({
    email: '',
    id: '',
    token:'',
    _token:'',
  });

  constructor(private http:HttpClient,
    private router:Router) { }
  
  signup(email:string, password: string){
     return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCXvReP399GscXm1FPJZahkh-05lNCIuoc',
    {
      email:email,
      password:password,
      returnSecureToken:true
    }) 
    .pipe(
      catchError(this.handleError),tap(resData=>{
        this.handleAuthenticaion(resData.email,
          resData.idToken,
          +resData.expiresIn,
          resData.localId);
        
      })
    );
  }
  login(email:string,password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCXvReP399GscXm1FPJZahkh-05lNCIuoc',
    {
      email:email,
      password:password,
      returnSecureToken:true
    }) .pipe(
      catchError(this.handleError),tap(resData=>{
        this.handleAuthenticaion(resData.email,
          resData.idToken,
          +resData.expiresIn,
          resData.localId);
        
      })
    )
    }
    autoLogin(){
      const userData:{
        email:string;
        id:string;
        _token:string;
        _tokenExpirationDate:string;
      }=JSON.parse(localStorage.getItem('userData') || '{}');//JSON.parser takes the json string and converts into javascript object
      // console.log(userData)
      if (!userData){
        return;
      }
      
      const loadedUser=new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
        if(loadedUser.token){
          this.user.next(loadedUser);
          // console.log(this.user)
          const expirationDuration=new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
          this.autoLogout(expirationDuration);
        }
      }

    private handleAuthenticaion(email:string,token:string,expiresIn:number,userId:string){
      const expirationDate =new Date(
        new Date().getTime() + expiresIn*1000);
        const user=new User(
          email,
          userId,
          token,
          expirationDate);
          this.user.next(user);
          this.autoLogout(expiresIn*1000);
          localStorage.setItem('userData',JSON.stringify(user));
          //we need to add user to local storage so that we the app reloads the user data can still be there in local storage, and it can be
          //further retrieved . to store it in localstorage we need to convert it into its string version that can be done using JSON.stringigy method.
    }
    private handleError(errorRes:HttpErrorResponse){
      // console.log(errorRes)
      let errorMessage='An unknown error occured!';
      if(!errorRes.error.error){
        return throwError(errorMessage);
      }
      switch(errorRes.error.error.message){
        case 'EMAIL_EXISTS':
          errorMessage='This email exists already';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage='This email does not exists'
          break;
        case 'INVALID_PASSWORD':
          errorMessage='This password is not valid';
          break;
      }
      return throwError(errorMessage)
    }
  logout(){
    this.user.next({
      email: '',
      id: '',
      token:'',
      _token:''
    })
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      this.tokenExpirationTimer=null
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer=null;
  }
  autoLogout(expirationDuration:number){
    // console.log(expirationDuration)
    this.tokenExpirationTimer=setTimeout(()=>{
      this.logout();
    },expirationDuration);
  }

  }
