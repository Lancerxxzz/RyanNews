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
    this.http.getplBynewsid('zorro/getplcontent', e.newsid).subscribe((data: any) => {
      this.data = data;
      console.log(data);
      this.show = true
    })
  }
  panelList() {
    this.http.getpinglunnewsid('zorro/pllist').subscribe((data: any) => {
      console.log(data);
      this.panels = data
    })
  }
  edit(e) {

    console.log(e);
    this.http.deletepinglunBynewsid('zorro/deletepl', e.newsid, e.nickname, e.content).subscribe((data: any) => {
      if (data.status == 200) {
        this.message.create("success", `delete success`);
        this.http.getplBynewsid('zorro/getplcontent', e.newsid).subscribe((data: any) => {
          this.data = data;
        })
      }
    })
  }
  onClick() { }
}
