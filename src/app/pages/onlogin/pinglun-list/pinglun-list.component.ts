import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../../service/http-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-pinglun-list',
  templateUrl: './pinglun-list.component.html',
  styleUrls: ['./pinglun-list.component.css']
})
export class PinglunListComponent implements OnInit {
  panels = [];
  show = false;
  data = [];
  constructor(public http: HttpServiceService, private message: NzMessageService) { }

  ngOnInit(): void {
    this.panelList()
  }
  getpl(e) {

    console.log(e);
    this.http.getplBynewsid('web/getplcontent', e[0].newsid).subscribe((data: any) => {
      console.log(data)
      this.data = data;
      this.show = true;
    })
  }
  panelList() {
    this.http.getpinglunnewsid('web/c_list').subscribe((data: any) => {
      console.log(data);
      this.panels = data;
    })
  }
  edit(e) {
    console.log(e);
    this.http.deletepinglunBynewsid('web/deletepl', e.cid,e.newsid).subscribe((data: any) => {
      console.log(data)
      this.message.create("success", `delete success`);
      this.data=data;
    })
  }
  onClick() { }
}
