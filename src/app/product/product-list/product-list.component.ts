import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../product.service';
import {IProduct} from '../../IProduct';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: IProduct[] = [];
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('List product');
    this.productService.getProductList().subscribe((res) => {
      this.productList = res;
    });
    // dùng queryParamMap để lấy phần query vd: localhost:4200/product?orderby=price
    this.activatedRoute.queryParamMap.subscribe(
      query => {
        const orderBy = query.get('orderby');
      }
    );
  }

  detailProduct(id) {
    this.productService.findProductById(id).subscribe((res:IProduct) => {
      this.productList = res;
      console.log(this.productList);
    })
  }
}
