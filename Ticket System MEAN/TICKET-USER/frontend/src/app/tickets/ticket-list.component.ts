import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService,AlertService } from '@app/_services';
import { Ticket } from '@app/_models/ticket';
import { User } from '@app/_models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  selectedRow: string;
  deleteList = []
  isSelect=false;
  //loading: boolean;
  deleted_at: string;
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router) 
    { 
  }

  ngOnInit() {
    this.user = this.accountService.userValue; 

    this.accountService.getAllTicket()
        .pipe(first())
        .subscribe(tickets => this.tickets = tickets);
        this.fetchPosts();

        this.form = this.formBuilder.group({
       
          ticket_no: ['', Validators.required],
          ticket_desc:['', Validators.required],
          username: this.user.username
      });   
  }
  // convenience getter for easy access to form fields
 get f() { return this.form.controls; }

 onSubmit() {
  this.submitted = true;

  // reset alerts on submit
  this.alertService.clear();

  // stop here if form is invalid
  if (this.form.invalid) {
      return;
  }
  this.createUser();
 }
 private createUser() {
  this.loading = true;
  this.accountService.create_ticket(this.form.value)
      .pipe(first())
      .subscribe({
          next: () => {
              this.alertService.success('Ticket Created successfully');
          },
          error: error => {
              this.alertService.error(error);
              this.loading = false;
          }
      });
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
  deleteTicket(id:string) {
    const user = this.tickets.find(x => x.id === id);
    user.isDeleting = true;
    this.accountService.delete1(id)
        .pipe(first())
        .subscribe(() => this.tickets = this.tickets.filter(x => x.id !== id));
  }
}
