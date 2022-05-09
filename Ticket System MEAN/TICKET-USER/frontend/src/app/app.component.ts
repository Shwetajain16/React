import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';
import { Ticket } from './_models';


@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;
    ticket: Ticket;
    searchText: string;
    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
        this.accountService.ticket.subscribe(x => this.ticket = x);

    }

    logout() {
        this.accountService.logout();
    }
}