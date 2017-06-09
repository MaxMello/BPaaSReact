<h2>Abstract</h2>
Dieser Teil des Projektes stellt die Nutzer-Schnittstelle für unseren BPaaS-Dienst dar.
Bei der Webseite handelt es sich um eine Single-Page Application. Das bedeutet, es wird nur einmal
eine HTML-Seite geladen. Alle Unterseiten werden dynamisch mit Javascript generiert. Zu den Funktionen
der Webseite gehören das Einloggen (Definieren eines Nutzernamens, der für andere Requests als Identifier genutzt wird),
das Auflisten und Nutzen von Business Processen, das Anbieten und Erstellen von Business-Prozessen, sowie
das Anbieten und Integrieren von einzelnen Services.

<h2> Ansprechpartner </h2>
Max Wiechmann (@abq353 / @max auf Slack)

<h2> Technologien </h2>
Das Frontend nutzt das von Facebook entwickelte Framework ReactJS zur Darstellung 
der Website-Komponenten. Außerdem wird zum verwalten des Status (State) der Single Page
Application die Library Redux genutzt. Diese definiert eine Reihe sogenannter Reducer,
die Teile eines großen State Objektes verwalten. Der Datenfluss passiert wie folgt: Eine Reihe vordefinierter
Actions können auf verschiedenen Stellen im Code getriggert werden (z.B. durch einen Button-Click). Die Action
wird "dispatched", sodass die Reducer auf den Return-Value der Action lauschen können. Die Reducer ändern
dann den State. Jede React-Komponente ist mit den für sie relevanten Teil des States so verknüpft, dass
die Werte des States auf die "Props" (Properties) der einzelnen UI-Komponenten gemappt werden. Jedes mal, wenn sich
die Props ändern, wird der veränderte Teil des UIs neu gerendert.
<br><br>
Beispiel: Ein Button-Click im UI dispatched eine Action (Javascript-Funktion) "loadData". Zunächst werden
asynchron die Daten geladen. Ist dies passiert, wird das Ergebnis der Aktion an die Reducer weitergeleitet.
Die Reducer können den Inhalt des Aktions-Ergebnisses dann in den State speichern (was nur ein JSON ist), z.B.
in das Feld "data". Die UI-Komponente kann dann den Inhalt von "data" als Property reingereicht bekommen. Da sich
der Wert von "data" nun geändert hat, wird der Teil des UIs, der die Daten darstellt, neu gerendert. Der
Prozess ist abgeschlossen.
<br><br>
Neben React und Redux werden eine Reihe weiterer, kleiner Libraries / Packages geladen, die in package.json 
aufgeführt sind. Zum Beispiel wird react-bootstrap genutzt, um Bootstrap-Elemente im Javascript definieren
zu können.

<h2> Kontext </h2>
Das Frontend wird statisch in einem Nginx als eigener Service gehostet. Die Daten werden über die API, und 
ausschließlich über die API gelesen und geschrieben.