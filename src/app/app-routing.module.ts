import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataDrivenComponent } from './formularios/data-driven/data-driven.component';
import { TemplateDrivenComponent } from './formularios/template-driven/template-driven.component';
import { FormsDeactivateGuard } from '../app/guards/form-deactivate.guard'
import { CadastroContatoComponent } from './formularios/cadastro-contato/cadastro-contato.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'data-drive',
    pathMatch: 'full'
  },
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
    path: 'cadastro',
    component: CadastroContatoComponent,
    // canDeactivate: [FormsDeactivateGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
