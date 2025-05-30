// Common Types
export type Integer = number;
export type Float = number;
export type DateTime = string;
export type UUID = string;
export type Email = string;
export type PhoneNumber = string;
export type URL = string;
export type JSON = Record<string, any>;

// Enums
export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT'
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export enum GradeLevel {
  KINDERGARTEN = 'KINDERGARTEN',
  ELEMENTARY = 'ELEMENTARY',
  MIDDLE = 'MIDDLE',
  HIGH = 'HIGH'
}

// Base Interfaces
export interface IBaseEntity {
  id: UUID;
  createdAt: DateTime;
  updatedAt: DateTime;
}

export interface IPaginationParams {
  page: Integer;
  limit: Integer;
}

export interface IPaginationResponse<T> {
  items: T[];
  total: Integer;
  page: Integer;
  limit: Integer;
  totalPages: Integer;
}

// User Related Interfaces
export interface IUserResponseDto extends IBaseEntity {
  email: Email;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt?: DateTime;
  profile?: IUserProfileResponseDto;
}

export interface IUserProfileResponseDto extends IBaseEntity {
  userId: UUID;
  gender?: Gender;
  dateOfBirth?: DateTime;
  phoneNumber?: PhoneNumber;
  address?: string;
  avatarUrl?: URL;
}

export interface ICreateUserRequestDto {
  email: Email;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  profile?: Partial<ICreateUserProfileRequestDto>;
}

export interface ICreateUserProfileRequestDto {
  gender?: Gender;
  dateOfBirth?: DateTime;
  phoneNumber?: PhoneNumber;
  address?: string;
  avatarUrl?: URL;
}

// School Related Interfaces
export interface ISchoolResponseDto extends IBaseEntity {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: PhoneNumber;
  email: Email;
  website?: URL;
  logoUrl?: URL;
  isActive: boolean;
}

export interface ICreateSchoolRequestDto {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: PhoneNumber;
  email: Email;
  website?: URL;
  logoUrl?: URL;
}

// Class Related Interfaces
export interface IClassResponseDto extends IBaseEntity {
  name: string;
  gradeLevel: GradeLevel;
  schoolId: UUID;
  teacherId: UUID;
  academicYear: string;
  isActive: boolean;
}

export interface ICreateClassRequestDto {
  name: string;
  gradeLevel: GradeLevel;
  schoolId: UUID;
  teacherId: UUID;
  academicYear: string;
}

// Student Related Interfaces
export interface IStudentResponseDto extends IBaseEntity {
  userId: UUID;
  schoolId: UUID;
  classId: UUID;
  studentId: string;
  gradeLevel: GradeLevel;
  enrollmentDate: DateTime;
  isActive: boolean;
}

export interface ICreateStudentRequestDto {
  userId: UUID;
  schoolId: UUID;
  classId: UUID;
  studentId: string;
  gradeLevel: GradeLevel;
  enrollmentDate: DateTime;
}

// Teacher Related Interfaces
export interface ITeacherResponseDto extends IBaseEntity {
  userId: UUID;
  schoolId: UUID;
  teacherId: string;
  subjects: string[];
  isActive: boolean;
}

export interface ICreateTeacherRequestDto {
  userId: UUID;
  schoolId: UUID;
  teacherId: string;
  subjects: string[];
}

// Parent Related Interfaces
export interface IParentResponseDto extends IBaseEntity {
  userId: UUID;
  children: UUID[]; // Array of student IDs
  isActive: boolean;
}

export interface ICreateParentRequestDto {
  userId: UUID;
  children: UUID[];
}

// Authentication Related Interfaces
export interface ILoginRequestDto {
  email: Email;
  password: string;
}

export interface ILoginResponseDto {
  accessToken: string;
  refreshToken: string;
  user: IUserResponseDto;
}

export interface IRefreshTokenRequestDto {
  refreshToken: string;
}

export interface IChangePasswordRequestDto {
  currentPassword: string;
  newPassword: string;
}

// API Response Interfaces
export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: JSON;
  };
}

// Error Response Interface
export interface IErrorResponse {
  code: string;
  message: string;
  details?: JSON;
} 