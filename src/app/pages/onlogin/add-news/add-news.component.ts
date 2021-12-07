import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { HttpServiceService } from '../../../service/http-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { NzUploadFile } from 'ng-zorro-antd/upload';

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
  constructor(private fb: FormBuilder, public http: HttpServiceService, private msg: NzMessageService, private message: NzMessageService) { }

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
      status: ['0'],
    });

  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  // tslint:disable-next-line:typedef
  upLoadChange(event) {
    console.log(event);
    // tslint:disable-next-line:triple-equals
    if (event.type == 'success') {
      console.log(event.file.response.url);
      this.ImgSrc = event.file.response.url;
    }
    // tslint:disable-next-line:triple-equals
    if (event.type == 'removed') {
      console.log('removed');
      this.http.removeImage('/web/removeImage', this.ImgSrc).subscribe((data) => {
        console.log(data);
        this.fileList = [];
        this.ImgSrc = null;
      });
    }
  }
  // tslint:disable-next-line:typedef
  submitNews(e) {

    // console.log(this.validateForm.value);
    //   // tslint:disable-next-line:max-line-length
    // if (this.validateForm.value.simpletitle != null && this.validateForm.value.title != null && this.validateForm.value.inner != null && this.validateForm.value.content != null && this.validateForm.value.title != null && this.validateForm.value.press != null && this.validateForm.value.status != null) {
    //     // tslint:disable-next-line:max-line-length
    //     this.http.InputNewsToNewslist('/web/addNews', this.validateForm).subscribe((data: any) => {
    //       console.log(data);
    //       // tslint:disable-next-line:triple-equals
    //       if (data.status == 200) {
    //         this.message.create('success', `Submit success`);
    //         this.validateForm.reset();
    //         console.log(this.fileList);
    //         this.ImgSrc = null;
    //         this.fileList = [];
    //       } else {
    //         this.message.create('error', `请检查新闻表单`);
    //       }
    //     }, (err) => {
    //       console.log(err);
    //       this.message.create('error', `请检查新闻表单`);
    //     });
    //   }
    //   else {
    //     this.message.create('error', `required can't be null`);
    //   }
  this.isVisible=true;
  }
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    this.fileList = [];
    this.ImgSrc = null;
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }
  handleChange(info: NzUploadChangeParam): void {
    console.log(this.fileList);
    if (info.file.status !== 'uploading') {
      console.log(info.fileList[0].thumbUrl);
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }
  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file.preview) {
      // tslint:disable-next-line:no-non-null-assertion
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
