import {
  UserRole,
  Gender,
  GradeLevel
} from '../types/interfaces';
import type {
  IUserResponseDto,
  ICreateUserRequestDto,
  IUserProfileResponseDto,
  ICreateUserProfileRequestDto,
  IPaginationParams,
  IPaginationResponse,
  ISchoolResponseDto,
  ICreateSchoolRequestDto,
  IClassResponseDto,
  ICreateClassRequestDto,
  IStudentResponseDto,
  ICreateStudentRequestDto,
  ITeacherResponseDto,
  ICreateTeacherRequestDto,
  IParentResponseDto,
  ICreateParentRequestDto,
  ILoginRequestDto,
  ILoginResponseDto,
  IRefreshTokenRequestDto,
  IApiResponse,
  IChangePasswordRequestDto
} from '../types/interfaces';

const mockUsers: IUserResponseDto[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: UserRole.TEACHER,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: UserRole.STUDENT,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const mockUserProfiles: Record<string, IUserProfileResponseDto> = {
  '1': {
    id: '1',
    userId: '1',
    gender: Gender.MALE,
    dateOfBirth: '1980-01-01',
    phoneNumber: '+1-555-0123',
    address: '123 Main St',
    avatarUrl: 'https://example.com/avatars/1.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  '2': {
    id: '2',
    userId: '2',
    gender: Gender.FEMALE,
    dateOfBirth: '2000-01-01',
    phoneNumber: '+1-555-0124',
    address: '456 Oak Ave',
    avatarUrl: 'https://example.com/avatars/2.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
};

const mockSchools: ISchoolResponseDto[] = [
  {
    id: '1',
    name: 'Elementary School',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
    phone: '+1-555-0123',
    email: 'info@elementary.edu',
    website: 'www.elementary.edu',
    logoUrl: 'https://example.com/logo1.png',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'High School',
    address: '456 Oak Ave',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    country: 'USA',
    phone: '+1-555-0124',
    email: 'info@highschool.edu',
    website: 'www.highschool.edu',
    logoUrl: 'https://example.com/logo2.png',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const mockClasses: IClassResponseDto[] = [
  {
    id: '1',
    name: 'Class 1A',
    gradeLevel: GradeLevel.ELEMENTARY,
    schoolId: '1',
    teacherId: '1',
    academicYear: '2023-2024',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Class 2B',
    gradeLevel: GradeLevel.ELEMENTARY,
    schoolId: '1',
    teacherId: '2',
    academicYear: '2023-2024',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const mockClassStudents: Record<string, string[]> = {
  '1': ['1', '2', '3'],
  '2': ['4', '5', '6']
};

const mockStudents: IStudentResponseDto[] = [
  {
    id: '1',
    userId: '1',
    schoolId: '1',
    classId: '1',
    studentId: 'STU001',
    gradeLevel: GradeLevel.ELEMENTARY,
    enrollmentDate: new Date().toISOString(),
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    userId: '2',
    schoolId: '1',
    classId: '1',
    studentId: 'STU002',
    gradeLevel: GradeLevel.ELEMENTARY,
    enrollmentDate: new Date().toISOString(),
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const mockStudentParents: Record<string, string[]> = {
  '1': ['1', '2'],
  '2': ['3', '4']
};

const mockTeachers: ITeacherResponseDto[] = [
  {
    id: '1',
    userId: '1',
    schoolId: '1',
    teacherId: 'TCH001',
    subjects: ['Mathematics', 'Physics'],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    userId: '2',
    schoolId: '1',
    teacherId: 'TCH002',
    subjects: ['English', 'Literature'],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const mockTeacherClasses: Record<string, string[]> = {
  '1': ['1', '2'],
  '2': ['3', '4']
};

const mockTeacherStudents: Record<string, string[]> = {
  '1': ['1', '2', '3'],
  '2': ['4', '5', '6']
};

const mockParents: IParentResponseDto[] = [
  {
    id: '1',
    userId: '1',
    children: ['1', '2'],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    userId: '2',
    children: ['3', '4'],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const mockParentNotifications: Record<string, any[]> = {
  '1': [
    {
      id: '1',
      title: 'Parent-Teacher Meeting',
      message: 'Please attend the parent-teacher meeting on Friday',
      isRead: false,
      createdAt: new Date().toISOString()
    }
  ],
  '2': [
    {
      id: '2',
      title: 'School Event',
      message: 'Annual sports day is coming up next week',
      isRead: false,
      createdAt: new Date().toISOString()
    }
  ]
};

const mockTokens = {
  accessToken: 'mock-access-token',
  refreshToken: 'mock-refresh-token'
};

export class MockService {
  static async getUsers(params: IPaginationParams): Promise<IPaginationResponse<IUserResponseDto>> {
    const { page = 1, limit = 10 } = params;
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = mockUsers.slice(start, end);

    return {
      items,
      total: mockUsers.length,
      page,
      limit,
      totalPages: Math.ceil(mockUsers.length / limit)
    };
  }

  static async getUserById(id: string): Promise<IUserResponseDto> {
    const user = mockUsers.find(u => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  static async createUser(data: ICreateUserRequestDto): Promise<IUserResponseDto> {
    const newUser: IUserResponseDto = {
      id: String(mockUsers.length + 1),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockUsers.push(newUser);

    if (data.profile) {
      const newProfile: IUserProfileResponseDto = {
        id: String(Object.keys(mockUserProfiles).length + 1),
        userId: newUser.id,
        ...data.profile,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      mockUserProfiles[newUser.id] = newProfile;
    }

    return newUser;
  }

  static async updateUser(id: string, data: Partial<ICreateUserRequestDto>): Promise<IUserResponseDto> {
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    const user = mockUsers[index];
    const updatedUser: IUserResponseDto = {
      ...user,
      email: data.email ?? user.email,
      firstName: data.firstName ?? user.firstName,
      lastName: data.lastName ?? user.lastName,
      role: data.role ?? user.role,
      updatedAt: new Date().toISOString()
    };
    mockUsers[index] = updatedUser;
    return updatedUser;
  }

  static async deleteUser(id: string): Promise<void> {
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    mockUsers.splice(index, 1);
    delete mockUserProfiles[id];
  }

  static async getUserProfile(userId: string): Promise<IUserProfileResponseDto> {
    const profile = mockUserProfiles[userId];
    if (!profile) {
      throw new Error('User profile not found');
    }
    return profile;
  }

  static async updateUserProfile(
    userId: string,
    data: ICreateUserProfileRequestDto
  ): Promise<IUserProfileResponseDto> {
    if (!mockUsers.find(u => u.id === userId)) {
      throw new Error('User not found');
    }
    const profile = mockUserProfiles[userId];
    if (!profile) {
      throw new Error('User profile not found');
    }
    const updatedProfile: IUserProfileResponseDto = {
      ...profile,
      gender: data.gender ?? profile.gender,
      dateOfBirth: data.dateOfBirth ?? profile.dateOfBirth,
      phoneNumber: data.phoneNumber ?? profile.phoneNumber,
      address: data.address ?? profile.address,
      avatarUrl: data.avatarUrl ?? profile.avatarUrl,
      updatedAt: new Date().toISOString()
    };
    mockUserProfiles[userId] = updatedProfile;
    return updatedProfile;
  }

  static async uploadUserAvatar(userId: string, file: File): Promise<{ avatarUrl: string }> {
    if (!mockUsers.find(u => u.id === userId)) {
      throw new Error('User not found');
    }
    const profile = mockUserProfiles[userId];
    if (!profile) {
      throw new Error('User profile not found');
    }
    // In a real implementation, we would upload the file to a storage service
    // For mock data, we'll just return a fake URL
    const avatarUrl = `https://example.com/avatars/${userId}/${file.name}`;
    profile.avatarUrl = avatarUrl;
    profile.updatedAt = new Date().toISOString();
    return { avatarUrl };
  }

  static async getSchools(params: IPaginationParams): Promise<IPaginationResponse<ISchoolResponseDto>> {
    const { page = 1, limit = 10 } = params;
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = mockSchools.slice(start, end);

    return {
      items,
      total: mockSchools.length,
      page,
      limit,
      totalPages: Math.ceil(mockSchools.length / limit)
    };
  }

  static async getSchoolById(id: string): Promise<ISchoolResponseDto> {
    const school = mockSchools.find(s => s.id === id);
    if (!school) {
      throw new Error('School not found');
    }
    return school;
  }

  static async createSchool(data: ICreateSchoolRequestDto): Promise<ISchoolResponseDto> {
    const newSchool: ISchoolResponseDto = {
      id: String(mockSchools.length + 1),
      ...data,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockSchools.push(newSchool);
    return newSchool;
  }

  static async updateSchool(id: string, data: Partial<ICreateSchoolRequestDto>): Promise<ISchoolResponseDto> {
    const index = mockSchools.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('School not found');
    }
    const school = mockSchools[index];
    const updatedSchool: ISchoolResponseDto = {
      ...school,
      name: data.name ?? school.name,
      address: data.address ?? school.address,
      city: data.city ?? school.city,
      state: data.state ?? school.state,
      zipCode: data.zipCode ?? school.zipCode,
      country: data.country ?? school.country,
      phone: data.phone ?? school.phone,
      email: data.email ?? school.email,
      website: data.website ?? school.website,
      logoUrl: data.logoUrl ?? school.logoUrl,
      updatedAt: new Date().toISOString()
    };
    mockSchools[index] = updatedSchool;
    return updatedSchool;
  }

  static async deleteSchool(id: string): Promise<void> {
    const index = mockSchools.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('School not found');
    }
    mockSchools.splice(index, 1);
  }

  static async uploadSchoolLogo(schoolId: string, file: File): Promise<{ logoUrl: string }> {
    const school = mockSchools.find(s => s.id === schoolId);
    if (!school) {
      throw new Error('School not found');
    }
    const logoUrl = `https://example.com/logos/${schoolId}/${file.name}`;
    school.logoUrl = logoUrl;
    school.updatedAt = new Date().toISOString();
    return { logoUrl };
  }

  static async getClasses(params: IPaginationParams): Promise<IPaginationResponse<IClassResponseDto>> {
    const { page = 1, limit = 10 } = params;
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = mockClasses.slice(start, end);

    return {
      items,
      total: mockClasses.length,
      page,
      limit,
      totalPages: Math.ceil(mockClasses.length / limit)
    };
  }

  static async getClassById(id: string): Promise<IClassResponseDto> {
    const class_ = mockClasses.find(c => c.id === id);
    if (!class_) {
      throw new Error('Class not found');
    }
    return class_;
  }

  static async getClassesBySchool(schoolId: string, params: IPaginationParams): Promise<IPaginationResponse<IClassResponseDto>> {
    const { page = 1, limit = 10 } = params;
    const schoolClasses = mockClasses.filter(c => c.schoolId === schoolId);
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = schoolClasses.slice(start, end);

    return {
      items,
      total: schoolClasses.length,
      page,
      limit,
      totalPages: Math.ceil(schoolClasses.length / limit)
    };
  }

  static async getClassesByTeacher(teacherId: string, params: IPaginationParams): Promise<IPaginationResponse<IClassResponseDto>> {
    const { page = 1, limit = 10 } = params;
    const teacherClasses = mockClasses.filter(c => c.teacherId === teacherId);
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = teacherClasses.slice(start, end);

    return {
      items,
      total: teacherClasses.length,
      page,
      limit,
      totalPages: Math.ceil(teacherClasses.length / limit)
    };
  }

  static async createClass(data: ICreateClassRequestDto): Promise<IClassResponseDto> {
    const newClass: IClassResponseDto = {
      id: String(mockClasses.length + 1),
      ...data,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockClasses.push(newClass);
    mockClassStudents[newClass.id] = [];
    return newClass;
  }

  static async updateClass(id: string, data: Partial<ICreateClassRequestDto>): Promise<IClassResponseDto> {
    const index = mockClasses.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Class not found');
    }
    const class_ = mockClasses[index];
    const updatedClass: IClassResponseDto = {
      ...class_,
      name: data.name ?? class_.name,
      gradeLevel: data.gradeLevel ?? class_.gradeLevel,
      schoolId: data.schoolId ?? class_.schoolId,
      teacherId: data.teacherId ?? class_.teacherId,
      academicYear: data.academicYear ?? class_.academicYear,
      updatedAt: new Date().toISOString()
    };
    mockClasses[index] = updatedClass;
    return updatedClass;
  }

  static async deleteClass(id: string): Promise<void> {
    const index = mockClasses.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Class not found');
    }
    mockClasses.splice(index, 1);
    delete mockClassStudents[id];
  }

  static async addStudentToClass(classId: string, studentId: string): Promise<void> {
    if (!mockClasses.find(c => c.id === classId)) {
      throw new Error('Class not found');
    }
    if (!mockClassStudents[classId]) {
      mockClassStudents[classId] = [];
    }
    if (!mockClassStudents[classId].includes(studentId)) {
      mockClassStudents[classId].push(studentId);
    }
  }

  static async removeStudentFromClass(classId: string, studentId: string): Promise<void> {
    if (!mockClasses.find(c => c.id === classId)) {
      throw new Error('Class not found');
    }
    if (mockClassStudents[classId]) {
      mockClassStudents[classId] = mockClassStudents[classId].filter(id => id !== studentId);
    }
  }

  static async getClassStudents(classId: string, params: IPaginationParams): Promise<IPaginationResponse<IStudentResponseDto>> {
    if (!mockClasses.find(c => c.id === classId)) {
      throw new Error('Class not found');
    }
    const studentIds = mockClassStudents[classId] || [];
    const { page = 1, limit = 10 } = params;
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = studentIds.slice(start, end).map(id => ({
      id,
      userId: id,
      schoolId: mockClasses.find(c => c.id === classId)?.schoolId || '',
      classId,
      studentId: `STU${id}`,
      gradeLevel: GradeLevel.ELEMENTARY,
      enrollmentDate: new Date().toISOString(),
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));

    return {
      items,
      total: studentIds.length,
      page,
      limit,
      totalPages: Math.ceil(studentIds.length / limit)
    };
  }

  static async getStudents(params: IPaginationParams): Promise<IPaginationResponse<IStudentResponseDto>> {
    const { page = 1, limit = 10 } = params;
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = mockStudents.slice(start, end);

    return {
      items,
      total: mockStudents.length,
      page,
      limit,
      totalPages: Math.ceil(mockStudents.length / limit)
    };
  }

  static async getStudentById(id: string): Promise<IStudentResponseDto> {
    const student = mockStudents.find(s => s.id === id);
    if (!student) {
      throw new Error('Student not found');
    }
    return student;
  }

  static async getStudentsBySchool(schoolId: string, params: IPaginationParams): Promise<IPaginationResponse<IStudentResponseDto>> {
    const { page = 1, limit = 10 } = params;
    const schoolStudents = mockStudents.filter(s => s.schoolId === schoolId);
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = schoolStudents.slice(start, end);

    return {
      items,
      total: schoolStudents.length,
      page,
      limit,
      totalPages: Math.ceil(schoolStudents.length / limit)
    };
  }

  static async getStudentsByClass(classId: string, params: IPaginationParams): Promise<IPaginationResponse<IStudentResponseDto>> {
    const { page = 1, limit = 10 } = params;
    const classStudents = mockStudents.filter(s => s.classId === classId);
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = classStudents.slice(start, end);

    return {
      items,
      total: classStudents.length,
      page,
      limit,
      totalPages: Math.ceil(classStudents.length / limit)
    };
  }

  static async createStudent(data: ICreateStudentRequestDto): Promise<IStudentResponseDto> {
    const newStudent: IStudentResponseDto = {
      id: String(mockStudents.length + 1),
      ...data,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockStudents.push(newStudent);
    mockStudentParents[newStudent.id] = [];
    return newStudent;
  }

  static async updateStudent(id: string, data: Partial<ICreateStudentRequestDto>): Promise<IStudentResponseDto> {
    const index = mockStudents.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Student not found');
    }
    const student = mockStudents[index];
    const updatedStudent: IStudentResponseDto = {
      ...student,
      userId: data.userId ?? student.userId,
      schoolId: data.schoolId ?? student.schoolId,
      classId: data.classId ?? student.classId,
      studentId: data.studentId ?? student.studentId,
      gradeLevel: data.gradeLevel ?? student.gradeLevel,
      enrollmentDate: data.enrollmentDate ?? student.enrollmentDate,
      updatedAt: new Date().toISOString()
    };
    mockStudents[index] = updatedStudent;
    return updatedStudent;
  }

  static async deleteStudent(id: string): Promise<void> {
    const index = mockStudents.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Student not found');
    }
    mockStudents.splice(index, 1);
    delete mockStudentParents[id];
  }

  static async getStudentClasses(studentId: string, params: IPaginationParams): Promise<IPaginationResponse<IClassResponseDto>> {
    const student = mockStudents.find(s => s.id === studentId);
    if (!student) {
      throw new Error('Student not found');
    }
    const { page = 1, limit = 10 } = params;
    const studentClasses = mockClasses.filter(c => c.id === student.classId);
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = studentClasses.slice(start, end);

    return {
      items,
      total: studentClasses.length,
      page,
      limit,
      totalPages: Math.ceil(studentClasses.length / limit)
    };
  }

  static async getStudentParents(studentId: string, params: IPaginationParams): Promise<IPaginationResponse<any>> {
    if (!mockStudents.find(s => s.id === studentId)) {
      throw new Error('Student not found');
    }
    const parentIds = mockStudentParents[studentId] || [];
    const { page = 1, limit = 10 } = params;
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = parentIds.slice(start, end).map(id => ({
      id,
      userId: id,
      children: [studentId],
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));

    return {
      items,
      total: parentIds.length,
      page,
      limit,
      totalPages: Math.ceil(parentIds.length / limit)
    };
  }

  static async getTeachers(params: IPaginationParams): Promise<IPaginationResponse<ITeacherResponseDto>> {
    const { page = 1, limit = 10 } = params;
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = mockTeachers.slice(start, end);

    return {
      items,
      total: mockTeachers.length,
      page,
      limit,
      totalPages: Math.ceil(mockTeachers.length / limit)
    };
  }

  static async getTeacherById(id: string): Promise<ITeacherResponseDto> {
    const teacher = mockTeachers.find(t => t.id === id);
    if (!teacher) {
      throw new Error('Teacher not found');
    }
    return teacher;
  }

  static async getTeachersBySchool(schoolId: string, params: IPaginationParams): Promise<IPaginationResponse<ITeacherResponseDto>> {
    const { page = 1, limit = 10 } = params;
    const schoolTeachers = mockTeachers.filter(t => t.schoolId === schoolId);
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = schoolTeachers.slice(start, end);

    return {
      items,
      total: schoolTeachers.length,
      page,
      limit,
      totalPages: Math.ceil(schoolTeachers.length / limit)
    };
  }

  static async createTeacher(data: ICreateTeacherRequestDto): Promise<ITeacherResponseDto> {
    const newTeacher: ITeacherResponseDto = {
      id: String(mockTeachers.length + 1),
      ...data,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockTeachers.push(newTeacher);
    mockTeacherClasses[newTeacher.id] = [];
    mockTeacherStudents[newTeacher.id] = [];
    return newTeacher;
  }

  static async updateTeacher(id: string, data: Partial<ICreateTeacherRequestDto>): Promise<ITeacherResponseDto> {
    const index = mockTeachers.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Teacher not found');
    }
    const teacher = mockTeachers[index];
    const updatedTeacher: ITeacherResponseDto = {
      ...teacher,
      userId: data.userId ?? teacher.userId,
      schoolId: data.schoolId ?? teacher.schoolId,
      teacherId: data.teacherId ?? teacher.teacherId,
      subjects: data.subjects ?? teacher.subjects,
      updatedAt: new Date().toISOString()
    };
    mockTeachers[index] = updatedTeacher;
    return updatedTeacher;
  }

  static async deleteTeacher(id: string): Promise<void> {
    const index = mockTeachers.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Teacher not found');
    }
    mockTeachers.splice(index, 1);
    delete mockTeacherClasses[id];
    delete mockTeacherStudents[id];
  }

  static async getTeacherClasses(teacherId: string, params: IPaginationParams): Promise<IPaginationResponse<IClassResponseDto>> {
    if (!mockTeachers.find(t => t.id === teacherId)) {
      throw new Error('Teacher not found');
    }
    const { page = 1, limit = 10 } = params;
    const classIds = mockTeacherClasses[teacherId] || [];
    const teacherClasses = mockClasses.filter(c => classIds.includes(c.id));
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = teacherClasses.slice(start, end);

    return {
      items,
      total: teacherClasses.length,
      page,
      limit,
      totalPages: Math.ceil(teacherClasses.length / limit)
    };
  }

  static async getTeacherStudents(teacherId: string, params: IPaginationParams): Promise<IPaginationResponse<IStudentResponseDto>> {
    if (!mockTeachers.find(t => t.id === teacherId)) {
      throw new Error('Teacher not found');
    }
    const { page = 1, limit = 10 } = params;
    const studentIds = mockTeacherStudents[teacherId] || [];
    const teacherStudents = mockStudents.filter(s => studentIds.includes(s.id));
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = teacherStudents.slice(start, end);

    return {
      items,
      total: teacherStudents.length,
      page,
      limit,
      totalPages: Math.ceil(teacherStudents.length / limit)
    };
  }

  static async addSubjectToTeacher(teacherId: string, subject: string): Promise<void> {
    const teacher = mockTeachers.find(t => t.id === teacherId);
    if (!teacher) {
      throw new Error('Teacher not found');
    }
    if (!teacher.subjects.includes(subject)) {
      teacher.subjects.push(subject);
      teacher.updatedAt = new Date().toISOString();
    }
  }

  static async removeSubjectFromTeacher(teacherId: string, subject: string): Promise<void> {
    const teacher = mockTeachers.find(t => t.id === teacherId);
    if (!teacher) {
      throw new Error('Teacher not found');
    }
    const index = teacher.subjects.indexOf(subject);
    if (index !== -1) {
      teacher.subjects.splice(index, 1);
      teacher.updatedAt = new Date().toISOString();
    }
  }

  static async getParents(params: IPaginationParams): Promise<IPaginationResponse<IParentResponseDto>> {
    const { page = 1, limit = 10 } = params;
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = mockParents.slice(start, end);

    return {
      items,
      total: mockParents.length,
      page,
      limit,
      totalPages: Math.ceil(mockParents.length / limit)
    };
  }

  static async getParentById(id: string): Promise<IParentResponseDto> {
    const parent = mockParents.find(p => p.id === id);
    if (!parent) {
      throw new Error('Parent not found');
    }
    return parent;
  }

  static async createParent(data: ICreateParentRequestDto): Promise<IParentResponseDto> {
    const newParent: IParentResponseDto = {
      id: String(mockParents.length + 1),
      ...data,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockParents.push(newParent);
    mockParentNotifications[newParent.id] = [];
    return newParent;
  }

  static async updateParent(id: string, data: Partial<ICreateParentRequestDto>): Promise<IParentResponseDto> {
    const index = mockParents.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Parent not found');
    }
    const parent = mockParents[index];
    const updatedParent: IParentResponseDto = {
      ...parent,
      userId: data.userId ?? parent.userId,
      children: data.children ?? parent.children,
      updatedAt: new Date().toISOString()
    };
    mockParents[index] = updatedParent;
    return updatedParent;
  }

  static async deleteParent(id: string): Promise<void> {
    const index = mockParents.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Parent not found');
    }
    mockParents.splice(index, 1);
    delete mockParentNotifications[id];
  }

  static async getParentChildren(parentId: string, params: IPaginationParams): Promise<IPaginationResponse<IStudentResponseDto>> {
    const parent = mockParents.find(p => p.id === parentId);
    if (!parent) {
      throw new Error('Parent not found');
    }
    const { page = 1, limit = 10 } = params;
    const parentStudents = mockStudents.filter(s => parent.children.includes(s.id));
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = parentStudents.slice(start, end);

    return {
      items,
      total: parentStudents.length,
      page,
      limit,
      totalPages: Math.ceil(parentStudents.length / limit)
    };
  }

  static async addChildToParent(parentId: string, childId: string): Promise<void> {
    const parent = mockParents.find(p => p.id === parentId);
    if (!parent) {
      throw new Error('Parent not found');
    }
    if (!parent.children.includes(childId)) {
      parent.children.push(childId);
      parent.updatedAt = new Date().toISOString();
    }
  }

  static async removeChildFromParent(parentId: string, childId: string): Promise<void> {
    const parent = mockParents.find(p => p.id === parentId);
    if (!parent) {
      throw new Error('Parent not found');
    }
    const index = parent.children.indexOf(childId);
    if (index !== -1) {
      parent.children.splice(index, 1);
      parent.updatedAt = new Date().toISOString();
    }
  }

  static async getParentNotifications(parentId: string, params: IPaginationParams): Promise<IPaginationResponse<any>> {
    if (!mockParents.find(p => p.id === parentId)) {
      throw new Error('Parent not found');
    }
    const { page = 1, limit = 10 } = params;
    const notifications = mockParentNotifications[parentId] || [];
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = notifications.slice(start, end);

    return {
      items,
      total: notifications.length,
      page,
      limit,
      totalPages: Math.ceil(notifications.length / limit)
    };
  }

  static async markNotificationAsRead(parentId: string, notificationId: string): Promise<void> {
    if (!mockParents.find(p => p.id === parentId)) {
      throw new Error('Parent not found');
    }
    const notifications = mockParentNotifications[parentId] || [];
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
    }
  }

  static async login(data: ILoginRequestDto): Promise<IApiResponse<ILoginResponseDto>> {
    const user = mockUsers.find(u => u.email === data.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return {
      success: true,
      data: {
        accessToken: mockTokens.accessToken,
        refreshToken: mockTokens.refreshToken,
        user
      }
    };
  }

  static async refreshToken(data: IRefreshTokenRequestDto): Promise<IApiResponse<{ accessToken: string }>> {
    if (data.refreshToken !== mockTokens.refreshToken) {
      throw new Error('Invalid refresh token');
    }
    return {
      success: true,
      data: {
        accessToken: mockTokens.accessToken
      }
    };
  }

  static async changePassword(data: IChangePasswordRequestDto): Promise<void> {
    // In a real implementation, we would validate the current password
    // For mock data, we'll just return
  }

  static async getCurrentUser(): Promise<IUserResponseDto> {
    // In a real implementation, we would get the user from the token
    // For mock data, we'll just return the first user
    return mockUsers[0];
  }
} 