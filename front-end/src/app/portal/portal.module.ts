import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/modules/material.module';
import { TopnavComponent } from './components/topnav/topnav.component';
import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SnackBarService } from '../shared/services/snack-bar.service';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        PortalRoutingModule,
        MaterialModule
    ],
    declarations: [
        PortalComponent,
        NavComponent,
        TopnavComponent,
        SidebarComponent,
        ConfirmationDialogComponent
    ],
    providers: [SnackBarService]

})
export class PortalModule { }
