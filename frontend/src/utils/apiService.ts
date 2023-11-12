/* eslint-disable no-param-reassign */
import { removeTokens } from './authUtils';
import api, { ApiResponse, handleAxiosError } from './axiosService';

type UserLoginData = {
  emailOrUsername: string;
  password: string;
  rememberMe: boolean;
};

type UserRegisterData = {
  email: string;
  username: string;
  password: string;
};

type UpdateEvent = {
  quantity?: number;
  pricePerUnit?: number;
  eventDate?: string;
};

export async function fetchUserData(): Promise<ApiResponse> {
  try {
    const response = await api.get<ApiResponse>('/user-data');
    return response.data;
  } catch (error) {
    return handleAxiosError(error, 'Fetching User Data Failed');
  }
}

export async function registerUser(userRegisterData: UserRegisterData): Promise<ApiResponse> {
  try {
    const response = await api.post<ApiResponse>('/register', userRegisterData);
    return response.data;
  } catch (error) {
    return handleAxiosError(error, 'Registration Failed');
  }
}

export async function loginUser(userLoginData: UserLoginData): Promise<ApiResponse> {
  try {
    const response = await api.post<ApiResponse>('/login', userLoginData);
    return response.data;
  } catch (error) {
    return handleAxiosError(error, 'Login Failed');
  }
}

export async function logoutUser(): Promise<ApiResponse> {
  try {
    const response = await api.post<ApiResponse>('/logout');
    removeTokens();
    return response.data;
  } catch (error) {
    return handleAxiosError(error, 'Logout Failed');
  }
}

export async function generateTaxPayable(): Promise<ApiResponse> {
  try {
    const response = await api.get<ApiResponse>('/calculate-tax');
    return response.data;
  } catch (error) {
    return handleAxiosError(error, 'Logout Failed');
  }
}
export async function fetchUserAssets(): Promise<ApiResponse> {
  try {
    const response = await api.get<ApiResponse>('/user-assets');
    return response.data;
  } catch (error) {
    return handleAxiosError(error, 'Getting User asset failed ');
  }
}

export async function fetchUserTotalAmount(): Promise<ApiResponse> {
  try {
    const response = await api.get<ApiResponse>('/event/totalAmount');

    return response.data;
  } catch (error) {
    return handleAxiosError(error, 'Geting user Totalamount failed');
  }
}

export async function updateEvent(id: number, updateEvent: UpdateEvent): Promise<ApiResponse> {
  try {
    const response = await api.put(`/event/${id}`, updateEvent);
    return response.data;
  } catch (error) {
    return handleAxiosError(error, 'error');
  }
}

export async function deleteEvent(id: number): Promise<ApiResponse> {
  try {
    const response = await api.delete(`/event/${id}`);
    return response.data;
  } catch (error) {
    return handleAxiosError(error, 'error');
  }
}
