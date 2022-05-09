import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService, AlertService } from '@app/_services';
import { from } from 'rxjs';
import { User } from '@app/_models';


@Component({
  templateUrl: './ticket.component.html'
})
export class TicketComponent implements OnInit {
  form: FormGroup;
    loading = false;
    submitted = false;
    user: User;


  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
  ) { }

  ngOnInit() {
    this.user = this.accountService.userValue;

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
                 this.alertService.success('Ticket Created successfully', { keepAfterRouteChange: true });
                 this.router.navigate(['../'], { relativeTo: this.route });
             },
             error: error => {
                 this.alertService.error(error);
                 this.loading = false;
             }
         });
        }
}
