//HTML-element i login vy    
const loginSection = document.getElementById("login-section");
const showRegisterBtn = document.getElementById("show-register");
const loginError = document.getElementById("login-error");
const loginBtn = document.getElementById("loginBtn");

//HTML-element i skapa konto vy 
const registerSection = document.getElementById("register-section");
const registerForm = document.getElementById("register-form");
const registerError = document.getElementById("register-error");
const registerSuccess = document.getElementById("register-success");

//HTML-element i inloggad vy
const appSection = document.getElementById("app-section");
const logoutBtn = document.getElementById("logout-btn");
const previousPurchases = document.getElementById("previous-purchases");

//Hårdkodade testanvändare och spara dessa i en array med objekt.
    const hardcodedUsers = [
        { username: "sofia", password: "password123" },
        { username: "tea", password: "password123" },
        { username: "marko", password: "password123" },
        { username: "kristoffer", password: "password123" },
        { username: "william", password: "password123" }
    ];

// ============================================================
/*I HTML finns en p-tagg som visar felmeddelanden. 
Med hjälp av CSS finns en klass-egenskap om att dölja element.
När JS anropar funktionen rensas alla meddelanden som syns på webbsidan.
*/
function clearErrors() {
    loginError.classList.add("hidden");
    registerError.classList.add("hidden");
    registerSuccess.classList.add("hidden");
}

/*I HTML finns en p-tagg som visar felmeddelanden. 
Med hjälp av CSS finns en klass-egenskap om att dölja element.
När JS anropar funktionen visas meddelandet för användaren.
Parametrarna styr vilket elementet och vilket meddelande som ska visas. 
*/ 
function showError(element, message) {
    element.textContent = message;
    element.classList.remove("hidden");
}

/*Vid inloggning/registrering hämtas användare från localStorage.
Med ternär-operator kollar vi: 
-om användare finns så konverteras strängen till JS-objekt
- annars sparas det som en tom array
*/
function getUsersFromStorage() {
    const usersJson = localStorage.getItem("users");
    return usersJson ? JSON.parse(usersJson) : [];
}

// ============================================================
// Hämtar produkter som "tidigare köp" från Fake Store API
async function loadPreviousPurchases() {
    previousPurchases.classList.remove("error-message"); // tar bort eventuella felmeddelandet från tidigare.
    previousPurchases.textContent = "Loading previous-purchases...";

    try {
        //Hämta fyra specifika produkter med egna fetch-anrop
        const response1 = await fetch("https://fakestoreapi.com/products/2");
        const response2 = await fetch("https://fakestoreapi.com/products/3");
        const response3 = await fetch("https://fakestoreapi.com/products/18");
        const response4 = await fetch("https://fakestoreapi.com/products/19");

        if (!response1.ok || !response2.ok || !response3.ok || !response4.ok) {
            throw new Error("Failed to retrieve products from server.");
        }

        //Skapar variabler för att ta in alla svar som JSON
        const product1 = await response1.json();
        const product2 = await response2.json();
        const product3 = await response3.json();
        const product4 = await response4.json();

        //Samla alla produkter i en array och anropar render-funktionen
        const products = [product1, product2, product3, product4];
        renderPreviousPurchases(products);
        
        } catch (error) {
            previousPurchases.textContent = `Failed to load previous-purchases: ${error.message}`;
            previousPurchases.classList.add("error-message");
        }
}

// Renderar produkter /visar "tidigare köp"
function renderPreviousPurchases(products) {
    previousPurchases.textContent = "";

    products.forEach(product => {
        //Skapa element till produktkortet genom JS
        const productCard = document.createElement("div");
        const productImg = document.createElement("img");
        const productTitle = document.createElement("h3");
        const productPrice = document.createElement("p");
        const productCategory = document.createElement("p");
        const productCategorySmall = document.createElement("small");

        //Skapa klasser till elementen
        productCard.classList.add("product-card");
        productImg.classList.add("product-image");
        productPrice.classList.add("price");

        //Hämtar datan från API:et
        productImg.src = product.image;
        productImg.alt = product.title;
        productTitle.textContent = product.title.substring(0, 50) + (product.title.length > 50 ? "..." : "");
        productPrice.textContent = `$${product.price}`;
        productCategorySmall.textContent = `Category: ${product.category}`;

        //Sätter small inuti p-taggen
        productCategory.appendChild(productCategorySmall);

        //Sätter ihop kortet
        productCard.append(productImg, productTitle, productPrice, productCategory);

        //Lägger till kortet på sidan
        previousPurchases.appendChild(productCard);
    });
}

