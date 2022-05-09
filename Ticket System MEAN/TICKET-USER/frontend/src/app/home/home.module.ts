import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

//import { CreateTicketComponent } from '../tickets/create-ticket.component';
//import { TicketComponent } from './ticket.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        
        FormsModule,
        NgxPaginationModule,
        Ng2SearchPipeModule
    ],
    declarations: [
        
      
        //TicketComponent
    ]
})
export class HomeModule { }