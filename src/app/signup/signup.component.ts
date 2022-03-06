import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup;

  constructor(private router:Router, private form:FormBuilder, private uSrv:UsersService, private _snackBar:MatSnackBar) {
    this.signupForm = this.form.group({
      name: ["", Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-ZÑñ ]*$')
        ])],
      email: ["", Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern('^([a-zA-ZÑñ0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$')
        ])],
      password: ["", Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
        ])]
    })
  }

  async signup() {
    try {
      const user:any = await this.uSrv.signup(this.signupForm.value);
      if (user["error"] == "No") {
        this._snackBar.open(user["message"], 'x', { horizontalPosition: "end", verticalPosition: "top", duration: 2000})
        this.router.navigateByUrl("/login")
      } else {
        this._snackBar.open(user["message"], 'x', { horizontalPosition: "end", verticalPosition: "top", duration: 2000})
      }
    } catch (error) {
      localStorage.clear();
      // this.dSrv.userRole = "";
      this._snackBar.open("Problema con la base de datos, por favor contactate conmigo", 'x', { horizontalPosition: "end", verticalPosition: "top", duration: 2000})
      this.router.navigateByUrl("/")
    }
  }

  ngOnInit(): void {
  }

}
