import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnswersPageRoutingModule } from './answers-routing.module';

import { AnswersPage } from './answers.page';
import { CustomSelectPageModule } from '../reusable-components/custom-select/custom-select.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnswersPageRoutingModule,
    CustomSelectPageModule
  ],
  declarations: [AnswersPage]
})
export class AnswersPageModule {}
