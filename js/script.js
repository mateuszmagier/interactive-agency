document.addEventListener("DOMContentLoaded", function() {
    
    function addNavArrows() {
        let leftArrow = document.createElement("a");
        leftArrow.classList.add("portfolio-section__arrow", "portfolio-section__arrow--left");
        leftArrow.innerHTML = "<span>&#60;</span>";
        
        let rightArrow = document.createElement("a");
        rightArrow.classList.add("portfolio-section__arrow", "portfolio-section__arrow--right");
        rightArrow.innerHTML = "<span>&#62;</span>";
        
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