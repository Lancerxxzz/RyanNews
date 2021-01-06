import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnloginComponent } from '../onlogin/onlogin.component';
import { NewslistComponent } from './newslist/newslist.component'
import { SwiperComponent } from './swiper/swiper.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { AddSwiperComponent } from './add-swiper/add-swiper.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UsercenterComponent } from './usercenter/usercenter.component';
import { PinglunListComponent } from './pinglun-list/pinglun-list.component'
import { from } from 'rxjs';
const routes: Routes = [
  {
    path: '', component: OnloginComponent,
    children: [
      { path: 'newslist', component: NewslistComponent },
      { path: 'swiper', component: SwiperComponent },
      { path: 'addNews', component: AddNewsComponent },
      { path: 'addSwiper', component: AddSwiperComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'userlist', component: UserlistComponent },
      { path: 'userlist/usercenter', component: UsercenterComponent },
      { path: 'pinglun', component: PinglunListComponent },
      { path: '**', redirectTo: 'welcome' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnloginRoutingModule { }
