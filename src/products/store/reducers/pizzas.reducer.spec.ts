import * as fromPizzas from "./pizzas.reducer";
import * as fromActions from "../actions/pizzas.action";
import { Pizza } from "../../models/pizza.model";

describe("PizzasReducer", () => {
  describe("undefined action", () => {
    it("should return the default state", () => {
      const { initialState } = fromPizzas;
      const action = {} as any;
      const state = fromPizzas.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });
  describe("LOAD_PIZZAS action", () => {
    it("should set loading to true", () => {
      const { initialState } = fromPizzas;
      const action = new fromActions.LoadPizzas();

      const state = fromPizzas.reducer(initialState, action);

      expect(state.entities).toEqual({});
      expect(state.loading).toEqual(true);
      expect(state.loaded).toEqual(false);
    });
  });

  describe("LOAD_PIZZAS_SUCCESS action", () => {
    it("should map an array to entities", () => {
      const { initialState } = fromPizzas;
      const action = new fromActions.LoadPizzasSuccess([
        {
          name: "Blazin' Inferno",
          toppings: [],
          id: 1,
        },
      ]);

      const state = fromPizzas.reducer(initialState, action);

      expect(state.entities).toEqual({
        1: {
          name: "Blazin' Inferno",
          toppings: [],
          id: 1,
        },
      });
      expect(state.loading).toEqual(false);
      expect(state.loaded).toEqual(true);
    });
  });
});
