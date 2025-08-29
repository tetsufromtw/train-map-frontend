import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Company, CompanyType, CompanyStatus } from '../../../../core/interfaces/company.interface';
import { PaginationComponent, PaginationEvent } from '../../../../shared/components/pagination/pagination.component';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent {
  @Input() companies: Company[] = [];
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() total: number = 0;
  @Input() limit: number = 10;
  
  @Output() editClick = new EventEmitter<Company>();
  @Output() deleteClick = new EventEmitter<Company>();
  @Output() pageChange = new EventEmitter<PaginationEvent>();
  
  constructor(private companyService: CompanyService) {}
  
  onEditClick(company: Company): void {
    this.editClick.emit(company);
  }
  
  onDeleteClick(company: Company): void {
    this.deleteClick.emit(company);
  }
  
  onPageChange(event: PaginationEvent): void {
    this.pageChange.emit(event);
  }
  
  getCompanyTypeLabel(type?: CompanyType): string {
    return this.companyService.getCompanyTypeLabel(type || CompanyType.OTHER);
  }
  
  getCompanyStatusLabel(status?: CompanyStatus): string {
    return this.companyService.getCompanyStatusLabel(status || CompanyStatus.ACTIVE);
  }
}