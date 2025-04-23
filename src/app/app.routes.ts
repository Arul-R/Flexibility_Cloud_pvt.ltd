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

export const routes: Routes = [
  { path: '',component: HomepageComponent},
  { path: 'careers', component: MyJobsComponent },  // Route for MyJobsComponent
  { path: 'job-view/:id', component: JobViewComponent },  // Route for JobViewComponent with parameter
  { path: 'application-form/:id', component: ApplicantFormComponent},
  {path: 'application-form', component: ApplicantFormComponent},
  { path: 'training', component: TrainingComponent },
  { path: 'projects', component: ProjectComponent},
  { path: 'admin/applicants', component: ViewApplicantsComponent},
  { path: 'admin/enquiries', component: ViewEnquiryComponent },
  { path: 'enquiry-form/:service', component: EnquiryFormComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
