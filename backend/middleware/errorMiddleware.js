export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404);

    next(error);
}


export const errorHandler = (err, req, res, next) => {
    if (err) {
        res.status(500);
        res.json({
            message: err.message,
        });
    }
}