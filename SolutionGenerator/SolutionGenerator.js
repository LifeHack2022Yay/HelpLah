const outputText = document.getElementById("output-text");
const loadingSpinner = document.getElementById("loading-spinner");


function copyOutput() {
  navigator.clipboard.writeText(outputText.innerText);
}

function summarizeIssue() {
  // Get the text from the textarea
  const statementInput = document.getElementById("text-input").value;
  const topicInput = document.getElementById("topic-input").value;
  const keywordsInput = document.getElementById("keyword-input").value;

  const defaultExamples = "--\n\
Problem Statement: E-waste recycling in Singapore\n\
Topic: Environment\n\
Keywords: Recycle, recycling, e-waste\n\
Solution: There are many e-waste bins around Singapore. You can deposit your waste in the e-waste bins around you!\n\
--\n\
Problem Statement: Reduce water consumption\n\
Topic: Environment\n\
Keywords: Home\n\
Solution: Taking shorter showers. You can also collect water used for boiling rice or washing vegetables to water plants at home, to reduce water consumption from the tap.\n\
--\n\
Problem Statement: Reduce waste in schools by using reusables and only ordering what is needed.\n\
Topic: Environment\n\
Keywords: School, reuse, waste\n\
Solution: In schools, we can cut down on waste production by using reusables. This includes refillable soap dispensers and the cutlery used in the school canteens. Also, avoid over-catering food and drinks for school activities and events.\n\
--"

  var inputData = defaultExamples + "\nProblem Statement: " + statementInput  + "\nTopic: " + topicInput + "\nKeywords: " + keywordsInput + "\nSolution: ";

  loadingSpinner.style.display = "block";

  const data = {
    prompt: inputData,
    max_tokens: 100,
    temperature: 0.8,
    k: 0,
    p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: ["--"],
    return_likelihoods: "NONE",
  };

  console.log(inputData)

  fetch("https://api.cohere.ai/large/generate", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      Authorization: "BEARER Z27gzY8VM4tyRDubqKSbPD13rxWcMolpu1Q6TEYd",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      loadingSpinner.style.display = "none";
      console.log("Success:", data);
      outputText.innerText = data.text;
    })
    .catch((error) => {
      loadingSpinner.style.display = "none";
      console.error("Error:", error);
    });
}
