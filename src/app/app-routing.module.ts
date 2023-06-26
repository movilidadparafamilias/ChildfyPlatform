import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { Platform, NavController } from '@ionic/angular';
import { WelcomeGuardGuard } from './welcome-guard.guard';
import { ConnectionService } from './services/connection/connection.service';

const routes: Routes = [
  { path: "", redirectTo: "/welcome", pathMatch: "full" },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule),
    canActivate: [WelcomeGuardGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then(m => m.MessagesPageModule)
  },
  {
    path: 'clubs',
    loadChildren: () => import('./clubs/clubs.module').then(m => m.ClubsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'club-details',
    loadChildren: () => import('./club-details/club-details.module').then(m => m.ClubDetailsPageModule)
  },
  {
    path: 'trip-details',
    loadChildren: () => import('./trip-details/trip-details.module').then(m => m.TripDetailsPageModule)
  },
  {
    path: 'user-details',
    loadChildren: () => import('./user-details/user-details.module').then(m => m.UserDetailsPageModule)
  },
  {
    path: 'trip-request',
    loadChildren: () => import('./trip-request/trip-request.module').then(m => m.TripRequestPageModule)
  },
  {
    path: 'chat-details',
    loadChildren: () => import('./chat-details/chat-details.module').then(m => m.ChatDetailsPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then(m => m.InfoPageModule)
  },
  {
    path: 'myaddresses',
    loadChildren: () => import('./myaddresses/myaddresses.module').then(m => m.MyaddressesPageModule)
  },
  {
    path: 'myclubs',
    loadChildren: () => import('./myclubs/myclubs.module').then(m => m.MyclubsPageModule)
  },
  {
    path: 'mychildren',
    loadChildren: () => import('./mychildren/mychildren.module').then(m => m.MychildrenPageModule)
  },
  {
    path: 'myprofile',
    loadChildren: () => import('./myprofile/myprofile.module').then(m => m.MyprofilePageModule)
  },
  {
    path: 'mypayment',
    loadChildren: () => import('./mypayment/mypayment.module').then(m => m.MypaymentPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then(m => m.HelpPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: 'new-address',
    loadChildren: () => import('./new-address/new-address.module').then(m => m.NewAddressPageModule)
  },
  {
    path: 'new-children',
    loadChildren: () => import('./new-children/new-children.module').then(m => m.NewChildrenPageModule)
  },
  {
    path: 'join-trip',
    loadChildren: () => import('./join-trip/join-trip.module').then(m => m.JoinTripPageModule)
  },
  {
    path: 'review-doc',
    loadChildren: () => import('./review-doc/review-doc.module').then(m => m.ReviewDocPageModule)
  },
  {
    path: 'sign-doc',
    loadChildren: () => import('./sign-doc/sign-doc.module').then(m => m.SignDocPageModule)
  },
  {
    path: 'doc-data-input',
    loadChildren: () => import('./doc-data-input/doc-data-input.module').then(m => m.DocDataInputPageModule)
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./onboarding/onboarding.module').then(m => m.OnboardingPageModule)
  },
  {
    path: 'club-description',
    loadChildren: () => import('./club-description/club-description.module').then(m => m.ClubDescriptionPageModule)
  },
  {
    path: 'driver-doc-data-input',
    loadChildren: () => import('./driver-doc-data-input/driver-doc-data-input.module').then(m => m.DriverDocDataInputPageModule)
  },
  {
    path: 'my-car',
    loadChildren: () => import('./my-car/my-car.module').then(m => m.MyCarPageModule)
  },
  {
    path: 'mess-archive',
    loadChildren: () => import('./mess-archive/mess-archive.module').then(m => m.MessArchivePageModule)
  },
  {
    path: 'code-input',
    loadChildren: () => import('./code-input/code-input.module').then(m => m.CodeInputPageModule)
  },
  {
    path: 'pass-reset-request',
    loadChildren: () => import('./pass-reset-request/pass-reset-request.module').then(m => m.PassResetRequestPageModule)
  },
  {
    path: 'pass-reset-save',
    loadChildren: () => import('./pass-reset-save/pass-reset-save.module').then(m => m.PassResetSavePageModule)
  },
  {
    path: 'sugest-club',
    loadChildren: () => import('./sugest-club/sugest-club.module').then(m => m.SugestClubPageModule)
  },
  {
    path: 'club-code',
    loadChildren: () => import('./club-code/club-code.module').then(m => m.ClubCodePageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private platform: Platform, private router: Router, private conn: ConnectionService, private nav: NavController) {

    platform.ready().then(() => {

      this.conn.isParent().then((res) => {
        if (!res) {
          this.nav.navigateRoot('/tabs');
        }


      });

    })
  }

}
