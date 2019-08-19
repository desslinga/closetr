const { main } = require('@requestHandlers');

module.exports = (req, res) => main(req, res)
    .then(data => {
        res.status(data.status).send(data.message);
    })
    .catch(error => {
        res.status(error.status).send(error.message);
    });
