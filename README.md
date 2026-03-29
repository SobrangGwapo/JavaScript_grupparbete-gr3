# Skövde Boxing Club  - "_Där gemenskap möter boxing_"

#### Om klubben
Skövde Boxning Club tror på att bygga en stark gemenskap och välkomnar därför människor i alla åldrar och på alla nivåer. Det finns ett evenemang eller program för alla i vår klubb. Med det sagt är vi särskilt kända för våra boxningsevenemang för ungdomar.

Boxning är ett utmärkt sätt att stärka både kropp och själ i vår hektiska vardag. Sedan starten på 1990-talet har vi konsekvent strävat efter att göra en positiv skillnad för både fysisk och psykisk hälsa genom boxning. Vårt uppdrag är att göra boxning tillgänglig till överkomliga priser och främja hälsa och kondition för alla.

Förutom att organisera boxningsevenemang arrangerar vi även träningsprogram under sommaren. Deltagare i dessa program uppmuntras att tävla i amatörboxningstävlingar.

# Skövde Boxing Club Event Planner
 #### Planering gjort enkelt

Genom vår dynamiska och användarvänlig webbapplikation kan du nu se kommande boxningsevenemang och registrera dig som deltagare med bara ett klick. Applikationen ger inte bara boxningsentusiaster all information om evenemang i regionen, utan hjälper oss också att effektivt hantera evenemang och administrera tävlingar. Håll dig uppdaterad och missa aldrig chansen att kliva in i ringen.

![Skärmdump av startsidan](assets/skärmdumpar/startsidan.png)

# Lösningen och arbetssätt

Applikationen har utvecklats genom ett strukturerat arbetssätt där ansvarsområden fördelades mellan gruppmedlemmarna. Vi inledde utvecklingen med en wireframe, vilket sedan ledde till att olika funktioner identifierades och utvecklades. Vi kom överens om applikationens arkitektur, tog fram en kravlista och planerade hur den skulle implementeras. Därefter delade vi upp utvecklingsansvaret.

Applikationen utvecklades stegvis, där vi implementerade funktioner, testade dem och sedan integrerade dem med övriga delar av systemet. Under utvecklingen följde vi KISS-principen genom att hålla lösningarna enkla och tydliga. Detta underlättade samarbetet och resulterade i en mer lättförståelig och strukturerad kod. Dessutom identifierade vi logik som behövde återanvändas och kapslade in den i funktioner, vilket följer DRY-principen.

Slutligen testades applikationen för att säkerställa att alla funktioner fungerar som förväntat.

# Implementerad med

* **HTML5**  
* **CSS3**  
* **Vanilla JavaScript (ES6 Modules)**  
* **JSON Server**
* **Vitest**

# Filstruktur
```
JavaScript_grupparbete-gr3/
│
├── assets/
│   ├── background.png
│   └── logo.skovde-bc.jpg
│
├── src/
│   ├── scripts/
│   │   ├── create-event/
│   │   │   └── create.events.js
│   │   │
│   │   ├── events/
│   │   │   ├── eventAction.js
│   │   │   ├── index.js
│   │   │   ├── loadEvents.js
│   │   │   ├── participantActions.js
│   │   │   ├── renderEventWrapper.js
│   │   │   └── renderEvents.js
│   │   │
│   │   └── register-person/
│   │       └── register.js
│   │
│   ├── config.js
│   │
│   ├── styles/
│   │   └── style.css
│   │
│   ├── tests/
│   │   ├── loadEvents.test.js
│   │   └── setupTests.js
│   │
│   └── index.html
│
├── .gitignore
├── README.md
├── db.json
├── package-lock.json
├── package.json
└── vitest.config.js
```

# Layout och funktioner

Webbplatsen är utformad med en responsiv layout som anpassar sig efter olika skärmstorlekar. Användaren kan enkelt navigera till eventssektion via knappen högst på sidan.

Alla pågående och kommande evenemang hämtas dynamiskt via **_Events_** från ett REST API. Varje evenemang presenteras i form av kort med information såsom titel, beskrivning, start- och sluttider, adress och kontaktuppgifter.

![Skärmdump av Events](assets/skärmdumpar/events.png)

* **_Anmäl dig_** ger användaren möjlighet att registrera sig till ett evenemang via ett formulär. Formuläret innehåller flera fält: namn, kön, födelseår, vikt, klubb och mobilnummer.

