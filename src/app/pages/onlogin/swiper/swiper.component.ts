import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../../service/http-service.service'
import { Router } from '@angular/router';
interface Swiper {
  Newsid: number;
  Title: string;
  Src: string;
}
@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.css']
})
export class SwiperComponent implements OnInit {
  public url = "web/s_list";
  public show: boolean = false;
  public SwiperList: Swiper[] = [];

  constructor(public http: HttpServiceService, public router: Router) { }

  ngOnInit() {
    this.datashow()
  }
  datashow() {
    this.http.get(this.url).subscribe((data: []) => {
      console.log(data);
      this.SwiperList = data;
      console.log(this.SwiperList);
      if (this.SwiperList == null) {
        this.show = true
      }
      else {
        this.show = false
      }
    })
  }
  Delete(e) {
    console.log("click");
    console.log(e.newsid);
    var that = this
    this.http.DeleteByNewsid(this.url, e.newsid).subscribe((data: []) => {
      console.log(data);
      that.SwiperList = data
    })
  }

}
