import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './components/auth/auth.guard';
import { AuthComponent } from './components/auth/auth.component';


const routes: Routes = [
  {
    path:'home',component:HomeComponent,
    canActivate :[AuthGuard]
  },
  {
    path:'auth',component:AuthComponent
  },
  {
    path:'',redirectTo:'home',pathMatch:'full'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
