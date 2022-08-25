import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';
import { Ticket } from '@app/_models/ticket';
import { User } from '@app/_models/user';

@Component({
  templateUrl: './ticket-list.component.html',
})
export class TicketListComponent implements OnInit {
  user: User;
  ticket:Ticket;
  searchText: string;
  tickets=null;
  POSTS:Ticket[];
  page = 1;
  count = 0;
  tableSize = 7;
  tableSizes = [3, 6, 9, 12];
  
  //POSTS: any;
   // page: any;
   // tableSize: any;

  constructor(private accountService: AccountService) { 
    this.user = this.accountService.userValue;
  }

  ngOnInit() {
    this.accountService.getAllTicket()
        .pipe(first())
        .subscribe(tickets => this.tickets = tickets);
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
  deleteTicket(id: string) {
    const ticket = this.tickets.find(x => x.id === id);
    ticket.isDeleting = true;
    ticket.deleted_at= new Date().toISOString().substring(0,10);
    console.log(ticket.deleted_at);
    this.accountService.update1(id,ticket.deleted_at)
        .pipe(first())
        //.subscribe(() => this.tickets = this.tickets.filter(x => x.id !== id));
}
}
