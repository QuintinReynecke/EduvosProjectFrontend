import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
})
export class CustomSelectComponent implements OnInit {
  ngOnInit() {}

  @Input() options: string[] = []
  @Input() placeholder: string = ''
  @Output() selectedOption = new EventEmitter<string>()

  public searchTerm: string = ''
  public filteredOptions: string[] = []

  openModal: boolean = false
  selectedValue: string = ''

  filterOptions() {
    if (this.searchTerm.trim() === '') {
      this.filteredOptions = this.options
    } else {
      this.filteredOptions = this.options.filter((option) =>
        option.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    }
  }

  selectOption(option: string) {
    this.selectedValue = option
    this.selectedOption.emit(option)
    this.closeModal()
  }

  openModalDialog() {
    this.openModal = true
    this.filteredOptions = this.options
    this.searchTerm = ''
  }

  closeModal() {
    this.openModal = false
  }
}
