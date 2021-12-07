import { Injectable, SimpleChange } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {NzUploadFile} from 'ng-zorro-antd/upload';

interface NewsEntity{
  title: string;
  simpletitle: string;
  content: string;
  inner: string;
  status: string;
  press: string;
  tag: string;
  classifty: string;
}

@Injectable({
  providedIn: 'root'
})


export class HttpServiceService {
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  Confirmlogin(api: any, username: any, password: any) {
    return this.http.post(api, { username,  password });
  }

  // tslint:disable-next-line:typedef
  removeImage(api: string, url: string) {
    return this.http.post(api, {  url });
  }

  // tslint:disable-next-line:typedef
  autoLogin(api: string, token: string) {
    // @ts-ignore
    const setheaders: HttpHeaders = new Headers().append('Authorization', `Bearer ${token}`);

    return  this.http.post(api, token, { headers: setheaders});
  }

  // tslint:disable-next-line:typedef
  get(api: any, ) {
    return this.http.get(api);
  }

  // tslint:disable-next-line:typedef ban-types
  DeleteByNewsid(api: any, newsid: String) {

    return this.http.post(api, {  newsid });
  }

  // tslint:disable-next-line:typedef no-shadowed-variable
  InputNewsToNewslist(api: any, NewsEntity: any) {

    return this.http.post(api, { NewsEntity});
  }

  // tslint:disable-next-line:typedef
  selectNewslistIntoSwiper(api: any, newsid: any) {

    return this.http.post(api, {  newsid });
  }


  // tslint:disable-next-line:typedef
  changeUserInfo(api: any, admin: any, password: any, tel: any) {

    return this.http.post(api, {  admin,  password,  tel });
  }
  // tslint:disable-next-line:typedef
  postImage(api: any, file: any) {
    return this.http.post(api, file);
  }
  // tslint:disable-next-line:typedef
  register(api: any, username, password, email, tel) {
    return this.http.post(api, {
      username,  password,  email,  tel
    });
  }
  // tslint:disable-next-line:typedef
  GetRegister(api) {
    return this.http.get(api);
  }
  // tslint:disable-next-line:typedef
  confirmRegister(api, admin, password, email, tel) {
    return this.http.post(api, {
       admin,  password,  email,  tel
    });
  }
  // tslint:disable-next-line:typedef
  DeleteUser(api, aid) {
    return this.http.post(api, {  aid });
  }
  // tslint:disable-next-line:typedef
  getpinglunnewsid(api) {
    return this.http.get(api);
  }
  // tslint:disable-next-line:typedef
  getplBynewsid(api, newsid) {
    return this.http.post(api, {  newsid });
  }
  // tslint:disable-next-line:typedef
  deletepinglunBynewsid(api, cid, newsid) {
    return this.http.post(api, {  cid ,  newsid});
  }
}
