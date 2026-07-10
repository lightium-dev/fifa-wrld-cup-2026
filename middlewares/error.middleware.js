export const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Erreur serveur interne";

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      details: err.errors ? err.errors.map((item) => item.message) : undefined,
    },
  });
};
