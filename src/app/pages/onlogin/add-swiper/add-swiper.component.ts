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
  public url = 'web/imgNews';
  public swiperlist: [];
  public api: any = 'web/addSwiper';
  constructor(public http: HttpServiceService, private msg: NzMessageService) { }

  ngOnInit(): void {
    this.datashow();
  }
  // tslint:disable-next-line:typedef
  datashow() {
    this.http.get(this.url).subscribe((data: []) => {
      console.log(data);
      this.swiperlist = data;
    });
  }
  // tslint:disable-next-line:typedef
  AddToSwiper(e) {
    console.log(e.newsid);
    this.http.selectNewslistIntoSwiper(this.api, e.newsid).subscribe((data) => {
      // tslint:disable-next-line:triple-equals
      if (data.msg == 'success'){
        this.msg.create('success', ` Select As Swiper successed`);
      }else {
        this.msg.create('error', ` This has been existed`);
      }
    });
  }

}
