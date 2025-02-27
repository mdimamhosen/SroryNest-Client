import { jwtDecode } from "jwt-decode";

export const verifyTokenFrontend = (encoddedtoken: string) => {
  return jwtDecode(encoddedtoken);
};
