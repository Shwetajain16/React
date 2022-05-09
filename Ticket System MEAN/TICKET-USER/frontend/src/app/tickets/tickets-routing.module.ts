import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
//import { ListComponent } from './list.component';
import { EditDeleteComponent } from './edit-delete.component';
import { TicketComponent } from './ticket.component';
import{TicketListComponent} from './ticket-list.component';
const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            //{ path: '', component: ListComponent },
            //{ path: 'add', component: AddEditComponent },
            { path: '',component:TicketListComponent  },
            { path: 'edit/:id', component: EditDeleteComponent },
            // { path: 'create', component:TicketComponent  },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TicketsRoutingModule { }