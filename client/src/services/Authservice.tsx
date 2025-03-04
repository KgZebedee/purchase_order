export const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role); // Store role for authorization
      return response.data;
    } catch (error) {
      throw new Error("Login failed!");
    }
  };
  
  export const getRole = () => {
    return localStorage.getItem("role");
  };
  
  export const isAdmin = () => {
    return getRole() === "admin";
  };
  
  export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };
  