const API_URL = "https://api.imgflip.com/get_memes";

let memes = [];
let intervalId = null;

async function getMemes() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.success && data.data.memes.length > 0) {
      memes = data.data.memes;
      showRandomMeme();
    } else {
      throw new Error("No memes found in API response");
    }
  } catch (err) {
    console.error("Error fetching memes:", err);
    document.getElementById("meme-container").innerHTML =
      "<p class='text-danger'>Failed to load memes. Try again later.</p>";
  }
}

function showRandomMeme() {
  if (memes.length === 0) return;

  const randomIndex = Math.floor(Math.random() * memes.length);
  const meme = memes[randomIndex];

  const img = document.getElementById("meme-img");
  img.src = meme.url;
  img.alt = meme.name;
}

document.getElementById("load-btn").addEventListener("click", getMemes);

document.getElementById("auto-update").addEventListener("change", (e) => {
  if (e.target.checked) {
    // автооновлення кожні 10 секунд
    intervalId = setInterval(showRandomMeme, 10000);
    document.getElementById("load-btn").disabled = true;
  } else {
    clearInterval(intervalId);
    document.getElementById("load-btn").disabled = false;
  }
});
