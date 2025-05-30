import { ApiService } from './api.service';
import { MockService } from './mock.service';
import type {
  ISchoolResponseDto,
  ICreateSchoolRequestDto,
  IPaginationParams,
  IPaginationResponse
} from '../types/interfaces';

export class SchoolService extends ApiService {
  private useMockData: boolean;

  constructor(baseURL: string) {
    super(baseURL);
    this.useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true';
  }

  async getSchools(params: IPaginationParams): Promise<IPaginationResponse<ISchoolResponseDto>> {
    if (this.useMockData) {
      return MockService.getSchools(params);
    }
    const response = await this.get<IPaginationResponse<ISchoolResponseDto>>('/schools', { params });
    return response.data!;
  }

  async getSchoolById(id: string): Promise<ISchoolResponseDto> {
    if (this.useMockData) {
      return MockService.getSchoolById(id);
    }
    const response = await this.get<ISchoolResponseDto>(`/schools/${id}`);
    return response.data!;
  }

  async createSchool(data: ICreateSchoolRequestDto): Promise<ISchoolResponseDto> {
    if (this.useMockData) {
      return MockService.createSchool(data);
    }
    const response = await this.post<ISchoolResponseDto>('/schools', data);
    return response.data!;
  }

  async updateSchool(id: string, data: Partial<ICreateSchoolRequestDto>): Promise<ISchoolResponseDto> {
    if (this.useMockData) {
      return MockService.updateSchool(id, data);
    }
    const response = await this.put<ISchoolResponseDto>(`/schools/${id}`, data);
    return response.data!;
  }

  async deleteSchool(id: string): Promise<void> {
    if (this.useMockData) {
      return MockService.deleteSchool(id);
    }
    await this.delete(`/schools/${id}`);
  }

  async uploadSchoolLogo(schoolId: string, file: File): Promise<{ logoUrl: string }> {
    if (this.useMockData) {
      return MockService.uploadSchoolLogo(schoolId, file);
    }
    const formData = new FormData();
    formData.append('logo', file);
    
    const response = await this.post<{ logoUrl: string }>(
      `/schools/${schoolId}/logo`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data!;
  }
} 