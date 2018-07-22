document.addEventListener("DOMContentLoaded", function () {

    let portfolioSection = document.querySelector(".portfolio-section");
    let projectsContainer = document.querySelector(".portfolio-section__projects-container");
    let projects;
    let currentProjectsPosition = 0; // bieżące przesunięcie projektów w sekcji portfolio
    let middleProject;

    function moveProjects(isRight) {
        projects = document.querySelectorAll(".project");
        console.log(projects.length);
        middleProject = document.querySelector(".project--middle");
        middleProject.classList.remove("project--middle");
        if (isRight) { // move right
            currentProjectsPosition++;
            middleProject.previousElementSibling.classList.add("project--middle");
        } else { // move left
            currentProjectsPosition--;
            middleProject.nextElementSibling.classList.add("project--middle");
        }
        let movePerc = (currentProjectsPosition * 100)
        for (p of projects) {
            p.style.transform = "translateX(" + movePerc + "%)";
            console.log("translateX(" + movePerc + "%)");
        }
        
    }

    // isRight - kierunek przesunięcia
    function cloneProject(isRight) {
        middleProject = document.querySelector(".project--middle");
        let leftProject = middleProject.previousElementSibling; // pobierz lewy projekt
        let rightProject, clone;
        if (isRight) { // przesuwamy w prawo, wiec prawy projekt klonujemy i umieszczamy go w miejscu lewego
            rightProject = middleProject.nextElementSibling; // pobierz prawy projekt
            clone = rightProject.cloneNode(true); // sklonuj prawy projekt
            clone.classList.add("project--reserve-left");
            clone.style.left = Math.abs(currentProjectsPosition + 1) * (-33.333333) + "%";
            projectsContainer.insertBefore(clone, leftProject);
        } else { // przesuwamy w lewo, wiec lewy projekt klonujemy i umieszczamy go w miejscu prawego
            clone = leftProject.cloneNode(true); // sklonuj lewy projekt
            clone.classList.add("project--reserve-right");
            clone.style.right = Math.abs(currentProjectsPosition - 1) * (-33.333333) + "%";
            projectsContainer.appendChild(clone);
        }
        clone.clientHeight; // wymusza zastosowanie transition do nowych elementów
    }

    function addNavArrows() {
        let leftArrow = document.createElement("a");
        leftArrow.classList.add("portfolio-section__arrow", "portfolio-section__arrow--left");
        leftArrow.innerHTML = "<span>&#60;</span>";

        leftArrow.addEventListener("click", function () {
            cloneProject(false);
            moveProjects(false);
        });

        let rightArrow = document.createElement("a");
        rightArrow.classList.add("portfolio-section__arrow", "portfolio-section__arrow--right");
        rightArrow.innerHTML = "<span>&#62;</span>";

        rightArrow.addEventListener("click", function () {
            cloneProject(true);
            moveProjects(true);
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

    addNavArrows();

});
