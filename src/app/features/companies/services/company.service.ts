import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { 
  Company, 
  CompanyFilters, 
  CompanyTypeOption, 
  CompanyStatusOption,
  CompanyType,
  CompanyStatus 
} from '../../../core/interfaces/company.interface';
import { 
  CompaniesListResponse, 
  ReloadResponse 
} from '../../../core/interfaces/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private apiService: ApiService) {}

  getCompanies(filters?: CompanyFilters): Observable<CompaniesListResponse> {
    return this.apiService.get<CompaniesListResponse>('/companies', filters);
  }

  getCompanyById(companyCode: number): Observable<Company> {
    return this.apiService.get<Company>(`/companies/${companyCode}`);
  }

  createCompany(company: Omit<Company, 'companyCode'>): Observable<Company> {
    return this.apiService.post<Company>('/companies', company);
  }

  updateCompany(companyCode: number, updates: Partial<Company>): Observable<Company> {
    return this.apiService.patch<Company>(`/companies/${companyCode}`, updates);
  }

  deleteCompany(companyCode: number): Observable<void> {
    return this.apiService.delete<void>(`/companies/${companyCode}`);
  }

  getCompanyTypes(): Observable<CompanyTypeOption[]> {
    return this.apiService.get<CompanyTypeOption[]>('/companies/types');
  }

  getCompanyStatuses(): Observable<CompanyStatusOption[]> {
    return this.apiService.get<CompanyStatusOption[]>('/companies/statuses');
  }

  reloadData(): Observable<ReloadResponse> {
    return this.apiService.get<ReloadResponse>('/companies/reload');
  }

  // Helper methods for display
  getCompanyTypeLabel(type: CompanyType): string {
    const typeLabels = {
      [CompanyType.OTHER]: 'その他',
      [CompanyType.JR]: 'JR',
      [CompanyType.MAJOR_PRIVATE]: '大手私鉄',
      [CompanyType.SEMI_MAJOR_PRIVATE]: '準大手私鉄'
    };
    return typeLabels[type] || 'その他';
  }

  getCompanyStatusLabel(status: CompanyStatus): string {
    const statusLabels = {
      [CompanyStatus.ACTIVE]: '運用中',
      [CompanyStatus.PRE_OPERATION]: '運用前',
      [CompanyStatus.ABOLISHED]: '廃止'
    };
    return statusLabels[status] || '運用中';
  }
}