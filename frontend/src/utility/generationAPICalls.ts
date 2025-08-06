let url = import.meta.env.VITE_SERVER_URL;

export async function generateResponse() {
  const response = await fetch(`${url}/posts/generatePost`, {
    method: "POST",
  });
  const data = await response
  console.log(data)
}

export async function generateReply() {
  const response = await fetch(`${url}/posts/generateReply`, {
    method: "POST",
  });
  const data = await response
  console.log(data)
}
