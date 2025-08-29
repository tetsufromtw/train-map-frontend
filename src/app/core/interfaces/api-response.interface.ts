import { Company, Pagination } from './company.interface';

export interface ApiResponse<T> {
  data: T;
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

export interface CompaniesListResponse {
  data: Company[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
}

export interface ReloadResponse {
  message: string;
}