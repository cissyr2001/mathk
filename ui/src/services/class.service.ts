import { ApiService } from './api.service';
import { MockService } from './mock.service';
import type {
  IClassResponseDto,
  ICreateClassRequestDto,
  IPaginationParams,
  IPaginationResponse
} from '../types/interfaces';

export class ClassService extends ApiService {
  private useMockData: boolean;

  constructor(baseURL: string) {
    super(baseURL);
    this.useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true';
  }

  async getClasses(params: IPaginationParams): Promise<IPaginationResponse<IClassResponseDto>> {
    if (this.useMockData) {
      return MockService.getClasses(params);
    }
    const response = await this.get<IPaginationResponse<IClassResponseDto>>('/classes', { params });
    return response.data!;
  }

  async getClassById(id: string): Promise<IClassResponseDto> {
    if (this.useMockData) {
      return MockService.getClassById(id);
    }
    const response = await this.get<IClassResponseDto>(`/classes/${id}`);
    return response.data!;
  }

  async getClassesBySchool(schoolId: string, params: IPaginationParams): Promise<IPaginationResponse<IClassResponseDto>> {
    if (this.useMockData) {
      return MockService.getClassesBySchool(schoolId, params);
    }
    const response = await this.get<IPaginationResponse<IClassResponseDto>>(`/schools/${schoolId}/classes`, { params });
    return response.data!;
  }

  async getClassesByTeacher(teacherId: string, params: IPaginationParams): Promise<IPaginationResponse<IClassResponseDto>> {
    if (this.useMockData) {
      return MockService.getClassesByTeacher(teacherId, params);
    }
    const response = await this.get<IPaginationResponse<IClassResponseDto>>(`/teachers/${teacherId}/classes`, { params });
    return response.data!;
  }

  async createClass(data: ICreateClassRequestDto): Promise<IClassResponseDto> {
    if (this.useMockData) {
      return MockService.createClass(data);
    }
    const response = await this.post<IClassResponseDto>('/classes', data);
    return response.data!;
  }

  async updateClass(id: string, data: Partial<ICreateClassRequestDto>): Promise<IClassResponseDto> {
    if (this.useMockData) {
      return MockService.updateClass(id, data);
    }
    const response = await this.put<IClassResponseDto>(`/classes/${id}`, data);
    return response.data!;
  }

  async deleteClass(id: string): Promise<void> {
    if (this.useMockData) {
      return MockService.deleteClass(id);
    }
    await this.delete(`/classes/${id}`);
  }

  async addStudentToClass(classId: string, studentId: string): Promise<void> {
    if (this.useMockData) {
      return MockService.addStudentToClass(classId, studentId);
    }
    await this.post(`/classes/${classId}/students/${studentId}`);
  }

  async removeStudentFromClass(classId: string, studentId: string): Promise<void> {
    if (this.useMockData) {
      return MockService.removeStudentFromClass(classId, studentId);
    }
    await this.delete(`/classes/${classId}/students/${studentId}`);
  }

  async getClassStudents(classId: string, params: IPaginationParams): Promise<IPaginationResponse<any>> {
    if (this.useMockData) {
      return MockService.getClassStudents(classId, params);
    }
    const response = await this.get<IPaginationResponse<any>>(`/classes/${classId}/students`, { params });
    return response.data!;
  }
} 