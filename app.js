const subtleColors = [
    {
      name: "Lavender Mist",
      color: "rgba(230, 224, 238, 0.8)",
    },
    {
      name: "Mint Green",
      color: "rgba(218, 240, 233, 0.8)",
    },
    {
      name: "Peach Blossom",
      color: "rgba(255, 235, 238, 0.8)",
    },
    {
      name: "Sky Blue",
      color: "rgba(219, 238, 248, 0.8)",
    },
    {
      name: "Creamy Ivory",
      color: "rgba(255, 253, 240, 0.8)",
    },
    {
      name: "Light Gray",
      color: "rgba(238, 238, 238, 0.8)",
    },
    {
      name: "Pale Beige",
      color: "rgba(245, 240, 235, 0.8)",
    },
    {
      name: "Soft Sand",
      color: "rgba(245, 240, 230, 0.8)",
    },
    {
      name: "Silver Gray",
      color: "rgba(220, 220, 220, 0.8)",
    },
    {
      name: "Pearl White",
      color: "rgba(255, 255, 245, 0.8)",
    },
    {
      name: "Lilac Haze",
      color: "rgba(235, 225, 240, 0.8)",
    },
    {
      name: "Seafoam Green",
      color: "rgba(220, 240, 238, 0.8)",
    },
    {
      name: "Apricot Glow",
      color: "rgba(255, 235, 225, 0.8)",
    },
    {
      name: "Cloud White",
      color: "rgba(255, 255, 255, 0.8)",
    },
    {
      name: "Mist Blue",
      color: "rgba(225, 235, 245, 0.8)",
    },
    {
      name: "Soft Pink",
      color: "rgba(255, 220, 230, 0.8)",
    },
    {
      name: "Pale Yellow",
      color: "rgba(255, 245, 220, 0.8)",
    },
    {
      name: "Lavender Blush",
      color: "rgba(255, 220, 240, 0.8)",
    },
    {
      name: "Baby Blue",
      color: "rgba(220, 230, 245, 0.8)",
    },
    {
      name: "Creamy Beige",
      color: "rgba(245, 240, 235, 0.8)",
    },
    {
      name: "Light Green",
      color: "rgba(225, 240, 230, 0.8)",
    },
    {
      name: "Pale Orange",
      color: "rgba(255, 235, 220, 0.8)",
    },
    {
      name: "Soft Purple",
      color: "rgba(230, 220, 240, 0.8)",
    },
    {
      name: "Ivory White",
      color: "rgba(255, 253, 245, 0.8)",
    },
    {
      name: "Light Yellow",
      color: "rgba(255, 245, 225, 0.8)",
    },
    {
      name: "Pale Blue",
      color: "rgba(220, 230, 240, 0.8)",
    },
    {
      name: "Soft Red",
      color: "rgba(255, 220, 225, 0.8)",
    },
    {
      name: "Creamy White",
      color: "rgba(255, 253, 245, 0.8)",
    },
    {
      name: "Light Pink",
      color: "rgba(255, 230, 235, 0.8)",
    },
  ];

const apiKey = 'a1b2c38d3e5936db4b7e8095d679b7dc'; // Your API key
const newsContainer = document.getElementById('news-container');
const searchInput = document.getElementById('search-input');
const languageSelect = document.getElementById('language');
const searchInSelect = document.getElementById('searchIn');
const fromInput = document.getElementById('from');
const toInput = document.getElementById('to');
const maxResults = 100; 

const randomNum = Math.floor(Math.random() * subtleColors.length) - 1;
  
//   console.log(subtleColors[i]);
for (let i = 0; i < subtleColors.length; i++) {
  // console.log(randomNum);
  // console.log(subtleColors[randomNum]);
  if (randomNum == i) {
    // console.log("inside the loop")
    document.body.style.backgroundColor = subtleColors[i].color;
    loadNews(); 
  }
}

// Load news with filters
async function loadNews() {
    const query = searchInput.value.trim() || "technology";
    const language = languageSelect.value || 'en';
    const searchIn = searchInSelect.value || 'title,description';
    const fromDate = fromInput.value;
    const toDate = toInput.value;

    const isValidDate = (dateStr) => /^\d{4}-\d{2}-\d{2}$/.test(dateStr);

    let url = `https://gnews.io/api/v4/search?apikey=${apiKey}&q=${encodeURIComponent(query)}&lang=${language}&in=${searchIn}&max=${maxResults}`;

    // Optional date filters
    if (fromDate && isValidDate(fromDate)) url += `&from=${fromDate}T00:00:00Z`;
    if (toDate && isValidDate(toDate)) url += `&to=${toDate}T23:59:59Z`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.articles) {
            displayNews(data.articles);
        } else if (data.message) {
            newsContainer.innerHTML = `<p>${data.message}</p>`;
        } else {
            newsContainer.innerHTML = '<p>No news found</p>';
        }
    } catch (error) {
        console.error('Error fetching the news:', error);
        newsContainer.innerHTML = '<p>Error fetching the news.</p>';
    }
}

// Display the news
function displayNews(articles) {
    newsContainer.innerHTML = '';

    articles.forEach(article => {
        if (article.image) {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <div class="source">${article.source.name}</div>
                <img src="${article.image}" alt="News Image">
                <h2>${article.title}</h2>
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            `;

            newsContainer.appendChild(card);
        }
    });
}
searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        loadNews();
    }
});

// Adding event listeners to other filters
languageSelect.addEventListener('change', loadNews);
searchInSelect.addEventListener('change', loadNews);
fromInput.addEventListener('change', loadNews);
toInput.addEventListener('change', loadNews);

// Search icon click event
document.querySelector('.search-icon').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission or page reload
    loadNews();
});
