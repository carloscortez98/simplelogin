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

  ngOnInit(): void {
  }

}
