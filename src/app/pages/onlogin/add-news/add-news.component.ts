import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { HttpServiceService } from '../../../service/http-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import {HttpClient, HttpRequest, HttpResponse} from '@angular/common/http';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import {filter} from 'rxjs/operators';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, public http: HttpServiceService,
              private msg: NzMessageService, private message: NzMessageService,
              private $http: HttpClient) { }

  isVisible = false;
  uploadStatus = false;
  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };
  public editModel = false;
  public data: any;
  public content: string;
  ImgSrc: any;
  addNewsUrl = 'http://localhost:3000/web/addNews';
  fileList: NzUploadFile[] = [];
  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],               // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],      // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }],          // outdent/indent
      [{ direction: 'rtl' }],                         // text directio
      [{ size: ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],                                         // remove formatting button
      ['link', 'image']                         // link and image, video
    ]
  };

  previewImage: string | undefined = '';
  previewVisible = false;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      simpletitle: [null, [Validators.required]],
      title: [null, [Validators.required]],
      inner: [null, [Validators.required]],
      content: [null, [Validators.required]],
      classifty: ['娱乐'],
      press: [null, [Validators.required]],
      status: ['0']
    });

  }
  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  // tslint:disable-next-line:typedef
  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    console.log(this.fileList[0]);
    return false;
  }
  // tslint:disable-next-line:typedef
  submitNews(e) {
    console.log(this.validateForm.value);
    if (this.validateForm.value.simpletitle == null && this.validateForm.value.title == null && this.validateForm.value.inner == null &&
      // tslint:disable-next-line:triple-equals
      this.validateForm.value.content == undefined  && this.validateForm.value.press == null){
      this.msg.warning('请检查新闻发布单');
    }else{
      const formData = new FormData();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.fileList.forEach((file: any) => {formData.append('img', file); });
      formData.append('title', this.validateForm.value.title);
      formData.append('simpletitle', this.validateForm.value.simpletitle);
      formData.append('inner', this.validateForm.value.inner);
      formData.append('content', this.validateForm.value.content);
      formData.append('press', this.validateForm.value.press);
      formData.append('classifty', this.validateForm.value.classifty);
      formData.append('status', this.validateForm.value.status);
      const req = new HttpRequest('POST', '/web/addNews', formData, {});
      // tslint:disable-next-line:no-shadowed-variable
      this.$http.request(req).pipe(filter(e => e instanceof HttpResponse)).subscribe(
        (data: any) => {
          console.log(data);
          // tslint:disable-next-line:triple-equals
          if (data.status == 200){
            this.fileList = [];
            this.validateForm.reset();
            this.msg.success('upload successfully.');
          }

        },
        () => {
          this.msg.error('upload failed.');
        }
      );
    }

  }
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    this.fileList = [];
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }
}
