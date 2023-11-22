import { getToken, hasExpiredToken } from "../api/token";

export async function authFetch(url, params, logout) {
  const token = getToken();
  if (!token) {
    logout();
  } else {
    if (hasExpiredToken(token)) {
      logout();
    } else {
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetchRetryParams(url, paramsTemp);
        return await response.json();
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  }
}

function wait(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export function fetchRetry(
  url,
  tries = process.env.NEXT_PUBLIC_RETRY_QUERY_ATTEMPTS
) {
  function onError(err) {
    console.log("Retrying fetch...");
    let triesLeft = tries - 1;
    if (!triesLeft) {
      return new Response(JSON.stringify({}), { status: 200 });
    }
    return wait(process.env.NEXT_PUBLIC_DELAY_RETRY_FETCH).then(() =>
      fetchRetry(url, triesLeft)
    );
  }
  return fetch(url).catch(onError);
}

export function fetchRetryParams(
  url,
  params,
  tries = process.env.NEXT_PUBLIC_RETRY_QUERY_ATTEMPTS
) {
  function onError(err) {
    console.log("Retrying fetchRetryParams...");
    let triesLeft = tries - 1;
    if (!triesLeft) {
      return new Response(JSON.stringify({}), { status: 200 });
    }
    return wait(process.env.NEXT_PUBLIC_DELAY_RETRY_FETCH).then(() =>
      fetchRetryParams(url, params, triesLeft)
    );
  }
  return fetch(url, params).catch(onError);
}
