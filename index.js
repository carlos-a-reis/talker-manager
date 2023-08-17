const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const tokens = [];

const tokenGenerator = () => crypto.randomBytes(8).toString('hex');

const getTalkers = async () => {
  try {
    const data = await fs.readFile('./talker.json');
    return JSON.parse(data); 
  } catch (err) {
    return [];
  }
};

const tokenAuthentication = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });

  const validToken = tokens.find((t) => t.token === authorization);

  if (!validToken) return res.status(401).json({ message: 'Token inválido' });

  next();
};

const infoValidation = (req, res, next) => {
  const { name, age } = req.body;

  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const talkValidation = (req, res, next) => {
  const { talk } = req.body;
  const dateValidation = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  
  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });

  if (!talk.watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  if (!dateValidation.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const rateValidation = (req, res, next) => {
  const { talk } = req.body;

  if (!talk.rate && talk.rate !== 0) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

app.get('/talker', async (_req, res) => {
  const talkers = await getTalkers();
  
  res.status(200).json(talkers);
});

app.get('/talker/search', tokenAuthentication, async (req, res) => {
  const talkers = await getTalkers();
  const { q } = req.query;

  if (q === '') return res.status(200).json(talkers);

  const searchResult = talkers.filter((t) => t.name.toLowerCase().includes(q.toLowerCase()));

  res.status(200).json(searchResult);
});

app.get('/talker/:id', async (req, res) => {
  const talkers = await getTalkers();
  const { id } = req.params;
  const talker = talkers.find((t) => t.id === Number(id));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talker);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const validator = /\S+@\S+\.\S+/;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!validator.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  
  const token = tokenGenerator();
  tokens.push({ token });

  res.status(200).json({ token });
});

app.post('/talker', 
[tokenAuthentication, infoValidation, talkValidation, rateValidation], 
async (req, res) => {
  const talkers = await getTalkers();
  const { name, age, talk } = req.body;

  const newTalker = {
    id: talkers.length + 1,
    name,
    age,
    talk,
  };
  
  talkers.push(newTalker);
  try {
    await fs.writeFile('./talker.json', JSON.stringify(talkers));
  } catch (err) {
    res.status(401).json({ message: err });
  }

  res.status(201).json(newTalker);
});

app.put('/talker/:id', 
[tokenAuthentication, infoValidation, talkValidation, rateValidation],
async (req, res) => {
  const talkers = await getTalkers();
  const { name, age, talk } = req.body;
  const { id } = req.params;

  const editedTalker = { id: Number(id), name, age, talk };

  const talkerIndex = talkers.findIndex((t) => t.id === Number(id));
  if (talkerIndex === -1) return res.status(404).json({ message: 'Id não encontrado' });

  talkers.splice(talkerIndex, 1, editedTalker);

  try {
    await fs.writeFile('./talker.json', JSON.stringify(talkers));
  } catch (err) {
    res.status(401).json({ message: err });
  }
  
  res.status(200).json(editedTalker);
});

app.delete('/talker/:id', tokenAuthentication, async (req, res) => {
  const talkers = await getTalkers();
  const { id } = req.params;

  const talkerIndex = talkers.findIndex((t) => t.id === Number(id));
  if (talkerIndex === -1) return res.status(404).json({ message: 'Id não encontrado' });

  talkers.splice(talkerIndex, 1);

  try {
    await fs.writeFile('./talker.json', JSON.stringify(talkers));
  } catch (err) {
    res.status(401).json({ message: err });
  }

  res.status(204).end();
});

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
