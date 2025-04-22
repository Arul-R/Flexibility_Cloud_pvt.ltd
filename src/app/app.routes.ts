import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyJobsComponent } from './careers/careers.component';
import { JobViewComponent } from './job-view/job-view.component';
import { ApplicantFormComponent } from './application-form/application-form.component';
import { TrainingComponent } from './training/training.component';
import { ProjectComponent } from './projects/projects.component';

export const routes: Routes = [
  { path: '', component: MyJobsComponent },  // Route for MyJobsComponent
  { path: 'job-view/:id', component: JobViewComponent },  // Route for JobViewComponent with parameter
  { path: 'application-form/:id', component: ApplicantFormComponent},
  {path: 'application-form', component: ApplicantFormComponent},
  { path: 'training', component: TrainingComponent },
  { path: 'projects', component: ProjectComponent}
  // { path: 'my-jobs', component: MyJobsComponent },
//   {
//     path: 'job-view/:jobId',
//     component: JobViewComponent,
//     children: [
//         {
//             path: 'apply',
//             component: ApplicantFormComponent
//         }
//     ]
// }
// ,
];




// export const routes: Routes = [
//   // { path: '', component: MyJobsComponent },  // Route for MyJobsComponent

//   // Route for JobViewComponent with parameter
//   { path: 'my-jobs', component: MyJobsComponent, children:[  
//     { path: 'job-view/:id', component: JobViewComponent,children:[  
//       { path: 'application-form/:id', component: ApplicantFormComponent}
//         ] 
//     }] 
//   },
// ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
