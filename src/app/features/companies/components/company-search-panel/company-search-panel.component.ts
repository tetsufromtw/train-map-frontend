import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyType, CompanyStatus } from '../../../../core/interfaces/company.interface';

export interface SearchFilters {
  searchTerm: string;
  selectedType: CompanyType | '';
  selectedStatus: CompanyStatus | '';
}

@Component({
  selector: 'app-company-search-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './company-search-panel.component.html',
  styleUrls: ['./company-search-panel.component.scss']
})
export class CompanySearchPanelComponent {
  @Input() searchTerm: string = '';
  @Input() selectedType: CompanyType | '' = '';
  @Input() selectedStatus: CompanyStatus | '' = '';
  @Input() total: number = 0;
  @Input() loading: boolean = false;
  
  @Output() search = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();
  @Output() valueChanges = new EventEmitter<SearchFilters>();
  
  // Enums for template
  CompanyType = CompanyType;
  CompanyStatus = CompanyStatus;
  
  onSearchSubmit(): void {
    this.search.emit();
  }
  
  onClearFilters(): void {
    this.clear.emit();
  }
  
  onValueChange(): void {
    this.valueChanges.emit({
      searchTerm: this.searchTerm,
      selectedType: this.selectedType,
      selectedStatus: this.selectedStatus
    });
  }
  
  onSearchTermChange(value: string): void {
    this.searchTerm = value;
    this.onValueChange();
  }
  
  onTypeChange(value: string): void {
    this.selectedType = value as CompanyType | '';
    this.onValueChange();
  }
  
  onStatusChange(value: string): void {
    this.selectedStatus = value as CompanyStatus | '';
    this.onValueChange();
  }
}