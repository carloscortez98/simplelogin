import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private router:Router, private form:FormBuilder, private uSrv:UsersService) {
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
        // const decodedResponse = jwt_decode(response["token"])
        // this.dSrv.userRole = decodedResponse["role"]
        this.router.navigateByUrl("/")
        alert(response["message"])
      } else if (response["error"]) {
        alert(response["message"])
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
