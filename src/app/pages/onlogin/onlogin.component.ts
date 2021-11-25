import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpServiceService } from '../../service/http-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-onlogin',
  templateUrl: './onlogin.component.html',
  styleUrls: ['./onlogin.component.css']
})
export class OnloginComponent implements OnInit {
  constructor(private router: Router, private location: Location, public http: HttpServiceService, private message: NzMessageService) { }
  isCollapsed = false;
  visible = false;
  isVisible = false;
  loginOut = false;
  index: number;
  userInfo: any;
  src: any = 'https://api.ryannews.club/wxcode.jpg';
  data = [];

  ngOnInit(): void {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

  }
  tabClick(e) {
    switch (e) {
      case 0:
        console.log('msgCenter');
        this.msgCenter();
        this.visible = true;
        break;
      case 1:
        console.log('体验二维码');
        this.isVisible = true;
        break;
      case 2:
        console.log('UserCenter');
        break;
      case 3:
        console.log('exit system');
        this.loginOut = true;
        break;
      default:
        break;
    }
  }

  msgCenter() {
    this.http.GetRegister('/web/getregister').subscribe((data: any) => {
      this.data = data;
      console.log(data);
    });
  }
  // tslint:disable-next-line:typedef
  confirmRegister(e) {
    const user: any = JSON.parse(sessionStorage.getItem('userInfo'));
    if (user[0].aid == 1) {
      this.http.confirmRegister('/web/confirmRegister', e.admin, e.password, e.email, e.tel).subscribe((data) => {
        console.log(data);
        this.msgCenter();
        this.message.create('success', '操作成功');
      });
    }
    else {
      this.message.create('error', '当前用户没有权限操作');
    }
  }


  close(): void {
    this.visible = false;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.loginOut = false;
    this.isVisible = false;
  }
  ConfirmExit(): void {
    this.loginOut = false;
    this.router.navigate(['login']).then(() => {
      sessionStorage.removeItem('userInfo');
      this.message.create('success', '成功退出系统');
    });
  }

}