// ============================================================
/*Vad funktionerna gör:
classList.remove visar specifik vy genom att tar bort klassen .hidden
classList.add döljer specifik vy genom att vi lägger till klassen .hidden
*/

// Visar login-vy 
function showLogin() {
    loginSection.classList.remove("hidden");
    registerSection.classList.add("hidden");
    appSection.classList.add("hidden");
    clearErrors();
}

// Visar registrerings-vy 
function showRegister() {
    loginSection.classList.remove("hidden");
    registerSection.classList.remove("hidden");
    appSection.classList.add("hidden");
    clearErrors();
}

// Visar inloggad-vy + laddar tidigare köp
function showApp() {
    loginSection.classList.add("hidden");
    appSection.classList.remove("hidden");
    loadPreviousPurchases();
}

// ============================================================
// Simulerar login-process (hårdkodad + localStorage)
async function loginUser(username, password) {
    clearErrors();

    /*Kollar om användarnamn och lösenord finns, i localStorage 
    eller registrerade via formuläret
    .find() = hitta FÖRSTA objektet som matchar, returnera det
    */
    const users = getUsersFromStorage();
    const foundUser = users.find(user => user.username === username && user.password === password);

    /*Kollar om användarnamn och lösenord finns hårdkodat
    .some() = kollar om det finns NÅGOT objekt som matchar? true/false
    */
    const hardcodedMatch = hardcodedUsers.some(user => user.username === username && user.password === password);


    // Simulerar fördröjning som ett riktigt API skulle ha gjort
    await new Promise((resolve) => setTimeout(resolve, 800));

    /*Om hämtningen lyckas skapas en fakeToken till localStorage som
    tolkar en unik inloggning + Date-funktion.
    Vi sparar autentisk token med värdet av fakeToken i LocalStorage.*/
    if (foundUser || hardcodedMatch) {
        const fakeToken = "loggedInUser-" + Date.now();
        localStorage.setItem("authToken", fakeToken);
        
        //Tömmer inputfälten vid lyckad inloggning
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        
        //anropar inloggad vy
        showApp();
    } else {
        showError(loginError, "Incorrect username or password.");
        
        //Tömmer inputfälten vid misslyckad inloggning
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    }
}

// ============================================================
// Registrerar ny användare och sparar i localStorage
function registerUser(username, password) {
    clearErrors();

    //Sparar användare till localStorage
    const users = getUsersFromStorage();

    //Felhantering kontrollera om användarnamnet redan finns
    if (users.some((user) => user.username === username)) {
        showError(registerError, "Incorrect username or password.");
        return;
    }

    //Lägger till användare vid lyckad registrering och meddelar användaren
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    showError(registerSuccess, `Account created for ${username}! Go to Login`);
    registerForm.reset();
}

// ============================================================
//Knapp Login-formulär
loginBtn.addEventListener("click",  (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        showError(loginError, "Incorrect username or password.");
        return;
    }

    loginUser(username, password);
});

//Registrerings-formulär i registrerings-vy
registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    if (!username || !password) {
        showError(registerError, "Username or password is not entered correctly");
        return;
    }

    registerUser(username, password);
});

//Knapp för att registrering i inloggnings-vy
showRegisterBtn.addEventListener("click", showRegister);

/*Knapp för att Logga ut i inloggad-vy
Tar även bort inloggad-autentisering från localStorage
*/
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("authToken");
    showLogin();
});


// ============================================================
/* Kollar om användar-token redan finns i localstorage när sidan laddas 
Om token finns -visa app annars visa logga in. 
*/
const token = localStorage.getItem("authToken");
    if (token) {
        showApp();
    } else {
        showLogin();
    }


