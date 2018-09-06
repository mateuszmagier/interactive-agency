document.addEventListener("DOMContentLoaded", function () {

    var portfolioSection = document.querySelector(".portfolio-section");
    var projectsContainer = document.querySelector(".portfolio-section__projects-container");
    var projects;
    var currentProjectsPosition = 0; // bieżące przesunięcie projektów w sekcji portfolio
    var middleProject;
    var isLastMoveRight;
    var menu, menuList;
    var menuItems;

    function deleteRedundantProject() {
        console.log("deleteRedundantProject");
        middleProject = document.querySelector(".project--middle");
        var redundantProject;
        if (isLastMoveRight) // przesunięcie w prawo - usuwamy projekt z prawej
            redundantProject = middleProject.nextElementSibling.nextElementSibling;
        else
            redundantProject = middleProject.previousElementSibling.previousElementSibling;
        projectsContainer.removeChild(redundantProject);
    }

    // alternatywa - bez transform - tylko wrzucić projekt z lewej strony ekranu jako normalny projekt, a prawy wyrzucić za ekran
    function moveProjects(isRight) {
        middleProject = document.querySelector(".project--middle");
        middleProject.classList.remove("project--middle");
        if (isRight) { // move right
            middleProject.previousElementSibling.classList.add("project--middle");
            middleProject.previousElementSibling.previousElementSibling.classList.remove("project--reserve-left");
        } else {
            middleProject.nextElementSibling.classList.add("project--middle");
            middleProject.nextElementSibling.nextElementSibling.classList.remove("project--reserve-right");
        }
    }

    // isRight - kierunek przesunięcia
    function cloneProject(isRight) {
        console.log("cloneProject");
        middleProject = document.querySelector(".project--middle");
        var leftProject = middleProject.previousElementSibling; // pobierz lewy projekt
        var rightProject, clone;
        if (isRight) { // przesuwamy w prawo, wiec prawy projekt klonujemy i umieszczamy go w miejscu lewego
            rightProject = middleProject.nextElementSibling; // pobierz prawy projekt
            clone = rightProject.cloneNode(true); // sklonuj prawy projekt
            clone.classList.add("project--reserve-left");
            projectsContainer.insertBefore(clone, leftProject);
        } else { // przesuwamy w lewo, wiec lewy projekt klonujemy i umieszczamy go w miejscu prawego
            clone = leftProject.cloneNode(true); // sklonuj lewy projekt
            clone.classList.add("project--reserve-right");
            projectsContainer.appendChild(clone);
        }
    }

    function addNavArrows() {
        var leftArrow = document.createElement("a");
        leftArrow.classList.add("portfolio-section__arrow", "portfolio-section__arrow--left");
        leftArrow.innerHTML = "<span>&#60;</span>";

        leftArrow.addEventListener("click", function () {
            console.log("clickLeft");
            isLastMoveRight = false;
            cloneProject(false);
            moveProjects(false);
            deleteRedundantProject();
        });

        var rightArrow = document.createElement("a");
        rightArrow.classList.add("portfolio-section__arrow", "portfolio-section__arrow--right");
        rightArrow.innerHTML = "<span>&#62;</span>";

        rightArrow.addEventListener("click", function () {
            console.log("clickRight");
            isLastMoveRight = true;
            cloneProject(true);
            moveProjects(true);
            deleteRedundantProject();
        });

        var arrowsWrapper = document.createElement("div");
        arrowsWrapper.classList.add("portfolio-section__arrow-wrapper");
        arrowsWrapper.appendChild(leftArrow);
        arrowsWrapper.appendChild(rightArrow);

        var arrowsContainer = document.createElement("div");
        arrowsContainer.classList.add("portfolio-section__arrow-container");
        arrowsContainer.appendChild(arrowsWrapper);

        var portfolioSection = document.querySelector(".portfolio-section");
        portfolioSection.appendChild(arrowsContainer);
    }

    function toggleMenuEvent() {
        var toggleMenu = document.querySelector(".toggle-menu");
        toggleMenu.addEventListener("click", function () {
            this.classList.toggle("toggle-menu--closed");
            menuList.classList.toggle("menu__list--visible");
        });
    }

    function toggleActiveMenuItem() {
        for (var menuItem of menuItems) {
            menuItem.addEventListener("click", function () {
                menuList.querySelector(".menu__item--active").classList.remove("menu__item--active");
                this.classList.add("menu__item--active");
            });
        }
    }

    function scrollToSection(menuItemIndex, sectionClass) {
        menuItems[menuItemIndex].addEventListener("click", function (e) {
            e.preventDefault();
            var section = document.querySelector(sectionClass);
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    function addMenuItemsScrolling() {
        var sectionClasses = [".home-section", ".about-section", ".offer-section", ".portfolio-section", ".map-section"];
        for (var i = 0; i < menuItems.length; i++) {
            scrollToSection(i, sectionClasses[i]);
        }
    }

    addNavArrows();
    menuList = document.querySelector(".menu__list");
    toggleMenuEvent();
    menuItems = menuList.querySelectorAll(".menu__item");
    toggleActiveMenuItem();
    addMenuItemsScrolling();
});
