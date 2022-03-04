import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  signup(user:any) {
    return this.http.post(environment.api+"user"+"/signup", user).toPromise();
  }

  login(user:any) {
    return this.http.post(environment.api+"user"+"/login", user).toPromise();
  }

}
