import { Injectable, SimpleChange } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders,HttpInterceptor } from '@angular/common/http';
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

  removeImage(api:string, url:string) {
    return this.http.post(api, { "url": url });
  }

  autoLogin(api:string,token:string) {
    // @ts-ignore
    var setheaders:HttpHeaders=new Headers().set('Authorization',`Bearer ${token}`);

   return  this.http.post(api,token, { headers:setheaders});
  }

  get(api: any, ) {
    return this.http.get(api)
  }
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
  deletepinglunBynewsid(api, cid,newsid) {
    return this.http.post(api, { "cid": cid ,"newsid":newsid})
  }
}
