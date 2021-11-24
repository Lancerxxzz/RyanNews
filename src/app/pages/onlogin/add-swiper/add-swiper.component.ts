import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../../service/http-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
interface News {
  newsid: number;
  title: string;
  img: string;
}
@Component({
  selector: 'app-add-swiper',
  templateUrl: './add-swiper.component.html',
  styleUrls: ['./add-swiper.component.css']
})
export class AddSwiperComponent implements OnInit {
  public NewsList: News[] = [];
  public url = "web/alternativeSwiper";
  public newslist: any;
  public api: any = "web/addSwiper";
  constructor(public http: HttpServiceService, private msg: NzMessageService) { }

  ngOnInit(): void {
    this.datashow()
  }
  datashow() {
    this.http.get(this.url).subscribe((data: []) => {
      console.log(data);
      this.newslist = data
    })
  }
  AddToSwiper(e) {
    console.log(e.newsid);
    this.http.selectNewslistIntoSwiper(this.api, e.newsid).subscribe((data) => {
      console.log(data);
      this.msg.create("success", ` Select As Swiper successed`);
    }, (err) => {
      this.msg.create("error", ` This has been existed`);
    })
  }

}
