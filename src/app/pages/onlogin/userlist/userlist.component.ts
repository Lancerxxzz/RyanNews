import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../../service/http-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
interface User {
  uid: number;
  username: string;
  password: string;
}
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  constructor(public http: HttpServiceService, private message: NzMessageService) { }
  public url = 'web/u_list';
  public users: User[] = [];
  ngOnInit(): void {
    this.pageshow();
  }
  // tslint:disable-next-line:typedef
  pageshow() {
    this.http.get(this.url).subscribe((data: []) => {
      this.users = data;
      console.log(data);
    });
  }
  // tslint:disable-next-line:typedef
  Delete(e) {
    console.log(e.uid);
    if (e.uid == 1) {
      this.message.create('error', `最终管理员不能被删除`);
    }
    else {
      this.http.DeleteUser('/web/deleteUser', e.uid).subscribe((data: any) => {
        if (data.status == 200) {
          this.pageshow();
          this.message.create('success', `操作成功`);
        }
      }, (err) => {
        console.log(err);
      });
    }
  }
}
