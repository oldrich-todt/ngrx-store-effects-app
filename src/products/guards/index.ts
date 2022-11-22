import { PizzaExists } from "./pizza-exists.guard";
import { PizzasGuard } from "./pizzas.guard";
import { ToppingsGuard } from "./toppings.guard";

export const guards: any[] = [PizzasGuard, PizzaExists, ToppingsGuard];

export * from "./pizzas.guard";
export * from "./pizza-exists.guard";
export * from "./toppings.guard";
