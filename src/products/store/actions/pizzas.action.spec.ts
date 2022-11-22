import * as fromPizzas from "./pizzas.action";

describe("Pizzas Actions", () => {
  describe("LoadPizzas Actions", () => {
    describe("LoadPizzas", () => {
      it("should create an action", () => {
        const action = new fromPizzas.LoadPizzas();

        expect({ ...action }).toEqual({
          type: "[Products] Load Pizzas",
        });
      });
    });

    describe("LoadPizzasFail", () => {
      it("should create an action", () => {
        const action = new fromPizzas.LoadPizzasFail({
          message: "This does not seem right",
        });

        expect({ ...action }).toEqual({
          type: "[Products] Load Pizzas Fail",
          payload: {
            message: "This does not seem right",
          },
        });
      });
    });

    describe("LoadPizzasSuccess", () => {
      it("should create an action", () => {
        const action = new fromPizzas.LoadPizzasSuccess([
          {
            name: "Blazin' Inferno",
            toppings: [
              {
                id: 10,
                name: "pepperoni",
              },
            ],
            id: 1,
          },
        ]);

        expect({ ...action }).toEqual({
          type: "[Products] Load Pizzas Success",
          payload: [
            {
              name: "Blazin' Inferno",
              toppings: [
                {
                  id: 10,
                  name: "pepperoni",
                },
              ],
              id: 1,
            },
          ],
        });
      });
    });
  });
});
