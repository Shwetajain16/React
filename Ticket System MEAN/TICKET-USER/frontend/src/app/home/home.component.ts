import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService,AlertService } from '@app/_services';
import { Ticket } from '@app/_models/ticket';
import { User } from '@app/_models/user';
import{HomeModule} from './home.module';
// import { Router, ActivatedRoute } from '@angular/router';
// import { NgxPaginationModule } from 'ngx-pagination';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;
    ticket: Ticket;
    tickets=null;
    users=null;
    POSTS:Ticket[];
    page = 1;
    count = 0;
    tableSize = 7;
    tableSizes = [3, 6, 9, 12];
    selectedRow: string;    
    loading: boolean;
    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
        this.ticket = this.accountService.ticketValue;

    }
    ngOnInit() {
        this.accountService.getAllTicket()
            .pipe(first())
            .subscribe(tickets => this.tickets = tickets);
            this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
            this.fetchPosts();
    }
    fetchPosts(): void {
        this.accountService.getAllTicket().subscribe(
          (response) => {
            this.POSTS = response;
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
      }
      onTableDataChange(event: any) {
        this.page = event;
        this.fetchPosts();
      }
      onTableSizeChange(event: any): void {
        this.tableSize = event.target.value;
        this.page = 1;
        this.fetchPosts();
      }
}