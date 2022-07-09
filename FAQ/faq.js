document.addEventListener("DOMContentLoaded", function () {
    const questions = document.getElementById("questions");
    const form = document.getElementById("searchbar");
    const loadingSpinner = document.getElementById("loading-spinner");
    const clearButton = document.getElementById("clearbutton");

    // fetch all questions on first load
    fetch("faq.json")
    .then((response) => response.json())
    .then((json) =>
        json.forEach((element) => {
            let question = document.createElement("div");
            question.innerHTML = `
        <div class="card" id="question">
        <h5 class="card-title">${element.question}</h5>
        <p class="card-text">${element.answer}</p>
        </div>
        `;
            questions.appendChild(question);
        })
    ); 

    clearButton.addEventListener("click", function () {
        form.reset();
        location.reload();
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        loadingSpinner.style.display = "flex";

        let query = document.getElementById("searchinput").value.toLowerCase();
        let questions = document.getElementById("questions");
        questions.innerHTML= ``; //set the div to nothing first
        const data = {
            taskDescription: '',
            outputIndicator: '',
            inputs: [query],
            examples: [{"text": "What is a volunteer?", "label": "Volunteer"}, {"text": "I\'m interested in volunteering. How do I apply?", "label": "Volunteer"}, {"text": "What do I need to do to be a volunteer?", "label": "Volunteer"}, {"text": "Is it free to upload openings on this website?", "label": "Organisation"}, {"text": "What information do I need when I create an opening?", "label": "Organisation"}, {"text": "How does this website benefit me?", "label": "Organisation"}, {"text": "How do I make sure that those who applied fit the role?", "label": "Organisation"}, {"text": "Is there a limit on the number of openings I can post?", "label": "Organisation"}, {"text": "How do I create an account?", "label": "Website"}, {"text": "Can I trust this website?", "label": "Website"}, {"text": "Where can I donate?", "label": "Website"}, {"text": "Is this website free?", "label": "Website"}, {"text": "How does this FAQ work?", "label": "Website"}, {"text": "Why should I volunteer?", "label": "Volunteer"}, {"text": "What is the commitment level for volunteering?", "label": "Volunteer"}, {"text": "What should I do if I fall sick before the start of volunteering?", "label": "Volunteer"}]
          };
    
          fetch("https://api.cohere.ai/medium/classify", {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
              Authorization: "BEARER Z27gzY8VM4tyRDubqKSbPD13rxWcMolpu1Q6TEYd",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
                let category = data.classifications[0].prediction;

                fetch("faq.json")
                .then((response) => response.json())
                .then((json) => {
                    json.forEach((element) => {
                        let question = document.createElement("div");
                        question.innerHTML = `
                    <div class="card" id="question">
                    <h5 class="card-title">${element.question}</h5>
                    <p class="card-text">${element.answer}</p>
                    </div>
                    `;
                        element.category.includes(category)
                            ? questions.appendChild(question)
                            : null;
                    });
                });
                console.log("Success:", data);
                loadingSpinner.style.display = "none";
            })
            .catch((error) => {
                loadingSpinner.style.display = "none";
                console.error("Error:", error);
            }); 
    }); 
});