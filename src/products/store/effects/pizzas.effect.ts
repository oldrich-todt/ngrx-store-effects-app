import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { map, switchMap, catchError } from "rxjs/operators";

import * as fromRoot from "../../../app/store";
import * as pizzaActions from "../actions/pizzas.action";
import * as fromServices from "../../services";

@Injectable()
export class PizzasEffects {
  constructor(
    private actions$: Actions,
    private pizzaService: fromServices.PizzasService
  ) {}

  @Effect()
  loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS).pipe(
    switchMap(() => {
      return this.pizzaService.getPizzas().pipe(
        map((pizzas) => new pizzaActions.LoadPizzasSuccess(pizzas)),
        catchError((error) => of(new pizzaActions.LoadPizzasFail(error)))
      );
    })
  );

  @Effect()
  createPizza$ = this.actions$.ofType(pizzaActions.CREATE_PIZZA).pipe(
    map((action: pizzaActions.CreatePizza) => action.payload),
    switchMap((payload) => {
      return this.pizzaService.createPizza(payload).pipe(
        map((pizza) => new pizzaActions.CreatePizzaSuccess(pizza)),
        catchError((error) => of(new pizzaActions.CreatePizzaFail(error)))
      );
    })
  );

  @Effect()
  updatePizza$ = this.actions$.ofType(pizzaActions.UPDATE_PIZZA).pipe(
    map((action: pizzaActions.UpdatePizza) => action.payload),
    switchMap((payload) => {
      return this.pizzaService.updatePizza(payload).pipe(
        map((pizza) => new pizzaActions.UpdatePizzaSuccess(pizza)),
        catchError((error) => of(new pizzaActions.UpdatePizzaFail(error)))
      );
    })
  );

  @Effect()
  removePizza$ = this.actions$.ofType(pizzaActions.REMOVE_PIZZA).pipe(
    map((action: pizzaActions.RemovePizza) => action.payload),
    switchMap((payload) => {
      return this.pizzaService.removePizza(payload).pipe(
        map((pizza) => new pizzaActions.RemovePizzaSuccess(payload)),
        catchError((error) => of(new pizzaActions.RemovePizzaFail(error)))
      );
    })
  );

  @Effect()
  createPizzaSuccess$ = this.actions$
    .ofType(pizzaActions.CREATE_PIZZA_SUCCESS)
    .pipe(
      map((action: pizzaActions.CreatePizzaSuccess) => action.payload),
      map(
        (pizza) =>
          new fromRoot.Go({
            path: ["/products", pizza.id],
          })
      )
    );

  @Effect()
  removePizzaSuccess$ = this.actions$
    .ofType(
      pizzaActions.REMOVE_PIZZA_SUCCESS,
      pizzaActions.UPDATE_PIZZA_SUCCESS
    )
    .pipe(
      map(
        (_) =>
          new fromRoot.Go({
            path: ["/products"],
          })
      )
    );
}
