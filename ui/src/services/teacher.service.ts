import { ApiService } from './api.service';
import { MockService } from './mock.service';
import type {
  ITeacherResponseDto,
  ICreateTeacherRequestDto,
  IPaginationParams,
  IPaginationResponse
} from '../types/interfaces';

export class TeacherService extends ApiService {
  private useMockData: boolean;

  constructor(baseURL: string) {
    super(baseURL);
    this.useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true';
  }

  async getTeachers(params: IPaginationParams): Promise<IPaginationResponse<ITeacherResponseDto>> {
    if (this.useMockData) {
      return MockService.getTeachers(params);
    }
    const response = await this.get<IPaginationResponse<ITeacherResponseDto>>('/teachers', { params });
    return response.data!;
  }

  async getTeacherById(id: string): Promise<ITeacherResponseDto> {
    if (this.useMockData) {
      return MockService.getTeacherById(id);
    }
    const response = await this.get<ITeacherResponseDto>(`/teachers/${id}`);
    return response.data!;
  }

  async getTeachersBySchool(schoolId: string, params: IPaginationParams): Promise<IPaginationResponse<ITeacherResponseDto>> {
    if (this.useMockData) {
      return MockService.getTeachersBySchool(schoolId, params);
    }
    const response = await this.get<IPaginationResponse<ITeacherResponseDto>>(`/schools/${schoolId}/teachers`, { params });
    return response.data!;
  }

  async createTeacher(data: ICreateTeacherRequestDto): Promise<ITeacherResponseDto> {
    if (this.useMockData) {
      return MockService.createTeacher(data);
    }
    const response = await this.post<ITeacherResponseDto>('/teachers', data);
    return response.data!;
  }

  async updateTeacher(id: string, data: Partial<ICreateTeacherRequestDto>): Promise<ITeacherResponseDto> {
    if (this.useMockData) {
      return MockService.updateTeacher(id, data);
    }
    const response = await this.put<ITeacherResponseDto>(`/teachers/${id}`, data);
    return response.data!;
  }

  async deleteTeacher(id: string): Promise<void> {
    if (this.useMockData) {
      return MockService.deleteTeacher(id);
    }
    await this.delete(`/teachers/${id}`);
  }

  async getTeacherClasses(teacherId: string, params: IPaginationParams): Promise<IPaginationResponse<any>> {
    if (this.useMockData) {
      return MockService.getTeacherClasses(teacherId, params);
    }
    const response = await this.get<IPaginationResponse<any>>(`/teachers/${teacherId}/classes`, { params });
    return response.data!;
  }

  async getTeacherStudents(teacherId: string, params: IPaginationParams): Promise<IPaginationResponse<any>> {
    if (this.useMockData) {
      return MockService.getTeacherStudents(teacherId, params);
    }
    const response = await this.get<IPaginationResponse<any>>(`/teachers/${teacherId}/students`, { params });
    return response.data!;
  }

  async addSubjectToTeacher(teacherId: string, subject: string): Promise<void> {
    if (this.useMockData) {
      return MockService.addSubjectToTeacher(teacherId, subject);
    }
    await this.post(`/teachers/${teacherId}/subjects`, { subject });
  }

  async removeSubjectFromTeacher(teacherId: string, subject: string): Promise<void> {
    if (this.useMockData) {
      return MockService.removeSubjectFromTeacher(teacherId, subject);
    }
    await this.delete(`/teachers/${teacherId}/subjects/${subject}`);
  }
} 