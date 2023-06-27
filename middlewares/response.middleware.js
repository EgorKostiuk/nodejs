const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  
  // Метод для успішної відповіді
  res.sendResponse = (data) => {
    res.status(200).json(data);
  };

  // Метод для повернення помилки запиту
  res.sendBadRequest = (message) => {
    res.status(400).json({ error: true, message });
  };

  // Метод для повернення помилки "Дані не знайдено"
  res.sendNotFound = () => {
    res.status(404).json({ error: true, message: "Data not found" });
  };

  // Middleware для перехоплення помилок
  res.sendError = (error) => {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal server error" });
  };

  next();
};

export { responseMiddleware };
