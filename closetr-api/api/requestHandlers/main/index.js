module.exports = (res, req) => new Promise((resolve, reject) => {
    resolve({
        status: 200,
        message: 'Welcome to the Closetr API!',
    });
});
