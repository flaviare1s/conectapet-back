export function errorHandler(err, req, res, next) {
    console.error(err);

    const status = err.statusCode || 500;
    const message = err.message || "Erro interno do servidor";

    res.status(status).json({
        error: message,
        details: err.details || undefined,
    });
}