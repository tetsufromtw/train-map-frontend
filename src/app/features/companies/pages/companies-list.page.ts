import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  Company, 
  CompanyFilters, 
  CompanyType, 
  CompanyStatus 
} from '../../../core/interfaces/company.interface';
import { CompanyService } from '../services/company.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { PaginationComponent, PaginationEvent } from '../../../shared/components/pagination/pagination.component';
import { CompanySearchPanelComponent, SearchFilters } from '../components/company-search-panel/company-search-panel.component';
import { CompanyListComponent } from '../components/company-list/company-list.component';

@Component({
  selector: 'app-companies-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    CompanySearchPanelComponent,
    CompanyListComponent
  ],
  templateUrl: './companies-list.page.html',
  styleUrls: ['./companies-list.page.scss']
})
export class CompaniesListPage implements OnInit {
  companies: Company[] = [];
  loading: boolean = false;
  error: string | null = null;
  
  // Pagination
  currentPage: number = 1;
  totalPages: number = 1;
  total: number = 0;
  limit: number = 10;
  
  // Filters
  searchTerm: string = '';
  selectedType: CompanyType | '' = '';
  selectedStatus: CompanyStatus | '' = '';
  
  // Form states
  showCreateForm: boolean = false;
  editingCompany: Company | null = null;
  
  // New company form
  newCompany = {
    companyCode: 0,
    railwayCode: 10,
    companyName: '',
    companyNameKana: '',
    companyNameOfficial: '',
    companyNameAbbreviated: '',
    companyUrl: '',
    companyType: CompanyType.OTHER,
    status: CompanyStatus.ACTIVE,
    sortOrder: 999
  };
  
  // Enums for template (still needed for modals)
  CompanyType = CompanyType;
  CompanyStatus = CompanyStatus;
  
  constructor(private companyService: CompanyService) {}
  
  ngOnInit(): void {
    this.loadCompanies();
  }
  
  loadCompanies(): void {
    this.loading = true;
    this.error = null;
    
    const filters: CompanyFilters = {
      page: this.currentPage,
      limit: this.limit,
      search: this.searchTerm || undefined,
      companyType: this.selectedType || undefined,
      status: this.selectedStatus || undefined
    };
    
    this.companyService.getCompanies(filters).subscribe({
      next: (response) => {
        this.companies = response.data;
        this.total = response.total;
        this.totalPages = response.totalPages;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      }
    });
  }
  
  onPageChange(event: PaginationEvent): void {
    this.currentPage = event.page;
    this.limit = event.limit;
    this.loadCompanies();
  }
  
  onSearchSubmit(): void {
    this.currentPage = 1;
    this.loadCompanies();
  }
  
  onSearchFiltersChange(filters: SearchFilters): void {
    this.searchTerm = filters.searchTerm;
    this.selectedType = filters.selectedType;
    this.selectedStatus = filters.selectedStatus;
  }
  
  onClearFilters(): void {
    this.searchTerm = '';
    this.selectedType = '';
    this.selectedStatus = '';
    this.currentPage = 1;
    this.loadCompanies();
  }
  
  onCompanyEdit(company: Company): void {
    this.editingCompany = { ...company };
  }
  
  onCompanyDelete(company: Company): void {
    if (confirm(`「${company.companyName}」を削除しますか？`)) {
      this.deleteCompany(company.companyCode);
    }
  }
  
  
  onCreateClick(): void {
    this.showCreateForm = true;
    this.resetNewCompanyForm();
  }
  
  
  onCreateSubmit(): void {
    this.companyService.createCompany(this.newCompany).subscribe({
      next: () => {
        this.showCreateForm = false;
        this.loadCompanies();
      },
      error: (error) => {
        this.error = error.message;
      }
    });
  }
  
  onUpdateSubmit(): void {
    if (!this.editingCompany) return;
    
    this.companyService.updateCompany(
      this.editingCompany.companyCode, 
      this.editingCompany
    ).subscribe({
      next: () => {
        this.editingCompany = null;
        this.loadCompanies();
      },
      error: (error) => {
        this.error = error.message;
      }
    });
  }
  
  deleteCompany(companyCode: number): void {
    this.companyService.deleteCompany(companyCode).subscribe({
      next: () => {
        this.loadCompanies();
      },
      error: (error) => {
        this.error = error.message;
      }
    });
  }
  
  onCancelCreate(): void {
    this.showCreateForm = false;
  }
  
  onCancelEdit(): void {
    this.editingCompany = null;
  }
  
  onRetryLoad(): void {
    this.loadCompanies();
  }
  
  
  private resetNewCompanyForm(): void {
    this.newCompany = {
      companyCode: 0,
      railwayCode: 10,
      companyName: '',
      companyNameKana: '',
      companyNameOfficial: '',
      companyNameAbbreviated: '',
      companyUrl: '',
      companyType: CompanyType.OTHER,
      status: CompanyStatus.ACTIVE,
      sortOrder: 999
    };
  }
}