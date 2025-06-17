

export async function getData(postCount: number) {
  let url = import.meta.env.VITE_SERVER_URL;
  const params = new URLSearchParams({
    skip: String(0),
    take: String(postCount)
  })

  try {
    const response = await fetch(`${url}/posts?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Error status: ${response.status}`);
    }

    const json = await response.json();
    return json
  } catch (e) {
    console.log(e);
  }
}
