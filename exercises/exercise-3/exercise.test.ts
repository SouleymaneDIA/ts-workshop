import { LineItem, Order, priceOrder } from "./code";

// npm run exercise-3

test("it allows a valid taco", () => {
  const taco_1: LineItem = {
    protein: "chicken",
    type: "taco",
    extraTaco: true,
    salsa: true,
    awesomeSauce: true
  };

  const taco_2: LineItem = {
    protein: "jackfruit",
    type: "taco",
    extraTaco: true,
    salsa: false,
    awesomeSauce: false
  };

  const taco_3: LineItem = {
    protein: "carnitas",
    type: "taco",
    extraTaco: false,
    salsa: true,
    awesomeSauce: false
  };
});

test("it disallows invalid tacos", () => {
  // typings:expect-error
  const badTaco_1: LineItem = {
    type: "taco",
    protein: "kingSalmon",
    extraTaco: false,
    salsa: true,
    awesomeSauce: false
  };

  // typings:expect-error
  const badTaco_2: LineItem = {
    type: "taco",
    protein: "carnitas",
    riceType: "brownRice",
    awesomeSauce: false
  };
});

test("it allows valid sandwiches", () => {
  const sandwich_1: LineItem = {
    type: "sandwich",
    protein: "chicken",
    toppings: ["cheese", "lettuce"],
    awesomeSauce: false
  };

  const sandwich_2: LineItem = {
    type: "sandwich",
    protein: "portabelloCap",
    toppings: ["lettuce", "tomato"],
    awesomeSauce: true
  };
});

test("it disallows invalid sandwiches", () => {
  // typings:expect-error
  const badSandwich_1: LineItem = {
    type: "sandwich",
    protein: "portabelloCap",
    toppings: ["tomato"],
    extraTaco: false,
    salsa: true,
    awesomeSauce: false
  };
});

test("correctly prices a simple order", () => {
  const order: Order = {
    lineItems: [
      {
        type: "sandwich",
        protein: "chicken",
        awesomeSauce: false,
        toppings: []
      },
      {
        type: "taco",
        protein: "chicken",
        salsa: false,
        awesomeSauce: false,
        extraTaco: false
      }
    ]
  };
  expect(priceOrder(order)).toEqual(18);
});

test("correctly prices a complicated order", () => {
  const order: Order = {
    lineItems: [
      {
        type: "sandwich",
        protein: "chicken",
        awesomeSauce: false,
        toppings: ["cheese", "lettuce", "tomato"]
      },
      {
        type: "taco",
        protein: "carnitas",
        salsa: true,
        awesomeSauce: false,
        extraTaco: true
      }
    ]
  };
  expect(priceOrder(order)).toEqual(38.5);
});
