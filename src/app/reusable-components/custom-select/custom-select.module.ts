import { IonicModule } from '@ionic/angular'
import { CustomSelectComponent } from './custom-select.component'
import { NgModule } from '@angular/core'
import { PdfViewerModule } from 'ng2-pdf-viewer'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [CustomSelectComponent],
  imports: [IonicModule.forRoot(), PdfViewerModule, CommonModule, FormsModule],
  exports: [CustomSelectComponent],
})
export class CustomSelectPageModule {}
