let prompt = document.getElementById('prompt')

localStorage.removeItem('userChoices')

function updateStorage(responseData) {
    if(localStorage.getItem('userChoices') === null) {
        let responseArray = []
        responseArray.push(responseData)

        localStorage.setItem('userChoices', JSON.stringify(responseArray))
        console.log('Item has been added')

        return
    }

    let userChoices = localStorage.getItem('userChoices')
    let choices = JSON.parse(userChoices)

    choices.push(responseData)
    localStorage.setItem('userChoices', JSON.stringify(choices))

    console.log('Item has been added')
}

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
            Authorization: `Bearer (YOUR API KEY)`
        },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((res)  => {
        
        let responseData = {
            prompt: data.prompt,
            completion: res.choices[0].text
        }

        updateStorage(responseData)
    })
    .catch((error) => {
        console.log('Error: ', error)
    })
    prompt.value = ''
})