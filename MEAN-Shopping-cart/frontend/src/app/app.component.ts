import { Component } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

import { AccountService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    public totalItem : number = 0;
  public searchTerm !: string;
    user: User;

    constructor(private accountService: AccountService,private cartService : CartService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.accountService.logout();
    }
    ngOnInit(): void {
        this.cartService.getProducts()
        .subscribe(res=>{
          this.totalItem = res.length;
        })
    }
    search(event:any){
        this.searchTerm = (event.target as HTMLInputElement).value;
        console.log(this.searchTerm);
        this.cartService.search.next(this.searchTerm);
      }
}