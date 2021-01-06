import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnloginRoutingModule } from './onlogin-routing.module';
import { OnloginComponent } from '../onlogin/onlogin.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NewslistComponent } from './newslist/newslist.component';
import { SwiperComponent } from './swiper/swiper.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AddSwiperComponent } from './add-swiper/add-swiper.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms'
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { WelcomeComponent } from './welcome/welcome.component';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { UserlistComponent } from './userlist/userlist.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { UsercenterComponent } from './usercenter/usercenter.component';
import { FormsModule } from '@angular/forms';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { QuillModule } from 'ngx-quill';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { PinglunListComponent } from './pinglun-list/pinglun-list.component';
@NgModule({
  declarations: [OnloginComponent, NewslistComponent, SwiperComponent, AddSwiperComponent, AddNewsComponent, WelcomeComponent, UserlistComponent, UsercenterComponent, PinglunListComponent],
  imports: [
    CommonModule,
    OnloginRoutingModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzMenuModule,
    NzListModule,
    NzTableModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    NzFormModule,
    NzPaginationModule,
    NzTabsModule,
    NzDropDownModule,
    NzStatisticModule,
    NzMessageModule,
    NzUploadModule,
    NzDrawerModule,
    NzModalModule,
    FormsModule,
    NzStepsModule,
    NzResultModule,
    NzProgressModule,
    NzDescriptionsModule,
    NzBadgeModule,
    NzDividerModule,
    NzPopoverModule,
    NzSpinModule,
    QuillModule.forRoot(),
    NzCollapseModule
  ],
  exports: [OnloginComponent]
})
export class OnloginModule { }
