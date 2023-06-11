import createApi from "./api-factory";

const authApi = createApi({});

const login = async (data: { credential?: string }) => {
  return await authApi.post<{ jwtToken: string }>("google/login", data).then((res) => {
    localStorage.setItem("jwtToken", res.data.jwtToken);
  });
};

const authService = {
  login,
};
export default authService;