import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl ="http://localhost:3000/api/register";
  private _loginUrl ="http://localhost:3000/api/login";

  constructor(private http:HttpClient,
              private _router: Router) { }
  registerUser(user){
    return this.http.post<any>(this._registerUrl, user)
  }
  
  loginUser(user){
    return this.http.post<any>(this._loginUrl, user)
  }
  loggedIn(){
    return !!localStorage.getItem('token')
    this._router.navigate(['/home'])
  }

  logoutUser(){
    localStorage.removeItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }
}
