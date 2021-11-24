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
  public total;
  public url = "web/index";
  public moreUrl = "web/indexmore";
  public NewsList: News[] = [];
  public api: any = "web/addSwiper";
  public delapi: any = "web/DelNews";
  loading = true;
  constructor(public http: HttpServiceService, private message: NzMessageService) { }
  searchValue = '';
  visible = false;
  pageIndex: number = 1;
  pageSize = 8;
  public loadingdatashow: boolean = true;

  ngOnInit(): void {
    this.datashow()

  }
  datashow() {
    this.http.get(this.url).subscribe((data: any) => {
      console.log(data[1][0].total);
      console.log(data.length);
      this.NewsList = data[0];
      this.total = data[1][0].total;
      this.loadingdatashow = false;
      this.listOfDisplayData = [...this.NewsList];
    })
  }

  deletenews(e) {
    console.log(e.newsid);
    this.http.DeleteByNewsid(this.delapi, e.newsid).subscribe((data) => {
      console.log(data);
      console.log(this.pageIndex);
      this.http.IndexMore(this.moreUrl, this.pageIndex).subscribe((data: any) => {
        console.log(data);
        this.loading = false;
        this.NewsList = data
        this.listOfDisplayData = [...this.NewsList];
      })
    }, (err) => {
      console.log(err);
    })

  }
  changePageIndex(pageIndex) {
    this.pageIndex = pageIndex;
    console.log(this.pageIndex);
    this.http.IndexMore(this.moreUrl, this.pageIndex).subscribe((data: any) => {
      console.log(data);
      this.loading = false;
      this.NewsList = data
      this.listOfDisplayData = [...this.NewsList];
    })
  }


  listOfDisplayData = [...this.NewsList];
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
