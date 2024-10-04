import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { PdfViewerModule } from 'ng2-pdf-viewer'
import { CustomSelectPageModule } from '../reusable-components/custom-select/custom-select.module'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    PdfViewerModule,
    CustomSelectPageModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
