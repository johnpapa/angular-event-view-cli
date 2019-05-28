import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FilterTextComponent } from './filter-text.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [FilterTextComponent],
  declarations: [FilterTextComponent]
})
export class FilterTextModule {}
