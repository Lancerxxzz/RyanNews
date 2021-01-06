import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageModule } from 'ng-zorro-antd/message';
@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    NzLayoutModule,
    RegisterRoutingModule,
    NzFormModule,
    NzInputModule,
    FormsModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzCheckboxModule,
    NzMessageModule,
    NzAffixModule
  ],
  exports: [RegisterComponent]
})
export class RegisterModule { }
