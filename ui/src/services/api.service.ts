import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import type { IApiResponse } from '../types/interfaces';

export class ApiService {
    private api: AxiosInstance;

    constructor(baseURL: string) {
        this.api = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.api.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const token = localStorage.getItem('accessToken');
                if (token && config.headers) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error: AxiosError) => Promise.reject(error)
        );

        this.api.interceptors.response.use(
            (response: AxiosResponse) => response,
            async (error: AxiosError) => {
                const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

                if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const refreshToken = localStorage.getItem('refreshToken');
                        if (!refreshToken) {
                            throw new Error('No refresh token available');
                        }

                        const response = await this.api.post<IApiResponse<{ accessToken: string }>>('/auth/refresh', {
                            refreshToken,
                        });

                        const { accessToken } = response.data.data!;
                        localStorage.setItem('accessToken', accessToken);

                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                        }
                        return this.api(originalRequest);
                    } catch (refreshError) {
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        window.location.href = '/login';
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );
    }

    protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<IApiResponse<T>> {
        const response = await this.api.get<IApiResponse<T>>(url, config);
        return response.data;
    }

    protected async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<IApiResponse<T>> {
        const response = await this.api.post<IApiResponse<T>>(url, data, config);
        return response.data;
    }

    protected async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<IApiResponse<T>> {
        const response = await this.api.put<IApiResponse<T>>(url, data, config);
        return response.data;
    }

    protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<IApiResponse<T>> {
        const response = await this.api.delete<IApiResponse<T>>(url, config);
        return response.data;
    }

    protected async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<IApiResponse<T>> {
        const response = await this.api.patch<IApiResponse<T>>(url, data, config);
        return response.data;
    }
} 