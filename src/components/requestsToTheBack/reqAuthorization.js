export const getIterations = (username, password, setToken, setMessage) => {
    return new Promise((reject) => {
        fetch('/api/v1/auth/sign-in', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response)
                    throw new Error('Ошибка: ' + response.status);
                }
                return response.text();
            })
            .then(result => {
                const jsonResponse = JSON.parse(result);
                const token = jsonResponse.token;
                setToken(token);
            })
            .catch(error => {
                setMessage('Ошибка при выполнении запроса:', error);
                reject(error); // Отклоняем promise в случае ошибки
            });
    })
};




// TODO: пример запроса с токеном
// export const postIssue = (setMessage) => {
//     var buff = 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwiaWQiOjMsImVtYWlsIjoiam9uZG9lMUBnbWFpbDEuY29tIiwic3ViIjoiSm9uSm9uIiwiaWF0IjoxNzEzNjIwMjAyLCJleHAiOjE3MTM3NjQyMDJ9.bQNZu0S2rXURJgRjtyShWJZ-HSNw_CM9KWcwinond5M';
//     fetch('/api/v1/tasks/addIssue', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',

//             'Authorization': buff
//         },
//         body: JSON.stringify({
//             "taskId": 12345,
//             "iterationId": 1
//         })
//     })
//         .then(response => {
//             if (!response.ok) {
//                 console.log(response)
//                 throw new Error('Ошибка сети: ' + response.status);
//             }
//             return response.text();
//         })
//         .then(result => {
//             console.log('Результат:', result);
//         })
//         .catch(error => {
//             setMessage('Ошибка при выполнении запроса:', error);
//         });
// }