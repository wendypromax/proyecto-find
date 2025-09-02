import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const port = 3000;

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'mi_base_de_datos';

app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Servidor activo ✅');
});

// Endpoint de registro
app.post('/register', async (req, res) => {
  const { nombre, edad, email, password } = req.body;

  if (!nombre || !edad || !email || !password) {
    return res.status(400).send({ message: 'Todos los campos son obligatorios' });
  }

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('usuarios');

    const existe = await collection.findOne({ email });
    if (existe) {
      return res.status(400).send({ message: 'El usuario ya existe' });
    }

    const resultado = await collection.insertOne({ nombre, edad, email, password });
    res.status(201).send({ message: 'Usuario registrado', id: resultado.insertedId });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error en el servidor' });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

