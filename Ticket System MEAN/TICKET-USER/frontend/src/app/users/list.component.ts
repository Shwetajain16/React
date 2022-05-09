import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '@app/_models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService,AlertService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users = null;
    user: User;
    searchText: string;
    POSTS:User[];
    loading: boolean;

    page = 1;
    count = 0;
    tableSize = 7;
    tableSizes = [3, 6, 9, 12];
    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
             this.fetchPosts();

    }
    fetchPosts(): void {
        this.accountService.getAll().subscribe(
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

    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users.filter(x => x.id !== id));
    }
}