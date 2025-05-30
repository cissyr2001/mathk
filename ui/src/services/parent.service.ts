import { ApiService } from './api.service';
import { MockService } from './mock.service';
import type {
  IParentResponseDto,
  ICreateParentRequestDto,
  IPaginationParams,
  IPaginationResponse
} from '../types/interfaces';

export class ParentService extends ApiService {
  private useMockData: boolean;

  constructor(baseURL: string) {
    super(baseURL);
    this.useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true';
  }

  async getParents(params: IPaginationParams): Promise<IPaginationResponse<IParentResponseDto>> {
    if (this.useMockData) {
      return MockService.getParents(params);
    }
    const response = await this.get<IPaginationResponse<IParentResponseDto>>('/parents', { params });
    return response.data!;
  }

  async getParentById(id: string): Promise<IParentResponseDto> {
    if (this.useMockData) {
      return MockService.getParentById(id);
    }
    const response = await this.get<IParentResponseDto>(`/parents/${id}`);
    return response.data!;
  }

  async createParent(data: ICreateParentRequestDto): Promise<IParentResponseDto> {
    if (this.useMockData) {
      return MockService.createParent(data);
    }
    const response = await this.post<IParentResponseDto>('/parents', data);
    return response.data!;
  }

  async updateParent(id: string, data: Partial<ICreateParentRequestDto>): Promise<IParentResponseDto> {
    if (this.useMockData) {
      return MockService.updateParent(id, data);
    }
    const response = await this.put<IParentResponseDto>(`/parents/${id}`, data);
    return response.data!;
  }

  async deleteParent(id: string): Promise<void> {
    if (this.useMockData) {
      return MockService.deleteParent(id);
    }
    await this.delete(`/parents/${id}`);
  }

  async getParentChildren(parentId: string, params: IPaginationParams): Promise<IPaginationResponse<any>> {
    if (this.useMockData) {
      return MockService.getParentChildren(parentId, params);
    }
    const response = await this.get<IPaginationResponse<any>>(`/parents/${parentId}/children`, { params });
    return response.data!;
  }

  async addChildToParent(parentId: string, childId: string): Promise<void> {
    if (this.useMockData) {
      return MockService.addChildToParent(parentId, childId);
    }
    await this.post(`/parents/${parentId}/children/${childId}`);
  }

  async removeChildFromParent(parentId: string, childId: string): Promise<void> {
    if (this.useMockData) {
      return MockService.removeChildFromParent(parentId, childId);
    }
    await this.delete(`/parents/${parentId}/children/${childId}`);
  }

  async getParentNotifications(parentId: string, params: IPaginationParams): Promise<IPaginationResponse<any>> {
    if (this.useMockData) {
      return MockService.getParentNotifications(parentId, params);
    }
    const response = await this.get<IPaginationResponse<any>>(`/parents/${parentId}/notifications`, { params });
    return response.data!;
  }

  async markNotificationAsRead(parentId: string, notificationId: string): Promise<void> {
    if (this.useMockData) {
      return MockService.markNotificationAsRead(parentId, notificationId);
    }
    await this.put(`/parents/${parentId}/notifications/${notificationId}/read`);
  }
} 