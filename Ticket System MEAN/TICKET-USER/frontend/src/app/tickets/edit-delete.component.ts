import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService, AlertService } from '@app/_services';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: './edit-delete.component.html'})
export class EditDeleteComponent implements OnInit {
  form: FormGroup;
  id: string;
  
  //isAddMode: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    
    this.id=null;
    console.log(this.id);
   this.id = this.route.snapshot.params['id'];
    //this.isAddMode = !this.id;
    console.log(this.id);
  
  this.form = this.formBuilder.group({
    ticket_no: ['', Validators.required],
    ticket_desc: ['', Validators.required],
    updated_at: new FormControl((new Date()).toISOString().substring(0,10)),

  });

    this.accountService.getTicketById(this.id)
    .pipe(first())
    .subscribe(x => this.form.patchValue(x));
  }
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
    this.updateTicket();
  }
  private updateTicket() {
    this.accountService.update1(this.id, this.form.value)
        .pipe(first())
        .subscribe({
            next: () => {
                this.alertService.success('Update successful', { keepAfterRouteChange: true });
                this.router.navigate(['../../'], { relativeTo: this.route });
            },
            error: error => {
                this.alertService.error(error);
                this.loading = false;
            }
        });
}

}
