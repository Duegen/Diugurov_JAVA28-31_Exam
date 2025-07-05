function createCard(parent){
    const questionCard = document.createElement("div");
    questionCard.classList.add("question_card");
    parent.append(questionCard);
    return questionCard;
}
function createHeader(parent){
    const questionCardHeader = document.createElement("div");
    questionCardHeader.classList.add("question_card_header");
    parent.append(questionCardHeader);
    return questionCardHeader;
}
function createHeaderTitle(parent, text){
    const questionCardHeader_title = document.createElement("p");
    questionCardHeader_title.classList.add("question_card_header_title");
    questionCardHeader_title.textContent = text;
    parent.append(questionCardHeader_title);
}
function createHeaderChecks(parent){
    const questionCardHeader_checks = document.createElement("div");
    questionCardHeader_checks.classList.add("question_card_header_checks");
    parent.append(questionCardHeader_checks);

    const checkYes =  document.createElement("input");
    checkYes.type = "checkbox";
    checkYes.id = "checkYes";
    checkYes.name = "radio";
    checkYes.value = "yes";
    checkYes.classList.add("check");
    const checkYesLabel =  document.createElement("label");
    checkYesLabel.htmlFor = "checkYes";
    checkYesLabel.textContent = "true";
    questionCardHeader_checks.append(checkYesLabel);
    questionCardHeader_checks.append(checkYes);
    const checkNo =  document.createElement("input");
    checkNo.type = "checkbox";
    checkNo.id = "checkNo";
    checkNo.name = "radio";
    checkNo.value = "no";
    checkNo.classList.add("check");
    const checkNoLabel =  document.createElement("label");
    checkNoLabel.htmlFor = "checkYes";
    checkNoLabel.textContent = "false";
    questionCardHeader_checks.append(checkNo);
    questionCardHeader_checks.append(checkNoLabel);
}
function createCardBody(parent){
    const questionCardBody = document.createElement("div");
    questionCardBody.classList.add("question_card_body");
    parent.append(questionCardBody);
    return questionCardBody;
}
function createCardBodyHeader(parent, text){
    const questionCardBody_header = document.createElement("h2");
    questionCardBody_header.textContent = text;
    parent.append(questionCardBody_header);
}
function createCardBodyBody(parent){
    const questionCardBody_body = document.createElement("div");
    questionCardBody_body.classList.add("question_card_body_body");
    parent.append(questionCardBody_body);
    return questionCardBody_body;
}
function createCardBodyBodyQuestion(parent, text){
    const questionCardBody_bodyQuestion =  document.createElement("p");
    questionCardBody_bodyQuestion.classList.add("question_card_body_body_question");
    questionCardBody_bodyQuestion.textContent = text
    parent.append(questionCardBody_bodyQuestion);
}
function createCardBodyBodyVariants(parent, obj, answer){
    const questionCardBody_bodyVariants =  document.createElement("div");
    questionCardBody_bodyVariants.classList.add("question_card_body_body_variants");
    parent.append(questionCardBody_bodyVariants);

    const variants = Object.values(obj);
    variants.forEach(variant => {
        let variantP = document.createElement("p");
        variantP.textContent = variant;
        questionCardBody_bodyVariants.append(variantP);
        if(variant[0] === answer) variantP.style.textDecoration = "underline";
    })
}
function createCardBodyExplainer(parent, text){
    const questionCardBody_explainer = document.createElement("p");
    questionCardBody_explainer.textContent = text;
    parent.append(questionCardBody_explainer);
}

