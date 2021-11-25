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
  public url = "web/u_list";
  public userlist: User[] = [];
  ngOnInit(): void {
    this.pageshow();
  }
  pageshow() {
    this.http.get(this.url).subscribe((data: []) => {
      this.userlist = data
      console.log(data);
    })
  }
  Delete(e) {
    console.log(e.aid);
    if (e.aid == 1) {
      this.message.create("error", `最终管理员不能被删除`);
    }
    else {
      this.http.DeleteUser("/web/deleteUser", e.aid).subscribe((data: any) => {
        if (data.status == 200) {
          this.pageshow();
          this.message.create("success", `操作成功`);
        }
      })
    }
  }
}
