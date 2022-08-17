import AsyncStorage from '@react-native-async-storage/async-storage';

import {api} from '@src/api';

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  success: true;
  data: {
    type: string;
    message: string;
    data: {
      user: {
        id: number;
        created_at: string;
        updated_at: string;
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        role: string;
        verified: boolean;
      };
      token: string;
    };
  };
};

//Mark - login
const login = async (data: LoginRequest) => {
  const response = await api.post<LoginResponse>('/api/auth/login', data);

  if (response.data.success) {
    try {
      await AsyncStorage.setItem('@token', response.data.data.data.token);
    } catch (e) {
      console.error('Error', e);
    }
  }

  return response.data;
};

const loginService = {
  login,
};

export {loginService};
export type {LoginRequest, LoginResponse};
