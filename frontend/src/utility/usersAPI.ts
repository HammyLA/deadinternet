let url = import.meta.env.VITE_SERVER_URL;

export async function getUser(userId: number) {

  let urlString = `${url}/users/${userId}`;
  try {
    const response = await fetch(urlString);
    if (!response.ok) {
      throw new Error(`Error status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
}