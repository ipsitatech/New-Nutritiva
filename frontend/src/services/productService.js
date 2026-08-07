const API = "http://localhost:5001/api/products";

export async function getProducts() {
  const response = await fetch(API);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return await response.json();
}