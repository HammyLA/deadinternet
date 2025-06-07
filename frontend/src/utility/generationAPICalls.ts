import React from "react";

export async function generateResponse(
  formData: React.FormEvent<HTMLFormElement>
) {
  formData.preventDefault();
  const input = (formData.target as HTMLFormElement).input.value;
  const response = await fetch(
    `http://localhost:3000/generate-original/${input}`
  );
  const data = await response.text();
  const responseElement = document.getElementById("response");
  if (responseElement) {
    responseElement.innerHTML = data;
  }
  console.log(data);
}

export async function generateReply(formData: React.FormEvent<HTMLFormElement>) {
    formData.preventDefault();
    const input = (formData.target as HTMLFormElement).input.value;
    const response = await fetch(
        `http://localhost:3000/generate-reply/${input}`
    );
    const data = await response.text();
    const responseElement = document.getElementById("response");
    if (responseElement) {
        responseElement.innerHTML = data;
    }
    console.log(data);
}