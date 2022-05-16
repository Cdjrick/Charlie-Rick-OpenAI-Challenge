let prompt = document.getElementById('prompt')
let savedPrompts = document.getElementById('savedPrompts')

// Load and display all localstorage items on page load
function initializeStorage() {
    if (localStorage.getItem('userChoices') === null) {
        return
    }
    let userChoices = localStorage.getItem('userChoices')
    let choices = JSON.parse(userChoices)

    displayStorage(choices)
}

// Store and display all local storage items into an html div
function displayStorage(choices) {
    let c = choices.length
    while (c--) {
        let div = document.createElement('div')
        let p1 = document.createElement('p')
        let p2 = document.createElement('p')

        p1.textContent = `Prompt - ${choices[c].prompt}`
        p2.textContent = `Completion - ${choices[c].completion}`

        div.appendChild(p1)
        div.appendChild(p2)
        savedPrompts.prepend(div)
    }
}

// Set and get localstorage items to decode
function updateStorage(responseData) {
    let userChoices = localStorage.getItem('userChoices')
    let choices = JSON.parse(userChoices)

    if (localStorage.getItem('userChoices') === null) {
        let responseArray = []
        responseArray.push(responseData)

        localStorage.setItem('userChoices', JSON.stringify(responseArray))
        console.log('Item has been added')

        return
    }

    choices.push(responseData)
    localStorage.setItem('userChoices', JSON.stringify(choices))

    console.log('Item has been added')
}

initializeStorage()

// Submit button functionality -------- Fetch statement
document.getElementById('submit').addEventListener('click', () => {
    let data = {
        prompt: prompt.value,
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0
    }

    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",

            //
            // ENTER YOUR API KEY HERE -----------
            Authorization: `Bearer YOUR_API_KEY`
            //
            //

        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((res) => {

            // Create data object to store the prompt and the completion response from the api
            let responseData = {
                prompt: data.prompt,
                completion: res.choices[0].text
            }
            updateStorage(responseData)
            displayStorage([responseData])
        })
        .catch((error) => {
            console.log('Error: ', error)
        })
    // Reset text area
    prompt.value = ''
})