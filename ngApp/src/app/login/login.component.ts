import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {
    email:'',
    password:''
  }
  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        console.log(res),
        localStorage.setItem('token',res.token)
        this._router.navigate(['/home'])
      },
      err => console.log(err)
    )
    }
}
