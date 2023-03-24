import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { User } from '../shared/models/User';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';

const USER_KEY:string = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject:BehaviorSubject<User> = new BehaviorSubject<User>(this.getUserFromLocalStorage() );
  public userObservable:Observable<User>;

  constructor(
    private httpClient:HttpClient,
    private toastrService:ToastrService
  ) {
    this.userObservable = this.userSubject.asObservable();
  }

  public login(userLogin:IUserLogin):Observable<User> {
    return this.httpClient.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Foodmine ${user.name}!`,
            'Login Successful'
          );
        },
        error: (errorResponse) => {
          console.log(errorResponse);
          this.toastrService.error(errorResponse.error.error.message, 'Login Failed');
        }
      })
    );
  }

  public logout():void {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user:User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage():User {
    const userJson = localStorage.getItem(USER_KEY);

    if(userJson) return JSON.parse(userJson) as User;

    return new User();
  }
}
