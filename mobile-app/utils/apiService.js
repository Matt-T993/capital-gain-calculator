import api from "./api";

export async function fetchUserAssets() {
  try {
    const response = await api.get("/user-assets");
    return response.data;
  } catch (error) {
    console.error("Getting User asset failed: ", error);
    r;
    throw error;
  }
}

export async function fetchUserTotalAmount() {
  try {
    const response = await api.get("/event/totalAmount");
    return response.data;
  } catch (error) {
    console.error("Getting user Totalamount failed: ", error);
    throw error;
  }
}

export async function fetchUserEvent() {
  try {
    const response = await api.get("/event/");
    return response.data;
  } catch (error) {
    console.error("Getting user event failed: ", error);
    throw error;
  }
}

export async function fetchAsset() {
  try {
    const response = await api.get("/asset/");
    return response.data;
  } catch (error) {
    console.error("Getting asset failed: ", error);
    throw error;
  }
}

export async function fetchUserData() {
  try {
    const response = await api.get("/user-data");
    return response.data;
  } catch (error) {
    console.error("Getting user data failed: ", error);
    throw error;
  }
}

export async function fetchUserTaxCalculation() {
  try {
    const response = await api.get("/calculate-tax");
    return response.data;
  } catch (error) {
    console.error("Getting user tax calculation failed: ", error);
    throw error;
  }
}

// const API_BASE_URL = "http://localhost:8080/api/v1";
export async function updateUserData(userdata, newUserData) {
  {
    console.log(userdata.username);
    console.log(userdata.email);
    console.log(userdata.password);
    console.log(newUserData.username);
    console.log(newUserData.email);
    console.log(newUserData.password);
  }
  try {
    const endpoint = "/settings";
    const response = await api.put(endpoint, newUserData);

    if (response.status === 200) {
      console.log("User data updated successfully.");
      return true;
    } else {
      console.error("Failed to update user data:", response.data);
      return false;
    }
  } catch (error) {
    console.error("Error updating user data:", error);
    return false;
  }
}

export async function createEvent(userEventData) {
  try {
    const response = await api.post("/event/", userEventData);
    return response.data;
  } catch (error) {
    console.error("error posting user event ", error);
    throw error;
  }
}
export async function updateEvent(id, updateEvent) {
  try {
    const response = await api.put(`/event/${id}`, updateEvent);
    return response.data;
  } catch (error) {
    console.error("error updating user event ", error);
    throw error;
  }
}

export async function deleteEvent(id) {
  try {
    const response = await api.delete(`/event/${id}`);
    return response.data;
  } catch (error) {
    console.error("error updating user event ", error);
    throw error;
  }
}
