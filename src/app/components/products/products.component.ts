import {Component, OnInit} from '@angular/core';
import {IProducts} from "./../../models/products";
import {Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogBoxComponent} from "../dialog-box/dialog-box.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  constructor(private ProductsService: ProductsService,public dialog: MatDialog) {}
  products: IProducts[];
  productsSubscription: Subscription;

  basket: IProducts[];
  basketSubscription: Subscription;


  ngOnInit() :void{
    this.productsSubscription=this.ProductsService.getProducts().subscribe((data) =>{
      this.products = data
    })

    this.basketSubscription = this.ProductsService.getProductFromBasek().subscribe((data) =>{
      this.basket = data
    })
  }

  addToBasket(product: IProducts){
    product.quantitu = 1
    let findItem

    if(this.basket.length > 0){
      findItem = this.basket.find((item) => item.id === product.id)
      if(findItem) this.updateToBasket(findItem)
      else this.postToBasket(product)

    } else this.postToBasket(product)


  }

  postToBasket(product: IProducts){
    this.ProductsService.postProductToBasket(product).subscribe((data) =>
      this.basket.push(data)
    )
  }

  updateToBasket(product: IProducts){
    product.quantitu +=1
    this.ProductsService.updateProductToBasket(product).subscribe((data) =>{

    })
  }
  openDialog(): void {
  let dialogConfig = new MatDialogConfig()
    dialogConfig.width = '500px'

    const dialogRef= this.dialog.open(DialogBoxComponent,dialogConfig)
  }

  ngOnDestroy(){
    if(this.productsSubscription) this.productsSubscription.unsubscribe()
    if(this.basketSubscription) this.basketSubscription.unsubscribe()

  }

}
