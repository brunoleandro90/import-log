import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BatchRoutingModule } from './batch-routing.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { BatchService } from 'src/app/shared/services/batch.service';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    BatchRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  providers: [BatchService, SnackBarService]
})
export class BatchModule { }
