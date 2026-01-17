const GOOGLE_BOOKS_KEY = import.meta.env.VITE_GOOGLE_BOOKS_KEY;

export async function fetchBookFromGoogle(isbn) {
  if (!isbn) return null;

  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${GOOGLE_BOOKS_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.items || data.items.length === 0) {
    return null;
  }

  const book = data.items[0].volumeInfo;

  return {
    title: book.title || "",
    author: book.authors?.join(", ") || "",
    description: book.description || "",
    thumbnail: book.imageLinks?.thumbnail || "",
    publishedDate: book.publishedDate || "",
    publisher: book.publisher || "",
  };
}
