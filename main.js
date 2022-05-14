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
            Authorization: `Bearer (YOUR API KEY)`
        },
        body: JSON.stringify(data)
    })
    .then(response => { 
        let res = response.json()
        console.log(res)

        // console.log(res.promise[promiseResult].choices[0].text)
        return res
    })
    // .then(()  => {
    //     let responseData = {
    //         prompt: prompt.value,
    //         completion: res.promise.promiseResult.choices[0].text
    //     }
    // })
    .catch((error) => {
        console.log('Error: ', error)
    })

    prompt.value = ''
})