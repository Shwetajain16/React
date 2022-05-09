import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
//import { CreateTicketComponent } from '../tickets/create-ticket.component';
//import { TicketComponent } from './ticket.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsersRoutingModule,
        FormsModule,
        NgxPaginationModule,
        Ng2SearchPipeModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent
      
        //TicketComponent
    ]
})
export class UsersModule { }