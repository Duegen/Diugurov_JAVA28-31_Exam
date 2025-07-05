const checksHandler = (event) => {
    if(event.target.value === "yes"){

        if (event.target.checked){
            if(event.target.parentElement.lastChild.previousSibling.checked){
                numberOfQuestionsFalse--;
                event.target.parentElement.lastChild.previousSibling.checked = false;
            }
            else {
                event.currentTarget.lastElementChild.classList.add("hidden");
                numberOfQuestionsChecked++;
            }
            event.currentTarget.firstChild.style.background = "green";
            numberOfQuestionsTrue++;
        }
        else {
            event.currentTarget.lastElementChild.classList.remove("hidden")
            event.currentTarget.firstChild.style.background = "bisque";
            numberOfQuestionsChecked--;
            numberOfQuestionsTrue--;
        }
    }
    if(event.target.value === "no"){

        if (event.target.checked){
            if(event.target.parentElement.firstChild.nextSibling.checked){
                numberOfQuestionsTrue--;
                event.target.parentElement.firstChild.nextSibling.checked = false;
            }
            else{
                event.currentTarget.lastElementChild.classList.add("hidden")
                numberOfQuestionsChecked++;
            }
            event.currentTarget.firstChild.style.background = "red";
            numberOfQuestionsFalse++;
        }
        else {
            event.currentTarget.lastElementChild.classList.remove("hidden")
            event.currentTarget.firstChild.style.background = "bisque";
            numberOfQuestionsChecked--;
            numberOfQuestionsFalse--;
        }
    }
    countsStr.textContent = `Questions: ${numberOfQuestions} / Checked questions: ${numberOfQuestionsChecked} / True questions: ${numberOfQuestionsTrue} / False questions: ${numberOfQuestionsFalse}`;
}


