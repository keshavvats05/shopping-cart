import {  Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  products: any[] = [];
  cartTotal!:number

  @Input() message! : any
  @Output() close= new EventEmitter()

  constructor(private product_service:ProductService){}

  onClose(){
    this.close.emit()
  }
ngOnInit(): void {

  this.products = JSON.parse(localStorage.getItem('cart_items') as any) || [];
  this.cartTotal= JSON.parse(localStorage.getItem('cart_total') as any) || [];


}

}
