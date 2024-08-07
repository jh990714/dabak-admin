import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/billing";

export const getBillingInfo = async (impUid) => {
  try {
    const response = await axios.get(`${API_URL}/${impUid}`);
    console.log("BillingInfo data : ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching billing info:", error);
    throw error;
  }
};

export const getBillingInfos = async (impUids) => {
  try {
    const response = await axios.post(`${API_URL}`, { impUids });
    console.log("Billing Export To Excel:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
