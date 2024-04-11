const req = {
    method: 'POST',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWZiMzA4NTYxNDU0NzZiODRiYmQ3NTciLCJpYXQiOjE3MTI0NjA1MzcsImV4cCI6MTcxNTA1MjUzN30.pF0PdhNMToB6-jqmo8REkowtwt7K1eqY8FvA13dIk2E',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ products: ['65f1d80755ed6a0845599886', '65e5550b3f7f7003d4fc8ffb', '65f1ef7455ed6a0845599a39'], payment: 'success', statusOrder: 'Processing'})
}

fetch('http://localhost:8080/orders', req)
    .then(res => {
        if (!res.ok) {
            res.json()
                .then(body => console.error(body))
                .catch(error => console.error(error))

            return
        }

        console.log(res.status)
    })
    .catch(error => console.error(error))