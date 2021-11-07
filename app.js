// const experss = require(express);

exports.myFunction = (request, response) => {

    const message = 'Hello node!';

    response.status(200).send(message);
}