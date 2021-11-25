import { Component, OnInit, Type } from '@angular/core';
import { HttpServiceService } from '../../../service/http-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
interface News {
  newsid: number;
  title: string;
  press: string;
}
@Component({
  selector: 'app-newslist',
  templateUrl: './newslist.component.html',
  styleUrls: ['./newslist.component.css']
})
export class NewslistComponent implements OnInit {
  constructor(public http: HttpServiceService, private message: NzMessageService) { }
  public total;
  public url = 'web/n_list';
  public moreUrl = 'web/indexmore';
  public NewsList: News[] = [];
  public api: any = 'web/addSwiper';
  public delapi: any = 'web/DelNews';
  loading = true;
  searchValue = '';
  visible = false;
  pageIndex = 1;
  pageSize = 8;
  public loadingdatashow = true;



  listOfDisplayData = [...this.NewsList];

  ngOnInit(): void {
    this.datashow();

  }
  // tslint:disable-next-line:typedef
  datashow() {
    this.http.get(this.url).subscribe((data: any) => {
      this.NewsList = data;
      this.total = data.length;
      this.loadingdatashow = false;
      this.listOfDisplayData = [...this.NewsList];
    });
  }

  // tslint:disable-next-line:typedef
  deletenews(e) {
    console.log(e.newsid);
    this.http.DeleteByNewsid(this.delapi, e.newsid).subscribe((data: any) => {
      this.NewsList = data;
      this.listOfDisplayData = [...this.NewsList];
    }, (err) => {
      console.log(err);
    });

  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }


  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.NewsList.filter((item: News) => item.title.indexOf(this.searchValue) !== -1);
    console.log(this.listOfDisplayData);

  }
}
