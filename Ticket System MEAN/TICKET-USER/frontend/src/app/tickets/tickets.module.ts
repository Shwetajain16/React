import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TicketsRoutingModule } from './tickets-routing.module';
import { LayoutComponent } from './layout.component';
import { TicketComponent } from './ticket.component';
import { TicketListComponent } from './ticket-list.component';
import { EditDeleteComponent } from './edit-delete.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TicketsRoutingModule,
        NgxPaginationModule,
        Ng2SearchPipeModule,
        FormsModule
    ],
    declarations: [
        LayoutComponent,
        //ListComponent
        //AddEditComponent
      
        TicketComponent,
        TicketListComponent,
        EditDeleteComponent
    ],
    providers: [DatePipe]
})
export class TicketsModule { }
