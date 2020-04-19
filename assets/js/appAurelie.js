/*TODO: 
1. Si le client n'enchaîne pas sur un nouvel ajout de tâche, le box shadow reste sur le select... (le select ou l'input disparaîssent dans certains cas)
2. Si l'input add reste vide, la tâche est ajoutée sans nom, il faut mettre une condition à la validation
3. Attention à la méthode handleClickForEvent et à la méthode changeTitle, doublon de code. A améliorer.
4. Pour l'ajout d'une tâche, rajouter une fonctionnalité pour l'ajout en cliquant sur entrée si une tâche est écrite et qu'une catégorie est sélectionnée
*/

let app = {

    init: function()
    {
        console.log('Coucou');
        app.listenForEvents();
    },

    listenForEvents: function ()
    {   
        let todoTasks = document.querySelectorAll('div.task--todo');
        let allIncompleteButton = document.querySelectorAll('.task__content__button__incomplete ');
        let todoTasksTitles = Array();
        let updateButtons = Array();
        let validateButtons = Array();
        let incompleteButtons = Array();
        let task = document.getElementsByClassName('task--add');
        let addTaskButton = document.querySelector('.task__content__button__add');
        let input = document.querySelector('.task--add').querySelector('input'); //task--add
        let select = document.querySelector('.task--add').querySelector('select'); //task--add
        
        for(let number = 0; number < todoTasks.length; number++)
        {
            //Listener de clic sur le titre des tâches
            todoTasksTitles.push(todoTasks[number].querySelector('p'));
            for(let i = 0; i < todoTasksTitles.length; i++)
            {
                todoTasksTitles[i].addEventListener('click', app.handleClickForUpdate);
            }

            //Listener de clic sur les icônes jaunes de modification
            updateButtons.push(todoTasks[number].querySelector('.task__content__button__modify'));
            for(let i = 0; i < updateButtons.length; i++)
            {
                updateButtons[i].addEventListener('click', app.handleClickForUpdate);
            }

            //Listener de clic sur les icônes vertes de validation
            validateButtons.push(todoTasks[number].querySelector('.task__content__button__validate'));
            for(let i = 0; i < validateButtons.length; i++)
            {
                validateButtons[i].addEventListener('focus', app.handleCompleteButtonClick);
            }
        }


        allIncompleteButton.forEach(
            function(incompleteButton)
            {
                incompleteButton.addEventListener('click', app.handleIncompleteButtonClick);
            }
        );
        //Listener de clic sur le submit d'un form 
        addTaskButton.addEventListener('click', app.handleAddTaskFormSubmit);

        //Listener de perte de focus sur l'input task--add
        input.addEventListener('blur', app.handleFormInputValidation);
        
        //Listener de perte de focus sur la sélection d'une catégorie
        select.addEventListener('blur', app.handleFormSelectValidation);
    },

    /*
     *Permet de sélectionner la valeur contenue dans l'input, si on change le 0 en `input.value.length` cela permet de placer le curseur à la fin.
     */
    focusEnd : function(input)
    {
        input.focus();
        input.setSelectionRange(0,input.value.length);
    },
    
    /*
     *Handler utilisé pour un clic sur un p d'une div.task--todo
     */
    handleClickForUpdate : function(evt)
    {
        let titleElement = evt.currentTarget;
        titleElementDiv = titleElement.closest('.task');
        titleElementDiv.classList.add('task--edit');
        titleElementDiv.classList.remove('task--todo');

        textInput = titleElementDiv.querySelector('input');
        app.focusEnd(textInput); // Helped by https://jsfiddle.net/r3yohhc0/1/ --- possibile d'utiliser un simple .select() après .focus()

        textInput.addEventListener('blur', app.changeTitle);
        textInput.addEventListener('keydown', app.changeTitle);
    },

    /*
     *Handler utilisé après la saisie/modification dans l'input en cliquant ailleurs ou en tapant sur entrée, pour changer la valeur du p. 
     */
    changeTitle : function(evt)
    {
        let textInput = evt.currentTarget;
        let newTask = textInput.value;

        if(document.activeElement !== textInput || event.key === "Enter") // document.activeElement (https://stackoverflow.com/questions/497094/how-do-i-find-out-which-dom-element-has-the-focus/497108#497108)
        {
            let titleElementDiv = textInput.closest('.task');
            titleElementDiv.classList.add('task--todo');
            titleElementDiv.classList.remove('task--edit');

            todoTaskTitle = titleElementDiv.querySelector('p');
            todoTaskTitle.textContent = newTask; // Possible d'utiliser la méthode suivante todoTaskTitle.previousElementSibling.value (https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/previousElementSibling);
        }
    },

    /*
     *Handler utilisé au clic sur l'icône complete afin de modifier la classe de la div (pour barrer la tâche et changer les buttons) 
     */
    handleCompleteButtonClick : function(evt)
    {
        let completeButton = evt.currentTarget;
        let completeButtonDiv = completeButton.closest('.task');
        completeButtonDiv.classList.add('task--complete');
        completeButtonDiv.classList.remove('task--todo');
    },

    /*
     *Handler utilisé au clic sur l'icône incomplete afin de modifier la classe de la div (pour afficher la tâche et changer les buttons) 
     */
    handleIncompleteButtonClick : function(evt)
    {
        let incompleteButton = evt.currentTarget;
        let incompleteButtonDiv = incompleteButton.closest('.task');
        incompleteButtonDiv.classList.add('task--todo');
        incompleteButtonDiv.classList.remove('task--complete');
    },

    handleAddTaskFormSubmit : function(evt)
    {
        evt.preventDefault();

        if(document.querySelector('small'))
        {
            window.alert('Attention, veuillez modifier vos erreurs.')
        }
        else 
        {
            //Sélection du template
            let template = document.querySelector('#todoTemplate');
            let emptyTodoTask = template.content.cloneNode(true);

            //Sélection de la saisie dans l'input
            var elementDiv = evt.currentTarget.closest('.task');
            var inputDiv = elementDiv.querySelector('input');
            let titleToAdd = inputDiv.value;

            //Titre de la tâche
            let newTitle = emptyTodoTask.querySelector('p');
            newTitle.textContent = titleToAdd;

            //Valeur de l'input
            let  valueToComplete = emptyTodoTask.querySelector('input');
            valueToComplete.setAttribute('value', titleToAdd);

            //Valeur du select
            var select = elementDiv.querySelector('select');
            var optionSelected = select.value;  
        
            //Attribution de la catégorie sélectionnée à l'attribut de la div.task--todo
            taskTodoDiv = emptyTodoTask.querySelector('.task--todo');
            taskTodoDiv.setAttribute('data-category', optionSelected);

            //Attribution de la catégorie sélectionnée au p de la div.task__content_category
            taskContentCategory = emptyTodoTask.querySelector('.task__content__category');
            categoryName = taskContentCategory.querySelector('p');
            categoryName.textContent = optionSelected;

            //Addind the new div at the top of the todoList
            main = document.querySelector('main');
            main.prepend(emptyTodoTask); // Source : https://stackoverflow.com/questions/22437700/javascript-add-div-to-top-of-another-div

            //Remise à zéro des valeurs dans l'input d'ajout et focus
            inputDiv.value = '';
            inputDiv.focus();
            options = elementDiv.querySelectorAll('option');
            options[0].setAttribute('selected', '');
        }

        app.listenForEvents();
    },

    /*
     *Handler utilisé pour la perte de focus sur l'input div.task--add afin de valider la tâche saisie
     */
    handleFormInputValidation : function(evt)
    {
        input = evt.currentTarget;
        var inputDiv = input.closest('.task__content__name');
        
        if(input.value.length < 6 && input.value.length > 0)
        {
            input.style.boxShadow = "0px 0px 9px -4px #FF2424";
            if(inputDiv.childNodes.length == 3) //Rajout de cette condition car l'erreur s'affichait à chaque essai quand il y avait moins de 6 lettres.
            {
                var smallError = document.createElement('small');
                smallError.innerHTML = 'Attention le nom de la tâche doit comporter 5 lettres minimum.';
                inputDiv.appendChild(smallError);
            }
        }
        else if(input.value.length > 5)
        {
            input.style.boxShadow = "0px 0px 9px -4px #60D315";
            if(document.querySelector('small'))
            {
                inputDiv.removeChild(inputDiv.lastChild);
            }

        }
        else if(input.value.length == 0)
        {
            input.style.boxShadow = "";
        }

    },

    /*
     *Handler utilisé pour la perte de focus sur le select div.task--add, afin de valider la catégorie choisie
     */
    handleFormSelectValidation : function(evt)
    {
        var select = evt.currentTarget;
        var selectDiv = select.closest('.task__content__category');
        var options = select.querySelectorAll('option');


        if(select.value === options[0].value)
        {
            select.style.boxShadow = "0px 0px 9px -4px #FF2424";
            if(selectDiv.childNodes.length == 3) //Rajout de cette condition car l'erreur s'affichait à chaque essai quand aucune catégorie n'était sélectionnée
            {
                var smallError = document.createElement('small');
                smallError.innerHTML = 'Attention choisissez une catégorie.';
                selectDiv.appendChild(smallError);
            }

        }
        else if(select.value !== options[0].value)
        {
            select.style.boxShadow = "0px 0px 9px -4px #60D315";
            if(document.querySelector('small'))
            {
                selectDiv.removeChild(selectDiv.lastChild);
            }

        }

    },

    /* J'ai écrit ce code pour uploader les catégories et tâches depuis l'API de Ben. 
    Plusieurs modifications restent à faire dans ce dossier et dans index.php pour l'utilisation de ce code.
    Voir l'exemple du code dans l'exercice réalisé en challenge du 3ème jour sur les API

    loadingJsonFilesFromApi : function(endpoint)
    {
        //*STEP 1 :  SOURCE : https://benoclock.github.io/S07-todolist/
        let fetchOptions = {
            "method": "GET",
            "mode": "cors",
            "cache": "no-cache"
        };

        //*STEP 2 :  Charger des données depuis l'API 
        let baseUrl = "https://benoclock.github.io/S07-todolist/";
        let request = fetch(baseUrl + endpoint, fetchOptions);

        return request;
    },

    loadCategories : function()
    { 
        //*STEP 1-2 :  Charger des données depuis l'API
        request = app.loadingJsonFilesFromApi("categories.json");

        //*STEP 3 : puis on fait ce qu'on a à faire avec la réponse
        request.then(
            //on convertit d'abord en json
            function(response){
                return response.json();
            }
        )
        // Catégories
        .then(
            //réponse qu'on reçoit ici en argument
            function(categories)
            {
                let select = document.createElement('select');
                categories.forEach(
                    function(category)
                    {
                        let option = document.createElement('option');
                        option.setAttribute('value', category.id);
                        option.textContent = category.name;
                        select.appendChild(option);
                    }
                )
                
                let headerDivSelect = document.querySelector('filters-bar__content, .select');
                headerDivSelect.appendChild(select);

                secondSelect = select.cloneNode(true);
                let taskAdd = document.querySelector('.task--add');
                let formSelect = taskAdd.querySelector('.select');
                formSelect.appendChild(secondSelect);

                app.category = categories.slice();
            } 
        )

    },

    loadTasks : function()
    { 
        //*STEP 1-2 :  Charger des données depuis l'API
        request = app.loadingJsonFilesFromApi("tasks.json");

        //*STEP 3 : puis on fait ce qu'on a à faire avec la réponse
        request.then(
            //on convertit d'abord en json
            function(response){
                return response.json();
            }
        )
        // Catégories
        .then(
            //réponse qu'on reçoit ici en argument
            function(tasks)
            {
                tasks.forEach(
                    function(task)
                    {
                        //Creation du nouveau template
                        let template = document.querySelector('#task-template');
                        let newTask = template.content.cloneNode(true);

                        //Ajout du nom de la tâche
                        let nameDiv = newTask.querySelector('.task__content__name');
                        
                        let input = nameDiv.querySelector('input');
                        input.value = task.title;

                        let pName = nameDiv.querySelector('p');
                        pName.textContent = task.title;

                        //Sorte de jointure pour récupérer le nom de la catégorie
                        for(i = 0; i < app.category.length; i++)
                        {
                            if(task.category_id == app.category[i].id)
                            { 
                                task.categoryName = app.category[i].name;
                            }
                        }

                        let todoDiv = newTask.querySelector('.task--todo');
                        todoDiv.querySelector('data-category', task.categoryName); //this line doesn't work ???!!!!
                        
                        let categoryDiv = newTask.querySelector('.task__content__category');
                        let pCategory = categoryDiv.querySelector('p');
                        pCategory.textContent = task.categoryName;

                        //Ajout de la width pour la progress bar
                        progressBar = todoDiv.querySelector('.progress-bar__level');
                        progressBar.setAttribute('style', 'width:'+task.completion+'%');

                        //Gestion du status
                        if(task.status === 2)
                        {
                            todoDiv.classList.remove('task--todo');
                            todoDiv.classList.add('task--complete');
                        }

                        main = document.querySelector('main');
                        main.prepend(newTask); 
                        
                        app.listenForEvents();
                    }
                )
            } 
            
        );
        
        
       

    },
    */


}

app.init();