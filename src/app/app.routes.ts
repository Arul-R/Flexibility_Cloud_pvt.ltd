import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyJobsComponent } from './careers/careers.component';
import { JobViewComponent } from './job-view/job-view.component';
import { ApplicantFormComponent } from './application-form/application-form.component';
import { TrainingComponent } from './training/training.component';
import { ProjectComponent } from './projects/projects.component';
import { ViewApplicantsComponent } from './view-applications/view-applications.component';

export const routes: Routes = [
  { path: 'careers', component: MyJobsComponent },  // Route for MyJobsComponent
  { path: 'job-view/:id', component: JobViewComponent },  // Route for JobViewComponent with parameter
  { path: 'application-form/:id', component: ApplicantFormComponent},
  {path: 'application-form', component: ApplicantFormComponent},
  { path: 'training', component: TrainingComponent },
  { path: 'projects', component: ProjectComponent},
  { path: 'admin/applicants', component: ViewApplicantsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
