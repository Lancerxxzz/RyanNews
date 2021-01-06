import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../../service/http-service.service';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(public http: HttpServiceService) { }

  ngOnInit(): void {
  }


}
