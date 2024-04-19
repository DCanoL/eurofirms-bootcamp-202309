const req = {
    method: 'GET',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjFjNjdiODM2ZTZkN2E5NDkwZGRlMTEiLCJpYXQiOjE3MTM1NDk3OTgsImV4cCI6MTcxNjE0MTc5OH0.sMoQf5sR31hvan-kY3o9M_EqYy3yY49g7foHLnNSE6s',
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