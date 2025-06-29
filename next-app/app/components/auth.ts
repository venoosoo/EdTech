

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const response = await fetch("http://localhost:8080/me", {
      method: 'GET',
      credentials: "include", // Send cookies
    });

    if (response.ok) {
      // Optionally, you can parse the response to check additional details, such as user data
      const data = await response.json();
      console.log("User authenticated:", data);
      return true;
    } else {
      console.log("User not authenticated. Status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Auth check failed:", error);
    return false;
  }
};





// Logout by making a request that clears the cookie on server
export const logout = async (): Promise<void> => {
  try {
    await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include"
    });
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export const handleLogin = async (username: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Login: username, Password: password }),
      credentials: "include",

    });

    if (response.ok) {
      const data = await response.json();
      console.log(data)
      localStorage.setItem("id",data.user_id)
      localStorage.setItem("class_id", data.class_id)
      return true;
    } else {
      console.log(response)
      console.error('Login failed:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export const handleRegister = async (
  username: string,
  password: string
): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Login: username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem("id", data.user_id);
      localStorage.setItem("class_id", data.class_id);
      return true; // ✅ success path
    } else {
      return false; // ✅ failure path
    }
  } catch (error) {
    console.error('Registration error:', error);
    return false; // ✅ error path
  }
};


export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1])); 
    const exp = payload.exp * 1000;  
    return Date.now() > exp; 
  } catch (error) {
    console.error('Error decoding token', error);
    return true; 
  }
};


