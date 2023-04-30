import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productList!: any[];
  products: any[] = [];
  subTotal!: any;
  checkoutMode:Boolean=false;

  constructor(
    private product_service: ProductService,
    private authService:AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.product_service.getAllProducts().subscribe({
      next: (res: any) => {
        this.productList = res;
      },
      error: (error) => {
        alert(error);
      },
      complete: () => {
        // console.log('Request Completed');
      },
    });

    this.product_service.loadCart();
    this.products = this.product_service.getProduct();
  }

  //Add product to Cart
  addToCart(product: any) {
    if (!this.product_service.productInCart(product)) {
      product.quantity = 1;
      this.product_service.addToCart(product);
      this.products = [...this.product_service.getProduct()];
      this.subTotal = product.price;
    }
  }

  //Change sub total amount
  // changeSubTotal(product: any, index: any) {
  //   const qty = product.quantity;
  //   const amt = product.price;

  //   this.subTotal = amt * qty;

  //   this.product_service.saveCart();
  // }

  //Remove a Product from Cart
  removeFromCart(product: any) {
    this.product_service.removeProduct(product);
    this.products = this.product_service.getProduct();
  }

  //Calculate Total

  get total() {
    return this.products?.reduce(
      (sum, product) => ({
        quantity: 1,
        price: sum.price + product.quantity * product.price,
      }),
      { quantity: 1, price: 0 }
    ).price;
  }

  checkout() {
    this.checkoutMode=true
    localStorage.setItem('cart_total', JSON.stringify(this.total));
    // alert('Items saved to Local Storage successfully ')
  }
  logout(){
    this.authService.logout()
  }
  onClose(){
    this.checkoutMode=false
  }
}