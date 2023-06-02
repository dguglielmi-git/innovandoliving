import { authFetch, fetchRetryParams } from "../utils/fetch";

export async function registerApi(formData) {
  try {
    const url = `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/auth/local/register`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetchRetryParams(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function loginApi(formData) {
  try {
    const url = `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/auth/local`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetchRetryParams(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function resetPasswordApi(email) {
  try {
    const url = `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/auth/forgot-password`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    const response = await fetchRetryParams(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getMeApi(logout) {
  try {
    const url = `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/users/me`;
    const result = await authFetch(url, null, logout);
    return result ? result : null;
  } catch (error) {
    return null;
  }
}

export async function updateNameApi(idUser, data, logout) {
  try {
    const url = `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateEmail(idUser, email, logout) {
  try {
    const url = `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateLanguage(idUser, language, logout) {
  try {
    const url = `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ language }),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updatePasswordApi(idUser, password, logout) {
  try {
    const url = `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
