import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import * as $ from 'jquery';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userName:any = "";

  constructor(private clipboard: Clipboard, private _snackBar:MatSnackBar, private uSrv:UsersService, private router:Router) { }

  copyEmail() {
    const email = $('#email').text();
    this.clipboard.copy(email);
    this._snackBar.open("¡Copiado!", 'x', { horizontalPosition: "end", verticalPosition: "bottom", duration: 2000})
  }

  copyPhone() {
    const phone = $('#phone').text();
    this.clipboard.copy(phone);
    this._snackBar.open("¡Copiado!", 'x', { horizontalPosition: "end", verticalPosition: "bottom", duration: 2000})
  }

  logout() {
    localStorage.clear();
    this.uSrv.userName = ""
    this.router.navigateByUrl("/")
    this._snackBar.open("Cerraste Sesion", 'x', { horizontalPosition: "end", verticalPosition: "top", duration: 2000})
  }

  async delete() {
    try {
      let localToken:any = localStorage.getItem("token")
      let srvToken:any = this.uSrv.token
      let id:any = ""
      if (localToken == srvToken) {
        let decoded:any = jwt_decode(srvToken)
        id = decoded["id"]
      }

      const deleted:any = await this.uSrv.delete(id).toPromise();
      if (deleted["error"] == "Si") {
        this._snackBar.open("Por favor, vuelva a iniciar sesion", 'x', { horizontalPosition: "end", verticalPosition: "top", duration: 2000})
        localStorage.clear();
        this.uSrv.userName = "";
        this.router.navigateByUrl("/login")
      } else if (deleted["error"] == "No") {
        localStorage.clear();
        this.uSrv.userName = "";
        this._snackBar.open(deleted["message"], 'x', { horizontalPosition: "end", verticalPosition: "top", duration: 2000})
        this.router.navigateByUrl("/login")
      }
    } catch (error) {
      localStorage.clear();
      this.uSrv.userName = "";
      this._snackBar.open("Problema con la base de datos, por favor contactate conmigo", 'x', { horizontalPosition: "end", verticalPosition: "top", duration: 2000})
      this.router.navigateByUrl("/")
    }
  }

  async ngOnInit() {
    this.userName = await this.uSrv.userName;
  }

}