![Skärmdump av Anmäl dig](assets/skärmdumpar/anmal-dig.png)

* **_Deltagarlista_** gör det möjligt att visa alla registrerade deltagare för ett evenemang, inklusive namn, kön, vikt, antal matcher, klubb och telefonnummer.

![Skärmdump av Deltagarlista](assets/skärmdumpar/deltagarlista.png)

* **_Skapa/Ändra event_** gör det möjligt för administratörer att skapa och redigera evenemang via ett formulär.

![Skärmdump av Skapa Event](assets/skärmdumpar/skapa-event.png)

# Applikationen är dynamisk

Applikationen är utformad så att ingen evenemangsdata är hårdkodad i HTML, utan genereras dynamiskt med JavaScript.

* **Dynamiskt skapande av DOM**

`events.html` innehåller en helt tom container. Allt innehåll, inklusive evenemangskort, deltagarlistor och knappar, skapas dynamiskt med JavaScript via `document.createElement()`. Att skapa element, attribut och funktioner med hjälp av JavaScript ger vår applikation ökad flexibilitet. För det första kan innehåll uppdateras dynamiskt utan att HTML-koden behöver ändras. För det andra förbättrar detta kodens återanvändbarhet och underhållbarhet, eftersom samma kod kan användas flera gånger, vilket följer DRY-principen. Slutligen kan innehåll uppdateras utan att sidan behöver laddas om, vilket förbättrar användarupplevelsen.

* **Datahämtning med fetch() och REST API**

Ett REST API används via `fetch()` för att hämta evenemang när sidan laddas. `json-server` exponerar `db.json` som ett fullständigt REST API där servern körs. API:et stödjer metoderna GET, POST, PUT och DELETE.

* **Async/Await med felhantering**

All datahämtning använder `async/await` tillsammans med `try/catch`. Vid fel visas ett felmeddelande istället för att applikationen kraschar. Detta designval säkerställer en effektiv och kontrollerad felhantering, vilket avsevärt förbättrar applikationens stabilitet.

* **Datumformatering**

ISO-formatet gör det möjligt att formatera datum till ett läsbart svenskt format med `toLocaleString()`.

# Testning

Applikationen testas med hjälp av testramverket **Vitest**. 
Tester har implementerats innan funktionerna utvecklades för 
att säkerställa att varje funktion uppfyller kraven.

### Vad testas?

- **loadEvents()** – Funktionen testas för att säkerställa att data 
  hämtas korrekt från API och att svaret returneras i förväntat format.

- **Mockning av fetch()** – Används för att simulera externa 
  beroenden och API-beteende.

# Tillgänglighet

Webbplatsen är utformad så att den är responsiv och tillgänglig för olika användare.

* Element som `<header>`, `<main>`, `<section>`, och `<footer>` används för att förbättra tillgänglighet och semantisk SEO.
* Alla formulärelement och knappar är anpassade för både stora och små skärmar.
* Det är enkelt och intuitivt att navigera mellan listor och evenemangskort.
* Automatisk lagring och hämtning av data sker via ett REST API utan att sidan behöver laddas om.

![Lighthouse – Accessibility](assets/skärmdumpar/lighthouse-accessibility.png)

# Tillsammans bygger vi framtidens boxning

Skövde BC skapar en gemenskap som är mer än bara en boxningsklubb. Vi bryr oss om människor i alla åldrar, från unga till äldre. Genom att bli medlem hos oss får du möjlighet att utvecklas genom boxning och bli en del av vår gemenskap.

* Skriv till oss på _skovdebc@gmail.com_
* Följ oss på _[@skovdebc](https://www.facebook.com/skovdeBC)_
* Projektlänk: _https://github.com/SobrangGwapo/JavaScript_grupparbete-gr3_

# Vårt utvecklingsteam

_**Freddy: Projektledare**_
https://github.com/SobrangGwapo

_**Khalil: UI/UX Specialist**_
https://github.com/Kalleanka123456

_**Bengt: Front End utvecklare**_
https://github.com/Bength65

_**Max: Back End utvecklare**_
https://github.com/MaxWK96

_**Vishnu: Content Experience Developer**_
https://github.com/vishnuprasadpendyala

# Licens

Detta projekt är licensierat under **MIT-licensen** (se `LICENSE`).

