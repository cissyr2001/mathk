import { ApiService } from './api.service';
import { MockService } from './mock.service';
import type {
  IStudentResponseDto,
  ICreateStudentRequestDto,
  IPaginationParams,
  IPaginationResponse
} from '../types/interfaces';

export class StudentService extends ApiService {
  private useMockData: boolean;

  constructor(baseURL: string) {
    super(baseURL);
    this.useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true';
  }

  async getStudents(params: IPaginationParams): Promise<IPaginationResponse<IStudentResponseDto>> {
    if (this.useMockData) {
      return MockService.getStudents(params);
    }
    const response = await this.get<IPaginationResponse<IStudentResponseDto>>('/students', { params });
    return response.data!;
  }

  async getStudentById(id: string): Promise<IStudentResponseDto> {
    if (this.useMockData) {
      return MockService.getStudentById(id);
    }
    const response = await this.get<IStudentResponseDto>(`/students/${id}`);
    return response.data!;
  }

  async getStudentsBySchool(schoolId: string, params: IPaginationParams): Promise<IPaginationResponse<IStudentResponseDto>> {
    if (this.useMockData) {
      return MockService.getStudentsBySchool(schoolId, params);
    }
    const response = await this.get<IPaginationResponse<IStudentResponseDto>>(`/schools/${schoolId}/students`, { params });
    return response.data!;
  }

  async getStudentsByClass(classId: string, params: IPaginationParams): Promise<IPaginationResponse<IStudentResponseDto>> {
    if (this.useMockData) {
      return MockService.getStudentsByClass(classId, params);
    }
    const response = await this.get<IPaginationResponse<IStudentResponseDto>>(`/classes/${classId}/students`, { params });
    return response.data!;
  }

  async createStudent(data: ICreateStudentRequestDto): Promise<IStudentResponseDto> {
    if (this.useMockData) {
      return MockService.createStudent(data);
    }
    const response = await this.post<IStudentResponseDto>('/students', data);
    return response.data!;
  }

  async updateStudent(id: string, data: Partial<ICreateStudentRequestDto>): Promise<IStudentResponseDto> {
    if (this.useMockData) {
      return MockService.updateStudent(id, data);
    }
    const response = await this.put<IStudentResponseDto>(`/students/${id}`, data);
    return response.data!;
  }

  async deleteStudent(id: string): Promise<void> {
    if (this.useMockData) {
      return MockService.deleteStudent(id);
    }
    await this.delete(`/students/${id}`);
  }

  async getStudentClasses(studentId: string, params: IPaginationParams): Promise<IPaginationResponse<any>> {
    if (this.useMockData) {
      return MockService.getStudentClasses(studentId, params);
    }
    const response = await this.get<IPaginationResponse<any>>(`/students/${studentId}/classes`, { params });
    return response.data!;
  }

  async getStudentParents(studentId: string, params: IPaginationParams): Promise<IPaginationResponse<any>> {
    if (this.useMockData) {
      return MockService.getStudentParents(studentId, params);
    }
    const response = await this.get<IPaginationResponse<any>>(`/students/${studentId}/parents`, { params });
    return response.data!;
  }
} 