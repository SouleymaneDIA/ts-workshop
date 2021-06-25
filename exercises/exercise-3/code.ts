/**
 * NOTE: See the intro in exercise.test file for this exercise
 * for explanation
 */
import { AssertAssignable } from "../util";

/**
 * We're going to help the Monster Foodies Truck by writing 
 * a function that will price out their food orders.
 * 
 * The Monster Foodies Truck takes orders on paper slips. 
 * We'll represent items from these slips as a PaperLineItem, 
 * which is simply a collection of properties. 
 */

 export type Protein =
 | "chicken" // 🐓
 | "jackfruit" // 🍈

 // Pricey Proteins
 | "carnitas" // 🐖
 | "portabelloCap"; // 🍄

export type EntreeType =
 | "taco" // 🌮
 | "sandwich"; // 🍞

export type Topping =
 | "cheese" // 🧀
 | "lettuce" // 🥗
 | "tomato"; // 🍅


export type PaperLineItem = {
  type: EntreeType;
  protein: Protein;
  awesomeSauce: boolean;
  extraTaco?: boolean;
  salsa?: boolean;
  toppings?: Topping[];
};
/**
 * The trouble with this approach is that PaperLineItem doesn't 
 * constrain its values at all- we could have a sandwich with an 
 * extra taco! We wouldn't want to price an order like that.
 * 
 * We could work around this problem by writing a bunch of 
 * checks that validate that we don't have an extra taco with
 * a sandwich, or a sandwich with salsa, and so on, OR:
 * We could use TypeScript to make invalid orders unrepresentable 
 * in our code!
 *
 * ======================================================
 * TODO: Update the LineItem type to represent an order from the
 * Monster Foodies Truck. Make sure that LineItem only represents 
 * valid orders! Use the discriminated union technique and 
 * other tools you've learned to do this.
 * ======================================================*/


 type Taco = {
  type: "taco"; 
  protein: Protein; 
  salsa?: boolean;
  awesomeSauce: boolean;
  extraTaco?: boolean; 


}; 

type Sandwich = {
  type: "sandwich"
  protein: Protein;
  salsa?: boolean;
  toppings?: Topping[];
  awesomeSauce: boolean;            
}


export type LineItem = Taco  | Sandwich;



export interface Order {
  lineItems: LineItem[];
}

/*
 * ======================================================
 * TODO: Implement priceOrder.
 * 
 * Useful JavaScript:
 * * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
 * * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * ======================================================*/

function Taco_Price(taco: Taco): number {
  let  taco_price : number = 5;
   if(taco.protein == "carnitas"){
     taco_price = taco_price + 2;
   }
   if(taco.salsa){
     taco_price = taco_price + 0.5;
     if(taco.awesomeSauce){
       taco_price = taco_price + 1;
     }
   }
   if(taco.extraTaco){
     taco_price = taco_price + 3;
     if(taco.protein == "carnitas"){
       taco_price = (taco_price-3) + 4;
     }
   }
   return taco_price;
 }

function Sandwich_Price(sandwich: Sandwich): number {
  let  sandwich_price : number = 4;
  if(sandwich.awesomeSauce){
  sandwich_price = sandwich_price + 1;
  }
  if(sandwich.protein == "portabelloCap"){
  sandwich_price = sandwich_price + 2;
  }
  if(sandwich.toppings?.includes('cheese') && sandwich.toppings?.includes('tomato') && sandwich.toppings?.includes('lettuce')){
  sandwich_price = sandwich_price + (0.5*2);
  }
  return sandwich_price;
}

function priceFromItem(lineitem: LineItem) {
  let price : number;
  switch (lineitem.type) {
    case "taco":
      price = Taco_Price(lineitem);
      break;
    case "sandwich":
      price = Sandwich_Price(lineitem);
      break;
  }
  return price
}

export function priceOrder(order: Order): number {
  let priceO = 0;
  for(let i = 0; i<order.lineItems.length; i++){
    priceO += priceFromItem(order.lineItems[i]);
  }
  return priceO; 
} 


/* Monster Foodies Food Truck Menu
Taco....................$5
  Protein
    Chicken
    BBQ jackfruit
    Carnitas (+$2)
    Salsa (+$0.50)
  Add a second taco for +$3 (+$4 for Carnitas)
Sandwich................$4
  Protein
    Chicken
    BBQ Jackfruit
    Portabello Cap (+$2)
  Optional 1 topping, extra toppings +$0.50
    Cheese
    Lettuce
    Tomato
Add AwesomeSauce to anything for $1!
*/




