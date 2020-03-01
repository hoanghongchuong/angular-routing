import {NgModule} from '@angular/core';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from './product.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {AuthGuard} from '../auth.guard';

const productRoutes: Routes = [
  {
    path: 'product',
    component: ProductComponent,
    children: [
      {
        path: '',
        component: ProductListComponent
      },
      {
        path: ':id',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: ProductDetailComponent
          },
          {
            path: 'edit',
            component: ProductEditComponent
          }
        ]
      }
    ]
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(productRoutes)
  ],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
