let prompt = document.getElementById('prompt')
let submit = document.getElementById('submit')

let promptArray = []

let data = {
    prompt: promptArray,
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0
}


submit.addEventListener('click', () => {
    promptArray.length = 0
    // console.log(prompt.value)
    promptArray.push(prompt.value)

    prompt.value = ''

    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify(data)
    })
    .then(data => {
        console.log('success: ', data)
    })
    .catch((error) => {
        console.log('Error: ', error)
    })
})



