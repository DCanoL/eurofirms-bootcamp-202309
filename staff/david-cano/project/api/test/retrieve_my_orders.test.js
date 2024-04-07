const req = {
    method: 'GET',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWU5YTY0MDczMTE3YzZkNDQ3ZmFhZTAiLCJpYXQiOjE3MTI0NTkxMzksImV4cCI6MTcxNTA1MTEzOX0.X9sqRrEplcPva_waeomVZMWreWv1cvGLsNVBsfENRX8',
    },
}

fetch('http://localhost:8080/orders/mine', req)
    .then(res => {
        if (!res.ok) {
            res.json()
                .then(body => console.error(body))
                .catch(error => console.error(error))

            return
        }

        res.json()
            .then(orders => console.log(res.status, orders))
            .catch(error => console.error(error))
    })
    .catch(error => console.error(error))