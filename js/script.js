document.addEventListener("DOMContentLoaded", function () {

    let portfolioSection = document.querySelector(".portfolio-section");
    let projectsContainer = document.querySelector(".portfolio-section__projects-container");
    let projects;
    let currentProjectsPosition = 0; // bieżące przesunięcie projektów w sekcji portfolio
    let middleProject;
    let isLastMoveRight;
    let menu, menuList;
    let menuItems;

    function deleteRedundantProject() {
        console.log("deleteRedundantProject");
        middleProject = document.querySelector(".project--middle");
        let redundantProject;
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
        let leftProject = middleProject.previousElementSibling; // pobierz lewy projekt
        let rightProject, clone;
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
        let leftArrow = document.createElement("a");
        leftArrow.classList.add("portfolio-section__arrow", "portfolio-section__arrow--left");
        leftArrow.innerHTML = "<span>&#60;</span>";

        leftArrow.addEventListener("click", function () {
            console.log("clickLeft");
            isLastMoveRight = false;
            cloneProject(false);
            moveProjects(false);
            deleteRedundantProject();
        });

        let rightArrow = document.createElement("a");
        rightArrow.classList.add("portfolio-section__arrow", "portfolio-section__arrow--right");
        rightArrow.innerHTML = "<span>&#62;</span>";

        rightArrow.addEventListener("click", function () {
            console.log("clickRight");
            isLastMoveRight = true;
            cloneProject(true);
            moveProjects(true);
            deleteRedundantProject();
        });

        let arrowsWrapper = document.createElement("div");
        arrowsWrapper.classList.add("portfolio-section__arrow-wrapper");
        arrowsWrapper.appendChild(leftArrow);
        arrowsWrapper.appendChild(rightArrow);

        let arrowsContainer = document.createElement("div");
        arrowsContainer.classList.add("portfolio-section__arrow-container");
        arrowsContainer.appendChild(arrowsWrapper);

        let portfolioSection = document.querySelector(".portfolio-section");
        portfolioSection.appendChild(arrowsContainer);
    }
    
    function toggleMenuEvent() {
        let toggleMenu = document.querySelector(".toggle-menu");
        toggleMenu.addEventListener("click", function() {
            this.classList.toggle("toggle-menu--closed");
            menuList.classList.toggle("menu__list--visible");
        });
    }
    
    function toggleActiveMenuItem() {
        for(let menuItem of menuItems) {
            menuItem.addEventListener("click", function() {
                menuList.querySelector(".menu__item--active").classList.remove("menu__item--active");
                this.classList.add("menu__item--active");
            });
        }
    }

    addNavArrows();
    menuList = document.querySelector(".menu__list");
    toggleMenuEvent();
    menuItems = menuList.querySelectorAll(".menu__item");
    toggleActiveMenuItem();
});
