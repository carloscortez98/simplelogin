import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private router:Router, private form:FormBuilder, private uSrv:UsersService, private _snackBar:MatSnackBar) {
    this.loginForm = this.form.group({
      email: ["", Validators.compose([
        Validators.required
        ])],
      password: ["", Validators.compose([
        Validators.required
        ])]
    })
  }

  async login() {
    try {
      const response:any = await this.uSrv.login(this.loginForm.value);
      if (response["token"]) {
        localStorage.setItem("token", response["token"])
        const decodedResponse:any = jwt_decode(response["token"])
        this.uSrv.userName = decodedResponse["name"]
        this.uSrv.token = response["token"]
        this._snackBar.open(response["message"], 'x', { horizontalPosition: "end", verticalPosition: "top", duration: 2000})
        this.router.navigateByUrl("/profile")
      } else if (response["error"]) {
        this._snackBar.open(response["message"], 'x', { horizontalPosition: "end", verticalPosition: "top", duration: 2000})
      }
    } catch (error) {
      localStorage.clear();
      this.uSrv.userName = "";
      this._snackBar.open("Problema con la base de datos, por favor contactate conmigo", 'x', { horizontalPosition: "end", verticalPosition: "top", duration: 2000})
      this.router.navigateByUrl("/")
    }
  }

  ngOnInit() {
    if (localStorage.getItem("token")) {
      this._snackBar.open("Debe cerrar sesion para acceder", 'x', { horizontalPosition: "end", verticalPosition: "top", duration: 2000})
      this.router.navigateByUrl("/profile")
    }
  }

}
