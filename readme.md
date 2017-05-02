# Simplex Iterator

### Dependecies

The application is completely written in [VanillaJS](http://vanilla-js.com). Following librarys are used:

* [fraction.js](https://github.com/infusion/Fraction.js) : for operations with rational values
`npm install fraction.js`
* [balloon.css](https://github.com/kazzkiq/balloon.css) : simple pure css tooltips
`npm install balloon-css`

### Bugs
* pivot bestimmen (und evtl iterieren) muss immer möglich sein, egal ob Optimum bereits gefunden
* ~~Hinweis, wenn RHS oder ObjFunc iteriert werden soll~~
* ~~Hinweis bei falschem Input schon bei 1 Zeichen~~
* ~~Validierung der Input-Elemente vor jeder Operation (Form abschicken und auf Validität prüfen)~~
* Firefox (und Safari?) Spinner vom Number Input entfernen
* Firefox: bei Doppelklick wird das Design der Zellen in der Tabelle verändert

### To Do (for version 1.0)
* ~~pivot element farbe resetten~~
* ~~button "optimieren"~~
* ~~alert überarbeiten (funktion machen)~~
* ~~Tooltips einblenden https://github.com/kazzkiq/balloon.css~~


### Features (nice to have)
* ~~Ausgangs-Matrix speichern~~

* alle Basislösungen anzeigen (zulässig + unzulässige)
* -> jede Kombination durchprobieren (man hat immer soviel Möglichkeiten wie Constraints für 1 Kombination)
* -> iterieren nur möglich, wenn 

* Darstellung des Rechenwegs (zur besseren Nachvollziehbarkeit)

* navigation mit tastatur in tableau https://jsfiddle.net/cnkr7wqa/5/

* Verhalten wie Spinner vom Number Input für die Buttons
* import / export (wirklich nötig?)

* schöne Darstellung von rationalen Zahlen

* zeichnen aller Lösungen / darstellen des Lösungsraum
* https://github.com/maurizzzio/function-plot

---

Mirko Bay, 2017-04-28

