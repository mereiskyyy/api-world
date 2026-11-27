// 1. БӨЛІМДЕРДІ АУЫСТЫРУ
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");
}


// 2. DUMMYJSON - ТАУАРЛАР
async function searchProducts() {
    const query = document.getElementById("productSearch").value;

    const url = query
        ? `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`
        : "https://dummyjson.com/products?limit=12";

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Қате");

        const data = await response.json();

        document.getElementById("productList").innerHTML =
            data.products.map(product => `
                <div class="card">
                    <img src="${product.thumbnail}" alt="Тауар">
                    <h3>${product.title}</h3>
                    <p>Бағасы: $${product.price}</p>
                    <p>Санаты: ${product.category}</p>
                </div>
            `).join("");

    } catch (error) {
        document.getElementById("productList").textContent =
            "Тауарларды жүктеу мүмкін болмады!";
    }
}


// 3. FRANKFURTER - ВАЛЮТА
async function convertCurrency() {
    const amount = Number(document.getElementById("amount").value);

    const from = document.getElementById("fromCurrency").value;
    const to = document.getElementById("toCurrency").value;

    const result = document.getElementById("currencyResult");

    if (!Number.isFinite(amount) || amount < 0) {
        result.textContent = "Соманы дұрыс енгізіңіз!";
        return;
    }

    if (from === to) {
        result.textContent = `${amount} ${from} = ${amount} ${to}`;
        return;
    }

    // Frankfurter API KZT валютасын қолдамайды
    if (from === "KZT" || to === "KZT") {
        result.textContent = "KZT бұл API-да қолдау таппайды. USD, EUR, GBP таңдаңыз.";
        return;
    }

    try {
        result.textContent = "Есептелуде...";

        const response = await fetch(
            `https://api.frankfurter.dev/v2/rate/${from}/${to}`
        );

        if (!response.ok) throw new Error("Валюта табылмады");

        const data = await response.json();

        const converted = amount * data.rate;

        result.textContent =
            `${amount} ${from} = ${converted.toFixed(2)} ${to}`;

    } catch (error) {
        result.textContent = "Валюта бағамын алу мүмкін болмады!";
    }
}


// 4. SAMPLEAPIS - КОФЕ
async function loadCoffee() {
    try {
        const response = await fetch(
            "https://api.sampleapis.com/coffee/hot"
        );

        if (!response.ok) throw new Error("Қате");

        const data = await response.json();

        document.getElementById("coffeeList").innerHTML =
            data.slice(0, 12).map(coffee => `
                <div class="card">
                    <h3>${coffee.title}</h3>
                    <p>${coffee.description || "Кофе туралы ақпарат"}</p>
                </div>
            `).join("");

    } catch (error) {
        document.getElementById("coffeeList").textContent =
            "Кофе мәліметтері табылмады!";
    }
}


// 5. THEMEALDB - ТАҒАМ РЕЦЕПТТЕРІ
async function searchMeals() {
    const query = document.getElementById("mealSearch").value.trim();

    if (!query) {
        document.getElementById("mealList").textContent =
            "Тағам атауын енгізіңіз!";
        return;
    }

    try {
        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
        );

        if (!response.ok) throw new Error("Қате");

        const data = await response.json();

        if (!data.meals) {
            document.getElementById("mealList").textContent =
                "Тағам табылмады!";
            return;
        }

        document.getElementById("mealList").innerHTML =
            data.meals.map(meal => `
                <div class="card">
                    <img src="${meal.strMealThumb}" alt="Тағам">
                    <h3>${meal.strMeal}</h3>
                    <p>Ел: ${meal.strArea || "Белгісіз"}</p>
                    <a href="${meal.strSource || meal.strYoutube || "#"}"
                       target="_blank">Рецептті қарау</a>
                </div>
            `).join("");

    } catch (error) {
        document.getElementById("mealList").textContent =
            "Рецепттерді жүктеу мүмкін болмады!";
    }
}


// 6. UNIVERSITY API - УНИВЕРСИТЕТТЕР
async function searchUniversities() {
    const country =
        document.getElementById("universitySearch").value.trim()
        || "Kazakhstan";

    try {
        const response = await fetch(
            `https://universities.hipolabs.com/search?country=${encodeURIComponent(country)}`
        );

        if (!response.ok) throw new Error("Қате");

        const data = await response.json();

        document.getElementById("universityList").innerHTML =
            data.slice(0, 30).map(university => `
                <div class="card">
                    <h3>${university.name}</h3>
                    <p>Ел: ${university.country}</p>
                    <p>Домен: ${university.domains.join(", ")}</p>
                    <a href="${university.web_pages[0]}" target="_blank">
                        Сайтты ашу
                    </a>
                </div>
            `).join("") || "Университет табылмады!";

    } catch (error) {
        document.getElementById("universityList").textContent =
            "Университеттерді жүктеу мүмкін болмады!";
    }
}


// 7. САЙТТЫ ІСКЕ ҚОСУ
showPage("products");
searchProducts();