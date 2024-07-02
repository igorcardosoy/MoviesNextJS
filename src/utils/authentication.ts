"use client"

import useSWR from "swr";
import { API_URL } from "./requests";
import { User } from "@/entities/Users";

export type SWRUserRes = {
  data: User,
  error: any,
  isLoading: boolean
}

const fetcherWithToken = async (url: string) => {
  let token = window.localStorage.getItem("token");

  const options = {
    method: 'GET',
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${token}`
    },
  };

  const response = await fetch(url, options);
  return await response.json();
};

async function authenticate(user: { email: string, password: string }): Promise<boolean> {

  const options = {
    method: 'POST',
    body: JSON.stringify({ "email": user.email, "password": user.password }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }

  const data = await fetch(API_URL + '/login', options)
  const result = await data.json();

  if (result.accessToken && result.user.id) {
    window.localStorage.setItem("token", result.accessToken)
    window.localStorage.setItem("userId", result.user.id)

    return true;
  }

  return false;
}



export function useAuthenticated(): boolean {
  const data = useSWR(API_URL + '/660/users/', fetcherWithToken);

  if (!data.isLoading && !data.error) {
    const result = data.data

    if (result != 'jwt malformed') {
      return true
    }
  }

  return false
}

export async function isAuthenticated(): Promise<User | boolean> {
  let token = window.localStorage.getItem("token");
  let id = window.localStorage.getItem("userId");

  const options = {
    method: 'GET',
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${token}`
    },
  };

  const data = await fetch(API_URL + `/660/users/${id}`, options)
  const res = await data.json();

  if (res != 'jwt malformed' && res != 'Missing token') {
    return res as User;
  }

  return false;
}

function cleanToken() {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("userId");
}

export { authenticate, cleanToken }