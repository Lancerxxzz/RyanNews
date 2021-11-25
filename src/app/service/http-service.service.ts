import { Injectable, SimpleChange } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailValidator } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  constructor(private http: HttpClient) { }

  Confirmlogin(api: any, admin: any, password: any) {
    return this.http.post(api, { "username": admin, "password": password });
  }

  removeImage(api, url) {
    return this.http.post(api, { "url": url });
  }


  get(api: any, ) {
    return this.http.get(api)
  }

  // IndexMore(api: any, page: any) {
  //
  //   return this.http.post(api, { "pageIndex": page })
  // }
  DeleteByNewsid(api: any, newsid: String) {

    return this.http.post(api, { "newsid": newsid });
  }
  InputNewsToNewslist(api: any, simple: any, title, inner, content, classify, tag, img, press, status) {

    return this.http.post(api, { "simpletitle": simple, "title": title, "inner": inner, "content": content, "classify": classify, "tag": tag, "img": img, "press": press, "status": status })
  }

  selectNewslistIntoSwiper(api: any, newsid: any) {

    return this.http.post(api, { "newsid": newsid })
  }


  changeUserInfo(api: any, admin: any, password: any, tel: any) {

    return this.http.post(api, { "admin": admin, "password": password, "tel": tel })
  }
  postImage(api: any, file: any) {
    return this.http.post(api, file)
  }
  register(api: any, admin, password, email, tel) {
    return this.http.post(api, {
      "admin": admin, "password": password, "email": email, "tel": tel
    })
  }
  GetRegister(api) {
    return this.http.get(api)
  }
  confirmRegister(api, admin, password, email, tel) {
    return this.http.post(api, {
      "admin": admin, "password": password, "email": email, "tel": tel
    })
  }
  DeleteUser(api, aid) {
    return this.http.post(api, { "aid": aid })
  }
  getpinglunnewsid(api) {
    return this.http.get(api)
  }
  getplBynewsid(api, newsid) {
    return this.http.post(api, { "newsid": newsid })
  }
  deletepinglunBynewsid(api, newsid, nickname, content) {
    return this.http.post(api, { "newsid": newsid, "nickname": nickname, "content": content })
  }
}
