import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userName:string = "";
  token:string = "";

  constructor(private http:HttpClient) { }

  signup(user:any) {
    return this.http.post(environment.api+"user"+"/signup", user).toPromise();
  }

  login(user:any) {
    return this.http.post(environment.api+"user"+"/login", user).toPromise();
  }

  delete(id:any) {
    let token:any = ""
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token");
    }
    return this.http.delete(environment.api+"user"+"/delete"+"/"+id, {headers:{"x-access-token":token}})
  }

}
