import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { HttpServiceService } from '../../service/http-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };
  confirm: boolean = false;

  offsetTop = 10;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      this.confirm = true;
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };



  constructor(private fb: FormBuilder, public http: HttpServiceService, private message: NzMessageService, public router: Router) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      admin: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      agree: [true]
    });
  }
  register(e) {
    console.log(e.value);
    if (e.value.password == e.value.checkPassword) {
      this.http.register('/web/register', e.value.admin, e.value.password, e.value.email, e.value.phoneNumber).subscribe((data: any) => {
        console.log(data);
        if (data.status == 200) {
          this.message.create("success", "等待管理员通过")
          this.router.navigate(["/login"])
        }
      }, (err) => {
        this.message.create("error", "用户名已存在")
      })
    }
    else {
      this.message.create("warning", "请检查注册表")
    }
  }
  back() {
    this.router.navigate(['/login'])
  }

}
