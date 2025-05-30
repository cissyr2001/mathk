import { ApiService } from './api.service';
import { MockService } from './mock.service';
import type {
  IUserResponseDto,
  ICreateUserRequestDto,
  IUserProfileResponseDto,
  ICreateUserProfileRequestDto,
  IPaginationParams,
  IPaginationResponse
} from '../types/interfaces';

export class UserService extends ApiService {
  private useMockData: boolean;

  constructor(baseURL: string) {
    super(baseURL);
    this.useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true';
  }

  async getUsers(params: IPaginationParams): Promise<IPaginationResponse<IUserResponseDto>> {
    if (this.useMockData) {
      return MockService.getUsers(params);
    }
    const response = await this.get<IPaginationResponse<IUserResponseDto>>('/users', { params });
    return response.data!;
  }

  async getUserById(id: string): Promise<IUserResponseDto> {
    if (this.useMockData) {
      return MockService.getUserById(id);
    }
    const response = await this.get<IUserResponseDto>(`/users/${id}`);
    return response.data!;
  }

  async createUser(data: ICreateUserRequestDto): Promise<IUserResponseDto> {
    if (this.useMockData) {
      return MockService.createUser(data);
    }
    const response = await this.post<IUserResponseDto>('/users', data);
    return response.data!;
  }

  async updateUser(id: string, data: Partial<ICreateUserRequestDto>): Promise<IUserResponseDto> {
    if (this.useMockData) {
      return MockService.updateUser(id, data);
    }
    const response = await this.put<IUserResponseDto>(`/users/${id}`, data);
    return response.data!;
  }

  async deleteUser(id: string): Promise<void> {
    if (this.useMockData) {
      return MockService.deleteUser(id);
    }
    await this.delete(`/users/${id}`);
  }

  async getUserProfile(userId: string): Promise<IUserProfileResponseDto> {
    if (this.useMockData) {
      return MockService.getUserProfile(userId);
    }
    const response = await this.get<IUserProfileResponseDto>(`/users/${userId}/profile`);
    return response.data!;
  }

  async updateUserProfile(
    userId: string,
    data: ICreateUserProfileRequestDto
  ): Promise<IUserProfileResponseDto> {
    if (this.useMockData) {
      return MockService.updateUserProfile(userId, data);
    }
    const response = await this.put<IUserProfileResponseDto>(`/users/${userId}/profile`, data);
    return response.data!;
  }

  async uploadUserAvatar(userId: string, file: File): Promise<{ avatarUrl: string }> {
    if (this.useMockData) {
      return MockService.uploadUserAvatar(userId, file);
    }
    const formData = new FormData();
    formData.append('avatar', file);
    
    const response = await this.post<{ avatarUrl: string }>(
      `/users/${userId}/avatar`,
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