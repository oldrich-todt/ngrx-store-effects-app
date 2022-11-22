import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from "@angular/router";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/observable";
import { of } from "rxjs/observable/of";
import { tap, filter, take, switchMap, catchError, map } from "rxjs/operators";

import * as fromStore from "../store";

import { Pizza } from "../models/pizza.model";

@Injectable()
export class PizzaExists implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = parseInt(route.params.pizzaId, 10);
        return this.hasPizza(id);
      })
    );
  }

  hasPizza(id: number): Observable<boolean> {
    return this.store.select(fromStore.getPizzaEntities).pipe(
      map((entities: { [id: number]: Pizza }) => !!entities[id]),
      take(1)
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getPizzasLoaded).pipe(
      tap((loaded) => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadPizzas());
        }
      }),
      filter((loaded) => loaded),
      take(1)
    );
  }
}
