import {Component, OnInit} from '@angular/core';
import {IProducts} from "../../models/products";
import {Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit{
  constructor(private ProductService: ProductsService) {
  }
  basket: IProducts[]
  basketSubscription: Subscription
  ngOnInit():void{
  this.basketSubscription = this.ProductService.getProductFromBasek().subscribe((data) =>{
    this.basket=data
  })
  }

  ngOnDestroy(){
    if(this.basketSubscription) this.basketSubscription.unsubscribe()
  }

  incrementItemFromBasket(item:IProducts){
    item.quantitu +=1
    this.ProductService.updateProductToBasket(item).subscribe((data) =>{})
  }
  decrementItemFromBasket(item:IProducts){
    if(item.quantitu === 1) {
      this.ProductService.deleteProductFromBasket(item.id).subscribe(() =>{
        let idx = this.basket.findIndex((data) => data.id === item.id)
        this.basket.splice(idx, 1)
      })
    }else {
      item.quantitu -=1
      this.ProductService.updateProductToBasket(item).subscribe((data) =>{})
    }


    this.ProductService.updateProductToBasket(item).subscribe((data) =>{})
  }
}
