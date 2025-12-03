function setCors() {
    return function(req, res, next) {
        const allowedOrigins = ["http://localhost:5173", "https://graduation-thesis-0it6.onrender.com"];
        const origin = req.headers.origin;
        if (allowedOrigins.includes(origin)) {
            res.setHeader("Access-Control-Allow-Origin", origin);
        }
        res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, DELETE, POST");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Authorization");
        next();
    }
}

module.exports = {
    setCors
}