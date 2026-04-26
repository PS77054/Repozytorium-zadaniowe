function PokazUkryjDoswiadczenie() 
{
    const section = document.getElementById("doswiadczenie");

    // Pokazanie lub ukrycie sekcji
	if (getComputedStyle(section).display === "none") {
        section.style.display = "block";
    } else {
        section.style.display = "none";
    }
}

function ZmienMotyw() 
{
    const style = document.getElementById("style");

    // Zmiana motywu na zielony lub czerwony
	if (style.getAttribute("href") === "red.css") {
        style.setAttribute("href", "green.css");
    } else {
        style.setAttribute("href", "red.css");
    }
}

document.getElementById("formularz").addEventListener("submit", function(e) 
{
    e.preventDefault();

    let danePoprawne = true;

    // Pobranie wartości z formularza
    let imie = document.getElementById("imie").value;
    let nazwisko = document.getElementById("nazwisko").value;
    let email = document.getElementById("email").value;
    let wiadomosc = document.getElementById("wiadomosc").value;

    // Wyczyszczenie błędów
    document.querySelectorAll(".blad").forEach(el => el.textContent = "");

    // Cyfry w nazwie
    let nazwaZnaki = /\d/;

    // Walidacja imienia
	if (imie.trim() === "") {
		document.getElementById("blad-imie").textContent = "Imię jest wymagane!";
		document.getElementById("imie").focus();
		danePoprawne = false;
	} else if (nazwaZnaki.test(imie)) {
        document.getElementById("blad-imie").textContent = "Imię nie może zawierać cyfr!";
        document.getElementById("imie").focus();
		danePoprawne = false;
    }

    // Walidacja nazwiska
	if (nazwisko.trim() === "") {
		document.getElementById("blad-nazwisko").textContent = "Nazwisko jest wymagane!";
		document.getElementById("nazwisko").focus();
		danePoprawne = false;
	} else if (nazwaZnaki.test(nazwisko)) {
        document.getElementById("blad-nazwisko").textContent = "Nazwisko nie może zawierać cyfr!";
        document.getElementById("nazwisko").focus();
		danePoprawne = false;
    }

    // Walidacja email 
    let emailZnaki = /@/;

    if (email.trim() === "") {
        document.getElementById("blad-email").textContent = "Email jest  wymagany!";
        document.getElementById("email").focus();
		danePoprawne = false;
    } else if (!emailZnaki.test(email)) {
		document.getElementById("blad-email").textContent = "Niepoprawny email!";
		document.getElementById("email").focus();
		danePoprawne = false;
	}

    // Walidacja wiadomości
    if (wiadomosc.trim() === "") {
        document.getElementById("blad-wiadomosc").textContent = "Wiadomość jest wymagana!";
        document.getElementById("wiadomosc").focus();
		danePoprawne = false;
    }

    if (danePoprawne) {
        alert("Formularz wysłany poprawnie!");
		this.reset();
    }
})

async function pobierzDane() {
  try {
	const response = await fetch("dane.json");
	if (!response.ok) throw new Error("Brak pliku JSON!");
	
    const data = await response.json();

    if (data.umiejetnosci) {
        const listaUm = document.getElementById("umiejetnosci");
        listaUm.innerHTML = ""; 
        data.umiejetnosci.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            listaUm.appendChild(li);
        });
    }
	
	if (data.projekty) {
        const listaProj = document.getElementById("projekty");
        listaProj.innerHTML = ""; 
        data.projekty.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            listaProj.appendChild(li);
        });
    }
		
    } catch (error) {
    console.error("Błąd pobierania:", error);
  }
}

pobierzDane();
