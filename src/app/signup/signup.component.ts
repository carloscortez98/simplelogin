import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup;

  constructor(private router:Router, private form:FormBuilder, private uSrv:UsersService,) {
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
        alert(user["message"])
      } else {
        alert(user["message"])
      }
    } catch (error) {
      localStorage.clear();
      // this.dSrv.userRole = "";
      alert("Problema con la base de datos, por favor contactate conmigo")
      this.router.navigateByUrl("/")
    }
  }

  ngOnInit(): void {
  }

}
