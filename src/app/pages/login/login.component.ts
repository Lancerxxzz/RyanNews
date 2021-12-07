import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from '../../service/http-service.service';

import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, public http: HttpServiceService, private message: NzMessageService) { }
  validateForm!: FormGroup;
  public api: any = '/web/login';
  public autoApi = '/web/authLogin';
  public forgetTag = false;
  public disabled = false;
  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
  // tslint:disable-next-line:typedef
  forget() {
    this.forgetTag = true;
    this.message.create('warning', '请联系管理员Ryan');
  }

  // // tslint:disable-next-line:typedef
  // ngAfterViewInit(){
  //   // @ts-ignore
  //   console.log('init');
  //   // tslint:disable-next-line:typedef
  //   const token = localStorage.getItem('token');
  //   this.http.autoLogin(this.autoApi, token).subscribe(data => {
  //     console.log(data)
  //   })
  // }

  // tslint:disable-next-line:typedef
  Login(e) {
    this.disabled = true;
    this.http.Confirmlogin(this.api, e.value.username, e.value.password).subscribe((data: any) => {
      // tslint:disable-next-line:triple-equals

      // tslint:disable-next-line:triple-equals
      if (data.status == 200) {
        this.disabled = false;
        this.message.create('success', `Welcome ${this.validateForm.value.username}`);
        if (this.validateForm.value.remember) {
          this.router.navigate(['onlogin']);
          sessionStorage.setItem('userInfo', JSON.stringify(data.userInfo));
          localStorage.setItem('token', data.token);

        }
      }
      // tslint:disable-next-line:triple-equals
      else  if (data.status == 400) {
        this.message.create('error', '账号或密码错误');
        this.disabled = false;
      }
    }, (err) => {
      console.log(err);
      this.message.create('error', '服务器访问异常');
      this.disabled = false;
    });
  }

}
