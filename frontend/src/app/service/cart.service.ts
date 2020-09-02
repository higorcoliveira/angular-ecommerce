import { Injectable } from '@angular/core';
import { CartItem } from '../common/cartItem';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];
  // para publicar eventos para subscribers
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(cartItem: CartItem) {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    existingCartItem = this.cartItems.find(
      (element) => element.id === cartItem.id
    );
    alreadyExistsInCart = existingCartItem != undefined;

    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let current of this.cartItems) {
      totalPriceValue += current.quantity * current.unitPrice;
      totalQuantityValue += current.quantity;
    }

    // publica os eventos para os subscribers
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    cartItem.quantity === 0
      ? this.removeFromCart(cartItem)
      : this.computeCartTotals();
  }

  removeFromCart(cartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(
      (element) => element.id === cartItem.id
    );
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
    }
  }
}
