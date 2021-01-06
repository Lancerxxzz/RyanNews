import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { HttpServiceService } from '../../../service/http-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {

  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };
  public editModel: boolean = false;
  public data: any;
  public content: string;
  Url = "/zorro/uploadImage";
  ImgSrc: any;
  fileList1: NzUploadFile[] = [];
  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text directio
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],                                         // remove formatting button
      ['link', 'image']                         // link and image, video
    ]
  };

  constructor(private fb: FormBuilder, public http: HttpServiceService, private msg: NzMessageService, private message: NzMessageService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      simpletitle: [null, [Validators.required]],
      title: [null, [Validators.required]],
      inner: [null, [Validators.required]],
      content: [null, [Validators.required]],
      classify: ['娱乐'],
      tag: [null, [Validators.required]],
      press: [null, [Validators.required]],
      status: ['0'],
    });

  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  upLoadChange(event) {
    console.log(event);
    if (event.type == 'success') {
      console.log(event.file.response.url);
      this.ImgSrc = event.file.response.url;
    }
    if (event.type == 'removed') {
      console.log("removed");
      this.http.removeImage("/zorro/removeImage", this.ImgSrc).subscribe((data) => {
        console.log(data);
        this.fileList1 = [];
        this.ImgSrc = null;
      })
    }
  }
  submitNews(e) {
    console.log(this.ImgSrc);
    console.log(this.validateForm.value);
    if (this.ImgSrc == null && this.validateForm.value.tag != null) {
      this.message.create("error", "若无照片则不能添加标签");
    }
    else {
      if (this.validateForm.value.simpletitle != null && this.validateForm.value.title != null && this.validateForm.value.inner != null && this.validateForm.value.content != null && this.validateForm.value.title != null && this.validateForm.value.press != null && this.validateForm.value.status != null) {
        this.http.InputNewsToNewslist("/zorro/addNews", this.validateForm.value.simpletitle, this.validateForm.value.title, this.validateForm.value.inner, this.validateForm.value.content, this.validateForm.value.classify, this.validateForm.value.tag, this.ImgSrc, this.validateForm.value.press, this.validateForm.value.status).subscribe((data: any) => {
          console.log(data);
          if (data.status == 200) {
            this.message.create("success", `Submit success`);
            this.validateForm.reset();
            console.log(this.fileList1);
            this.ImgSrc = null;
            this.fileList1 = [];
          } else {
            this.message.create("error", `请检查新闻表单`);
          }
        }, (err) => {
          console.log(err);
          this.message.create("error", `请检查新闻表单`);
        })
      }
      else {
        this.message.create("error", `required can't be null`);
      }
    }
  }
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    this.fileList1 = [];
    this.ImgSrc = null;
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }
  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }


}
