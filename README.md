# Publik frontend-del för projektarbete

Det här projektet är den publika frontend-delen för min fiktiva resturang Pizzeria Berna. Den presenterar företaget och ger besökaren information samt möjlighet att göra take away-beställningar. Det finns två undersidor:
- Startsidan som innehåller information samt hämtar menyn.
- Beställningssidan som representerar besökarens varukorg.

## Funktioner

- Hämtar meny från mitt REST API och grupperar produkter efter kategori (Pizza, Pasta, Dryck).
- Möjlighet att lägga till och ändra antal varor i varukorgen (sparas i localStorage).
- Validerat beställningsformulär med namn, telefonnummer, adress och betalningsalternativ. 
- Tydliga felmeddelanden skrivs ut samt bekräftelsemeddelande efter lyckad order.
- Skickar beställningar till backend via POST.
- Responsiv och tillgänglig design med fokus på enkel användning. 

## REST API-endpoints

- GET /api/menu för att hämta menyobjekt.
- POST /api/order för att skicka en ny beställning.

En liveversion av API:t finns tillgänglig på följande URL: https://dt207g-project-restapi.onrender.com/
