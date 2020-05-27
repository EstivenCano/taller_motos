const express = require('express');
const cors = require('cors');

//Inicializar la libreria
const app = express();
app.use(express.json());

//Implementación de CORS
app.use(cors());

//Información que se obtendrá en nuestra URL principal.
app.get("/", (req, res) => {
  res.send("API Gestión de taller mecánico de motos");
});

//Importar las rutas con los endpoints especificos
const rutas_motos = require("./routes/motos");
app.use(rutas_motos);

//Puerto
const PORT = process.env.PORT || 3001;

//Levantar el servidor para escuchar los puertos
app.listen(PORT, () => {
  console.log(`Escuchando API en http://localhost:${PORT}`);
});
