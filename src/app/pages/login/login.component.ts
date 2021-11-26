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
  public autoApi='/web/authLogin';
  public forgetTag = false;
  submitForm(): void {
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
  forget() {
    this.forgetTag = true;
    this.message.create('warning', '请联系管理员Ryan');
  }


  ngAfterViewInit(){
    // @ts-ignore
    console.log('init');
    let token=localStorage.getItem('token')
    this.http.autoLogin(this.autoApi,token).subscribe(data=>{
      console.log(data)
    })
  }

  Login(e) {
    console.log(e.value);
    this.http.Confirmlogin(this.api, e.value.username, e.value.password).subscribe((data: any) => {
      console.log(data);
      if (data.status == 200) {
        this.router.navigate(['onlogin']);
        this.message.create('success', `Welcome ${this.validateForm.value.username}`);
        if (this.validateForm.value.remember) {
          sessionStorage.setItem('userInfo', JSON.stringify(data.userInfo));
          localStorage.setItem('token',data.token);
        }
      }
      else {
        this.message.create('error', '账号或密码错误');
      }
    }, (err) => {
      this.message.create('error', '服务器访问异常');
    });
  }

}
