Ajout pour le projet

* liens : /login, /ingrédients, /logout

* Lien avec le menu
* Première page = login
Dès qu'on arrive dessus, elle va créer un cookie ou une valeur isAdmin = true dans le localStorage (niveau point c'est pareil)
* Page /login => cette page redirige vers la page gestion des ingrédients (lien 1), si on est déjà log (isAdmin à true) alors on affiche logout
* Page /logout => afficher que si isAdmin est à true et détruit le cookie ou localStorage en mettant isAdmin à false et redirige vers l'accueil (lien 1bis)
* Page /ingrédients (lien 2) => guard à l'entrée si le cookie (isAdmin) est égale à true, si oui on affiche page avec liste ingrédients, sinon on redirige vers l'accueil

* Sur la page ingrédients on veut l'affichage de tous les ingrédients (dans un stub)