import axios from "axios";
import Cookies from "js-cookie";

export const fetchInfectionData = async (id) => {
  try {
    const token = Cookies.get("token");
    const sessionid = Cookies.get("sessionid");

    if (!token || !sessionid) {
      throw new Error("Tokens are missing");
    }

    const response = await axios.post(
      `${process.env.REACT_APP_API}/sheep-view`,
      { sheepId: id }, // Passer l'ID dans le corps de la requête
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
