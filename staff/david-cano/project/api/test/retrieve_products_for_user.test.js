const req = {
    method: 'GET',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjE5NGQ1YTkxMTI2NDcyNjNmZGI0ODIiLCJpYXQiOjE3MTMwNjU3NjgsImV4cCI6MTcxNTY1Nzc2OH0.cMmkklUAu3I8zzQTtLssk-7Y_YLzES4-3ydioWIoWRQ',
    }
}

fetch('http://localhost:8080/products/forUser', req)
    .then(res => {
        if (!res.ok) {
            res.json()
                .then(body => console.error(body))
                .catch(error => console.error(error))

            return
        }

        res.json()
            .then(products => console.log(res.status, products))
            .catch(error => console.error(error))
    })
    .catch(error => console.error(error))