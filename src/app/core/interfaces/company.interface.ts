export enum CompanyType {
  OTHER = 0,           // その他
  JR = 1,             // JR
  MAJOR_PRIVATE = 2,  // 大手私鉄
  SEMI_MAJOR_PRIVATE = 3 // 準大手私鉄
}

export enum CompanyStatus {
  ACTIVE = 0,         // 運用中
  PRE_OPERATION = 1,  // 運用前
  ABOLISHED = 2       // 廃止
}

export interface Company {
  companyCode: number;           // 事業者コード (必須, ユニーク)
  railwayCode: number;           // 鉄道コード (必須, 10-99)
  companyName: string;           // 事業者名 (必須)
  companyNameKana?: string;      // 事業者名カナ (任意)
  companyNameOfficial?: string;  // 正式名称 (任意)
  companyNameAbbreviated?: string; // 略称 (任意)
  companyUrl?: string;           // WebサイトURL (任意)
  companyType?: CompanyType;     // 事業者区分 (任意)
  status?: CompanyStatus;        // 運用状態 (任意)
  sortOrder?: number;            // 並び順 (任意)
}

export interface CompanyFilters {
  companyType?: CompanyType;
  status?: CompanyStatus;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CompanyTypeOption {
  value: CompanyType;
  label: string;
}

export interface CompanyStatusOption {
  value: CompanyStatus;
  label: string;
}