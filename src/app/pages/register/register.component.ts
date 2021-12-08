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
  confirm = false;

  offsetTop = 10;

  submitForm(): void {
    // tslint:disable-next-line:forin
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
      username: [null, [Validators.required]],
      tel: [null, [Validators.required]],
      agree: [true]
    });
  }
  // tslint:disable-next-line:typedef
  register(e) {
    console.log(e.value);
    // tslint:disable-next-line:triple-equals
    if (e.value.password == e.value.checkPassword) {
      this.http.register('/web/register', e.value.username, e.value.password, e.value.email, e.value.tel).subscribe((data: any) => {
        console.log(data);
        // tslint:disable-next-line:triple-equals
        if (data.status == 200) {
          this.message.create('success', '注册成功，欢迎使用');
          this.router.navigate(['/login']);
        }else {
          this.message.create('warning', '用户名或邮箱已存在');
        }
      }, (err) => {
        this.message.create('error', '服务器连接出错');
        console.log(err);
      });
    }
    else {
      this.message.create('error', '请检查表单');
    }
  }
  // tslint:disable-next-line:typedef
  back() {
    this.router.navigate(['/login']);
  }

}
