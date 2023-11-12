import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

export async function setSessionToken(token) {
  await AsyncStorage.setItem("SESSION-TOKEN", token);
}

export async function getSessionToken() {
  const token = await AsyncStorage.getItem("SESSION-TOKEN");
  return token ? `Bearer ${token}` : null;
}

export async function setXsrfToken(token) {
  await AsyncStorage.setItem("XSRF-TOKEN", token);
}

export async function getXsrfToken() {
  let token = await AsyncStorage.getItem("XSRF-TOKEN");
  if (token === null) {
    token = uuid.v4();
    await setXsrfToken(token);
  }
  return token;
}

export async function setRememberMeToken(token) {
  await AsyncStorage.setItem("REMEMBER-ME-TOKEN", token);
}

export async function getRememberMeToken() {
  return await AsyncStorage.getItem("REMEMBER-ME-TOKEN");
}

export async function removeTokens() {
  AsyncStorage.removeItem("SESSION-TOKEN");
  AsyncStorage.removeItem("REMEMBER-ME-TOKEN");
}
