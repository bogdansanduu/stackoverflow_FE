export async function signIn(requestBody: any) {
    const response = await fetch('http://localhost:8080/auth/signIn', {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(requestBody)
    }).then(res => res.json());

    if (!response.status) {
        localStorage.setItem('token', response.token);
        console.log('token----->', response);
    }
    return await response;
}