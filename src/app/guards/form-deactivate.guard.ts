import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataDrivenComponent } from "../formularios/data-driven/data-driven.component";

@Injectable({
  providedIn: 'root'
})

export class FormsDeactivateGuard implements CanDeactivate<DataDrivenComponent> {

  constructor() {}

  canDeactivate(
    component: DataDrivenComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
  ): Observable<boolean> | boolean
    {
      if (component.formDD.dirty) {
        let mudaRota = confirm('Os dados preenchidos serão perdidos, deseja realmente sair?')
        return mudaRota ? true : false

      }
      return true
    }
}
