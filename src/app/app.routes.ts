import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/user-components/home-page/home-page.component';
import { MyJobsComponent } from './components/user-components/careers/careers.component';
import { JobViewComponent } from './components/user-components/job-view/job-view.component';
import { ApplicantFormComponent } from './components/user-components/application-form/application-form.component';
import { TrainingComponent } from './components/user-components/training/training.component';
import { ProjectComponent } from './components/user-components/projects/projects.component';
import { ViewApplicantsComponent } from './components/admin-components/view-applications/view-applications.component';
import { EnquiryFormComponent } from './components/user-components/enquiry-form/enquiry-form.component';
import { ViewEnquiryComponent } from './components/admin-components/view-enquiries/view-enquiries.component';
import { AdminAuthGuard } from './admin-auth.guard';
import { AdminSignupComponent } from './components/admin-components/admin-signup/admin-signup.component';
import { AdminLoginComponent } from './components/admin-components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-components/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: '',component: HomepageComponent},
  { path: 'careers', component: MyJobsComponent },  // Route for MyJobsComponent
  { path: 'job-view/:id', component: JobViewComponent },  // Route for JobViewComponent with parameter
  { path: 'application-form/:id', component: ApplicantFormComponent},
  { path: 'application-form', component: ApplicantFormComponent},
  { path: 'training', component: TrainingComponent },
  { path: 'projects', component: ProjectComponent},

  { path: 'admin/applicants', component: ViewApplicantsComponent},
  { path: 'admin/enquiries', component: ViewEnquiryComponent},
  { path: 'enquiry-form/:service', component: EnquiryFormComponent},
  { path: 'enquiry-form', component: EnquiryFormComponent},


  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-signup', component: AdminSignupComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
