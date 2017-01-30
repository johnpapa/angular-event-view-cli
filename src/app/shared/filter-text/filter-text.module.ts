import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FilterTextComponent } from './filter-text.component';
import { FilterTextService } from './filter-text.service';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [FilterTextComponent],
  declarations: [FilterTextComponent],
  providers: [FilterTextService]
})
export class FilterTextModule { }
