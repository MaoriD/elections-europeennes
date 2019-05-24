const asyncFetch = async (path, formData = undefined, type = 'GET') => {
    if(type == 'GET'){
        const response = await fetch(path)
        const data = await response.json()
        let myUsers = [];
        data.rows.map( item => {

            if(item.doc.author){
                if(item.doc.author === 'groupe4'){
                    myUsers.push(item.doc)

                }
            }
        } )
        console.log(myUsers)
    }
    else{
        const response = await fetch(path, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                "Content-type": "application/json"
            },
        })
        const data = await response.json()
        console.log(data)
        asyncFetch('https://ldp.dwsapp.io/mm4-europe/_all_docs?include_docs=true');
    }
}
const formSubmition = () => {
    document.querySelector('form').addEventListener('submit', event => {
        event.preventDefault();

        asyncFetch('https://ldp.dwsapp.io/mm4-europe/', {
            vote: document.querySelector('input[name="votes"]').value,
            prenom: document.querySelector('#prenom').value,
            nom: document.querySelector('#nom').value,
            age: document.querySelector('#age').value,
            ville: document.querySelector('#ville').value,
            email: document.querySelector('#mail').value,
            newsletter: document.querySelector('#newsletter').value,
            author: 'groupe4'
        }, 'POST')
    })
}

document.addEventListener('DOMContentLoaded', () => {

    formSubmition();

    asyncFetch('https://ldp.dwsapp.io/mm4-europe/_all_docs?include_docs=true');
})