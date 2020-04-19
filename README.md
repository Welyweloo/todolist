# Todolist

Contributors
--
- Axel P. : Aide à la mise en production

Content
--
Le site est une todolist dynamique dans rechargement de page.
Il est en cours d'amélioration avec création d'une API côté back-end et mise à jour de BDD (prochaine version à venir)

Réalisation
--

- Temps pris: un week-end complet en Avril 2020 plus quelques heures
  
- Langages, frameworks et utilitaires:
  - PHP 
  - Bulma
  - Javascript avec APIRest
  - Lumen (pour la création de l'Api) --> le code préparé dans appAurelie.js fait appel à une API déjà créée (il n'est pas encore utilisé pour la page web proposée)


- Difficultés rencontrées :
1. Si le client n'enchaîne pas sur un nouvel ajout de tâche, le box shadow reste sur le select... (le select ou l'input disparaîssent dans certains cas)
2. Si l'input add reste vide, la tâche est ajoutée sans nom, il faut mettre une condition à la validation
3. Attention à la méthode handleClickForEvent et à la méthode changeTitle, doublon de code. A améliorer.
4. Pour l'ajout d'une tâche, rajouter une fonctionnalité pour l'ajout en cliquant sur entrée si une tâche est écrite et qu'une catégorie est sélectionnée

- Evolutions possibles :
1. Faire évoluer le code pour l'affichage de tâche par une API (j'ai écrit le code pour la récupération des données grâce à l'API sur un dossier plus évolué que celui-ci, il faut que je l'adapte au présent code)
2. Gérer l'archivage d'une tâche 
3. Gérer les displays des tâches depuis l'API selon leur nature et le choix de l'utilisateur entre complètes, incomplètes
4. Gérer la complétion au clic sur la barre de progrès avec un affichage de pourcentage pour une expérience plus sympa
  
