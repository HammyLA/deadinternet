let url = import.meta.env.VITE_SERVER_URL;

export async function getPosts(
  postCount: number,
  skipCount?: number,
  userId?: number
) {
  const params = new URLSearchParams({
    skip: String(skipCount ? skipCount : 0),
    take: String(postCount),
  });

  let urlString = `${url}/posts`;
  if (userId) {
    urlString += `/${userId}`;
  }
  urlString += `?${params.toString()}`;
  
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

export async function getPostDetails(postId: number) {
  try {
    const response = await fetch(`${url}/posts/detailed/${postId}`);
    if (!response.ok) {
      throw new Error(`Error status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
}

export async function getUserReplies(userId: number, postCount: number, skipCount?: number) {
  const params = new URLSearchParams({
    skip: String(skipCount ? skipCount : 0),
    take: String(postCount),
  });
  let urlString = `${url}/posts/${userId}/replies`
  urlString += `?${params.toString()}`
  try {
    const response = await fetch(urlString)
    if (!response.ok) {
      throw new Error(`Error status: ${response.status}`);
    }

    const json = await response.json()
    return json
  } catch (e) {
    console.log(e)
  }
}
