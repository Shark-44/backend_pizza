
const supportedLanguages = ['gb', 'fr', 'it'];

const checkLanguage = (req, res, next) => {
  const language = req.query.lang;

  if (!supportedLanguages.includes(language)) {
    return res.status(400).send({ error: 'Unsupported language' });
  }

  req.language = language; 
  next();
};

module.exports = checkLanguage;
