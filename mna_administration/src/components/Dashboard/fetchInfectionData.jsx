// src/api/fetchInfectionData.js
import axios from "axios";
import Cookies from "js-cookie";

export const fetchInfectionData = async () => {
  try {
    const token = Cookies.get("token");
    const sessionid = Cookies.get("sessionid");

    if (!token || !sessionid) {
      throw new Error("Tokens are missing");
    }

    const response = await axios.get(
      `${process.env.REACT_APP_API}/flock-of-sheep`,
      {
        headers: {
          Authorization: `Bearer ${token},${sessionid}`,
        },
      }
    );

    return response.data.sheep;
  } catch (error) {
    console.error("Error fetching infection data:", error);
    throw error;
  }
};