for (let i = 0; i < numberOfQuestions; i++) {
    //Card
    const card = createCard(questionDisplay)



    // const questionCard = document.createElement("div");
    // questionCard.classList.add("question_card");
    // questionDisplay.append(questionCard);

    //Card header
    const cardHeader = createHeader(card)
    // const questionCardHeader = document.createElement("div");
    // questionCardHeader.classList.add("question_card_header");
    // questionCard.append(questionCardHeader);

    // Card header title

    createHeaderTitle(cardHeader,"Question №" + questionBodies[i].qNumber)
    // const questionCardHeader_title = document.createElement("p");
    // questionCardHeader_title.classList.add("question_card_header_title");
    // questionCardHeader_title.textContent = "Question №" + questionBodies[i].qNumber;
    // questionCardHeader.append(questionCardHeader_title);


    // Card header checks
    createHeaderChecks(cardHeader)
    // const questionCardHeader_checks = document.createElement("div");
    // questionCardHeader_checks.classList.add("question_card_header_checks");
    // questionCardHeader.append(questionCardHeader_checks);
    //
    // const checkYes =  document.createElement("input");
    // checkYes.type = "checkbox";
    // checkYes.id = "checkYes";
    // checkYes.name = "radio";
    // checkYes.value = "yes";
    // checkYes.classList.add("check");
    // const checkYesLabel =  document.createElement("label");
    // checkYesLabel.htmlFor = "checkYes";
    // checkYesLabel.textContent = "true";
    // questionCardHeader_checks.append(checkYesLabel);
    // questionCardHeader_checks.append(checkYes);
    // const checkNo =  document.createElement("input");
    // checkNo.type = "checkbox";
    // checkNo.id = "checkNo";
    // checkNo.name = "radio";
    // checkNo.value = "no";
    // checkNo.classList.add("check");
    // const checkNoLabel =  document.createElement("label");
    // checkNoLabel.htmlFor = "checkYes";
    // checkNoLabel.textContent = "false";
    // questionCardHeader_checks.append(checkNo);
    // questionCardHeader_checks.append(checkNoLabel);

    //Card body
    const cardBody = createCardBody(card)
    // const questionCardBody = document.createElement("div");
    // questionCardBody.classList.add("question_card_body");
    // questionCard.append(questionCardBody);

    //Card body header
    createCardBodyHeader(cardBody, questionBodies[i].header)
    // const questionCardBody_header = document.createElement("h2");
    // questionCardBody_header.textContent = questionBodies[i].header;
    // questionCardBody.append(questionCardBody_header);

    //Card body-body
    const cardBodyBody = createCardBodyBody(cardBody)
    // const questionCardBody_body = document.createElement("div");
    // questionCardBody_body.classList.add("question_card_body_body");
    // questionCardBody.append(questionCardBody_body);

    //Card body-body question
    createCardBodyBodyQuestion(cardBodyBody, questionBodies[i].question)
    // const questionCardBody_bodyQuestion =  document.createElement("p");
    // questionCardBody_bodyQuestion.classList.add("question_card_body_body_question");
    // questionCardBody_bodyQuestion.textContent = questionBodies[i].question
    // questionCardBody_body.append(questionCardBody_bodyQuestion);

    //Card body-body variants
    createCardBodyBodyVariants(cardBodyBody, questionBodies[i].variants, questionBodies[i].answer)
    // const questionCardBody_bodyVariants =  document.createElement("div");
    // questionCardBody_bodyVariants.classList.add("question_card_body_body_variants");
    // questionCardBody_body.append(questionCardBody_bodyVariants);
    //
    // const variants = Object.values(questionBodies[i].variants);
    // variants.forEach(variant => {
    //     let variantP = document.createElement("p");
    //     variantP.textContent = variant;
    //     questionCardBody_bodyVariants.append(variantP);
    //     if(variant[0] === questionBodies[i].answer) variantP.style.textDecoration = "underline";
    // })

    //Card body explainer
    createCardBodyExplainer(cardBody,"Explanation: " + questionBodies[i].explanation)
    // const questionCardBody_explainer = document.createElement("p");
    // questionCardBody_explainer.textContent = "Explanation: " + questionBodies[i].explanation;
    // questionCardBody.append(questionCardBody_explainer);
}