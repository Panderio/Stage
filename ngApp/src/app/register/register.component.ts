import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {
    Firstname:'',
    Lastname:'',
    avatar:'',
    email:'',
    password:'',
    chk_pass:'',
  }

  constructor(private _auth:AuthService,
              private _router: Router) { }

  ngOnInit(): void {
  }
  registerUser(){
    this._auth.registerUser(this.registerUserData)
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
