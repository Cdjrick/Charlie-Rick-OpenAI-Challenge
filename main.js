let prompt = document.getElementById('prompt')

document.getElementById('submit').addEventListener('click', () => {
    APIArray = []

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
            Authorization: `Bearer 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`
        },
        body: JSON.stringify(data)
    })
    .then(response => { 
        let res = response.json()
        console.log(res)
        return res
    })
    // .then(()  => {
    //     let responseData = {
    //         prompt: prompt.value,
    //         completion: res.
    //     }
    // })
    .catch((error) => {
        console.log('Error: ', error)
    })

    prompt.value = ''
})