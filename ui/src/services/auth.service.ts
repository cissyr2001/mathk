import { ApiService } from './api.service';
import { MockService } from './mock.service';
import type {
  ILoginRequestDto,
  ILoginResponseDto,
  IRefreshTokenRequestDto,
  IChangePasswordRequestDto,
  IUserResponseDto
} from '../types/interfaces';

export class AuthService extends ApiService {
  private useMockData: boolean;

  constructor(baseURL: string) {
    super(baseURL);
    this.useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true';
  }

  async login(data: ILoginRequestDto): Promise<ILoginResponseDto> {
    if (this.useMockData) {
      const response = await MockService.login(data);
      if (response.success && response.data) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
      return response.data!;
    }
    const response = await this.post<ILoginResponseDto>('/auth/login', data);
    if (response.success && response.data) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response.data!;
  }

  async logout(): Promise<void> {
    if (this.useMockData) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return;
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    await this.post('/auth/logout');
  }

  async refreshToken(data: IRefreshTokenRequestDto): Promise<{ accessToken: string }> {
    if (this.useMockData) {
      const response = await MockService.refreshToken(data);
      if (response.success && response.data) {
        localStorage.setItem('accessToken', response.data.accessToken);
      }
      return response.data!;
    }
    const response = await this.post<{ accessToken: string }>('/auth/refresh', data);
    if (response.success && response.data) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    return response.data!;
  }

  async changePassword(data: IChangePasswordRequestDto): Promise<void> {
    if (this.useMockData) {
      return MockService.changePassword(data);
    }
    await this.post('/auth/change-password', data);
  }

  async getCurrentUser(): Promise<IUserResponseDto> {
    if (this.useMockData) {
      return MockService.getCurrentUser();
    }
    const response = await this.get<IUserResponseDto>('/auth/me');
    return response.data!;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }
} 