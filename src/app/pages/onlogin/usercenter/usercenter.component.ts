import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../../service/http-service.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
@Component({
  selector: 'app-usercenter',
  templateUrl: './usercenter.component.html',
  styleUrls: ['./usercenter.component.css']
})
export class UsercenterComponent implements OnInit {
  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };
  userInfo: any;
  url = "web/changUserInfo";

  constructor(private fb: FormBuilder, public http: HttpServiceService, private message: NzMessageService, private router: Router) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      password: [null, [Validators.required]],
      tel: [null, [Validators.required]],
    });
    console.log(JSON.parse(sessionStorage.getItem('userInfo'))[0]);
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
  submitChange(e) {
    console.log(this.validateForm.value);
    this.http.changeUserInfo(this.url, this.userInfo[0].admin, this.validateForm.value.password, this.validateForm.value.tel).subscribe((data) => {
      console.log(data);
      this.message.create("success", `Change Success,Please login again`);

      this.router.navigate(['login']);
    }, (err) => {
      console.log(err);
    })

  }
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }
}
