import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataDrivenComponent } from './formularios/data-driven/data-driven.component';
import { TemplateDrivenComponent } from './formularios/template-driven/template-driven.component';
import { FormsDeactivateGuard } from '../app/guards/form-deactivate.guard'

const routes: Routes = [
  {
    path: 'template-drive',
    component: TemplateDrivenComponent
  },
  {
    path: 'data-drive',
    component: DataDrivenComponent,
    canDeactivate: [FormsDeactivateGuard]
  },
  {
    path: '',
    redirectTo: 'template-drive',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
