import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IProduct} from '../../IProduct';
import {ProductService} from '../../product.service';
import {switchMap, map} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    product: IProduct;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit(): void {

    // this.activatedRoute.paramMap.subscribe((params) => {
    //   const id = params.get('id');
    //   this.productService.findProductById(id).subscribe((product) => {
    //     this.product = product;
    //   });
    // });

    // không nên để 2 subcribe.
    // Dùng activatedRoute.pamramMap. (luôn chạy)
    this.activatedRoute.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.productService.findProductById(id))
    ).subscribe((product) => {
        this.product = product;
        this.titleService.setTitle(this.product.name);
      }
    );

    // đi từ component khác vào hoặc gõ đường dẫn trức tiếp thì nên dùng snapshot để giảm 1 tầng observable
    // snhapshot chỉ được khởi tạo 1 lần khi component chạy
    // const param = this.activatedRoute.snapshot.paramMap;
    // const id = param.get('id');
    // this.productService.findProductById(id).subscribe(
    //   product => this.product = product
    // );
  }

  backToList() {
    this.router.navigate(['/product']);
  }
}
