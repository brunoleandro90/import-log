import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BatchRoutingModule } from './log-routing.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { LogService } from 'src/app/shared/services/log.service';
import { ListComponent } from './list/list.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [AddComponent, EditComponent, ListComponent],
  imports: [
    CommonModule,
    BatchRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  providers: [
    LogService,
    SnackBarService,
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pt-BR'
    }
  ]
})
export class LogModule { }
