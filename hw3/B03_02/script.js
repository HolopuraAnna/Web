const API = "https://jsonplaceholder.typicode.com/posts/";
const input = document.getElementById("post-ids");
const output = document.getElementById("output");
const button = document.getElementById("load-btn");

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchPost(id) {
  await delay(1000); // уповільнюємо запит
  const response = await fetch(API + id);
  if (!response.ok) throw new Error("Помилка при отриманні поста " + id);
  return await response.json();
}

async function loadPostsSequentially() {
  output.innerHTML = "<p><em>Завантаження...</em></p>";

  const ids = input.value.split(",").map(x => x.trim()).filter(Boolean);
  if (ids.length !== 3) {
    output.innerHTML = "<p class='text-danger'>Будь ласка, введіть рівно 3 номери постів.</p>";
    return;
  }

  output.innerHTML = ""; // очистити перед новим виводом

  try {
    for (let id of ids) {
      const data = await fetchPost(id);
      const postDiv = document.createElement("div");
      postDiv.classList.add("card", "mb-2", "p-2");
      postDiv.innerHTML = `<h5>${data.title}</h5><p>${data.body}</p>`;
      output.appendChild(postDiv);
    }
    output.innerHTML += `<p class="text-success">✅ Усі пости завантажено успішно!</p>`;
  } catch (error) {
    console.error(error);
    output.innerHTML = `<p class="text-danger">❌ Помилка: ${error.message}</p>`;
  }
}

button.addEventListener("click", loadPostsSequentially);
