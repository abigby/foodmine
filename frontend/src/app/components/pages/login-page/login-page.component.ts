import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public loginForm!:FormGroup;
  public isSubmitted:boolean = false;
  public returnUrl:string = '';

  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) { }

  public ngOnInit():void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get getFormCon():any {
    return this.loginForm.controls;
  }

  public submit():void {
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;

    this.userService.login({
      email: this.getFormCon.email.value,
      password: this.getFormCon.password.value
    }).subscribe(()=> {
      this.router.navigateByUrl(this.returnUrl);
    });


  }

}
