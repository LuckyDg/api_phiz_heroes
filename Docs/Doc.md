# Cómo Prepárate para tu Próxima Raid con Node.js y Express

En este proyecto aprenderás a crear y gestionar clases de personajes para tu MMORPG usando **Node.js** y **Express**. Construirás una **API** que te permitirá crear, leer, actualizar y eliminar clases, al igual que en una **'raid'** donde un equipo se prepara para enfrentarse a grandes desafíos.

Una **'raid'** en los MMORPGs es una misión épica en la que varios jugadores se unen para vencer enemigos poderosos.

Para enfrentar las **'raids'** con éxito, necesitaremos formar un equipo compuesto por diferentes **clases**, cada una con su función única. Por ejemplo:

- **Guerrero**: El tanque que absorbe el daño.
- **Mago**: Lanza poderosos hechizos.
- **Sanador**: Mantiene al equipo con vida.
- **Arquero**: Ataca a distancia.
- **Ladrón**: Se especializa en ataques rápidos y sigilosos.

Cada clase será esencial para el éxito del equipo. ¡Vamos a por ello!

## Instalación de la librería `uuid`

Para instalar la librería `uuid`, que nos ayudará a generar identificadores únicos (UUIDs) para nuestras clases de personajes, puedes ejecutar el siguiente comando en tu terminal:

```bash
npm install uuid
```

Esto instalará la librería en tu proyecto y te permitirá usarla en el código.

## Explicación del Código

A continuación, te explico brevemente cómo funciona el código de las rutas en Express para gestionar las clases de los héroes.

### 1. Definición de Clases

Las clases de personajes están definidas en el arreglo `classes`. Cada clase tiene propiedades como `id`, `name`, `description`, `level`, `healthPoints`, `manaPoints`, `attack`, `defense`, `skills` y `weapon`. Cada clase se identifica con un UUID generado por la librería uuid.

### 2. Rutas del API

- GET /: Retorna todas las clases disponibles.
- GET /:id: Retorna los detalles de una clase específica, buscando por su id.
- POST /: Crea una nueva clase y la agrega al arreglo de clases.
- PATCH /:id: Actualiza parcialmente las propiedades de una clase específica utilizando su id.
- DELETE /:id: Elimina una clase específica por su id.

### 3. Ejemplo de Código

El siguiente fragmento de código es parte del archivo router que gestiona las rutas:

```javascript
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let classes = [
  {
    id: uuidv4(),
    name: 'Warrior',
    description: 'Fierce fighter with high strength. ⚔️',
    level: 1,
    healthPoints: 150,
    manaPoints: 30,
    attack: 20,
    defense: 15,
    skills: ['Sword Mastery', 'Shield Block'],
    weapon: 'Sword',
  },
  {
    id: uuidv4(),
    name: 'Mage',
    description: 'Master of magic and elemental forces. 🧙🏻‍♂',
    level: 1,
    healthPoints: 80,
    manaPoints: 150,
    attack: 25,
    defense: 10,
    skills: ['Fireball', 'Arcane Shield'],
    weapon: 'Staff',
  },
  {
    id: uuidv4(),
    name: 'Archer',
    description: 'Skilled with a bow and arrows. 🏹',
    level: 1,
    healthPoints: 100,
    manaPoints: 50,
    attack: 18,
    defense: 12,
    skills: ['Arrow Barrage', 'Eagle Eye'],
    weapon: 'Bow',
  },
  {
    id: uuidv4(),
    name: 'Priest',
    description: 'Healer and support for the team. ✨',
    level: 1,
    healthPoints: 90,
    manaPoints: 120,
    attack: 12,
    defense: 18,
    skills: ['Healing Touch', 'Holy Shield'],
    weapon: 'Mace',
  },
];
```

### 4. Ver todos los héroes de tu equipo (GET /)

El método GET / se utiliza para obtener todos los héroes disponibles en el equipo. Esto es útil para saber cuántos héroes tienes en tu "raid" y qué clases forman parte de tu equipo.
Para ello usamos el  `res.json(classes);` para traernos desde nuestra variable `classes` los datos y los enviamos al cliente.

```javascript
router.get('/', async (req, res) => {
  try {
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las clases', error: error.message });
  }
});
```

Cuando se realiza una petición GET /, el servidor responde con un arreglo de objetos que representan las clases de los héroes.

Ejemplo de respuesta:

```json
[
  {
    "id": "1cceba61-b865-4ad0-bf69-827f9a90bde6",
    "name": "Warrior",
    "description": "Fierce fighter with high strength. ⚔️",
    "level": 1,
    "healthPoints": 150,
    "manaPoints": 30,
    "attack": 20,
    "defense": 15,
    "skills": ["Sword Mastery", "Shield Block"],
    "weapon": "Sword"
  },
  {
    "id": "95b24be1-cfe6-48c6-8b4d-245b8c497a09",
    "name": "Mage 🧙🏻‍♂",
    "description": "Master of magic and elemental forces.",
    "level": 1,
    "healthPoints": 80,
    "manaPoints": 150,
    "attack": 25,
    "defense": 10,
    "skills": ["Fireball", "Arcane Shield"],
    "weapon": "Staff"
  },
  ....
]
```

### 5. Crear un nuevo héroe (POST /)

Para crear un nuevo héroe, envía una solicitud POST a `/api/heroes` con los datos del héroe en el cuerpo de la solicitud `(req.body)`. Usamos `uuid` para generar un ID único para cada héroe, similar a un documento de identidad. Luego, con el método `push`, añadimos el nuevo héroe al arreglo `classes` que guarda las clases en memoria.

**Nota:** Al estar en memoria, los héroes no persistirán si reinicias la aplicación.

```javascript
router.post('/', async (req, res) => {
  try {
    const {
      name,
      description,
      level,
      healthPoints,
      manaPoints,
      attack,
      defense,
      skills,
      weapon,
    } = req.body;

    const newClass = {
      id: uuidv4(),
      name,
      description,
      level,
      healthPoints,
      manaPoints,
      attack,
      defense,
      skills,
      weapon,
    };

    classes.push(newClass);
    res.status(201).json(newClass);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al crear la clase', error: error.message });
  }
});
```
Ejemplo de respuesta:

```json
{
    "id": "ca9301c4-7bea-44f7-a669-118d67dc5f5b",
    "name": "Rogue",
    "description": "Sneaky and quick, master of stealth. 🧝🏼",
    "level": 1,
    "healthPoints": 110,
    "manaPoints": 40,
    "attack": 22,
    "defense": 14,
    "skills": [
        "Backstab",
        "Invisibility"
    ],
    "weapon": "Dagger"
}
```

### 5. Ver detalles específicos de un héroe (GET /:id)

Si quieres obtener los detalles de un héroe específico, puedes hacer una petición GET `/:id`, donde `id` es el `UUID` del héroe que deseas consultar. Esto te devolverá los detalles completos de esa clase.

Para lograrlo, usamos `req.params.id` para extraer el `id` del héroe directamente desde la ruta de la solicitud. Luego, usamos el método `find()` en el arreglo `classes` para buscar el héroe correspondiente. Dentro del `find()`, empleamos una **arrow function** `(cls) => cls.id === classId`, que compara el `id` de cada héroe (`cls.id`) con el `classId` que obtenemos de la ruta.

Si la condición es verdadera, es decir, si el `id` del héroe coincide con el `classId`, el método `find()` devolverá ese héroe como un objeto completo. Si no se encuentra ningún héroe con ese `id`, el resultado será `undefined`. Lo que nos devolvera `Clase no encontrada`.


```javascript
router.get('/:id', async (req, res) => {
  try {
    const classId = req.params.id;
    const classItem = classes.find((cls) => cls.id === classId);

    if (classItem) {
      res.json(classItem);
    } else {
      res.status(404).json({ message: 'Clase no encontrada' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al obtener la clase', error: error.message });
  }
});
```

Ejemplo de solicitud:
```
GET /api/heroes/ca9301c4-7bea-44f7-a669-118d67dc5f5b
```

Ejemplo de respuesta:
```json
{
    "id": "ca9301c4-7bea-44f7-a669-118d67dc5f5b",
    "name": "Rogue",
    "description": "Sneaky and quick, master of stealth.",
    "level": 1,
    "healthPoints": 110,
    "manaPoints": 40,
    "attack": 22,
    "defense": 14,
    "skills": [
        "Backstab",
        "Invisibility"
    ],
    "weapon": "Dagger"
}
```

### 6. Actualizar parcialmente un héroe (PATCH /:id)

Supón que necesitas actualizar un atributo específico de un héroe, como cambiar el nivel de un `Rogue`. En lugar de usar `PUT` (que reemplaza todo el objeto), utilizamos `PATCH`, ya que este método permite modificar solo una parte del objeto, como el nivel o los puntos de salud, sin necesidad de enviar toda la información nuevamente.

En este proceso, usamos un `id` específico para actualizar solo el héroe que queremos. Como es una modificación parcial, extraemos los datos a actualizar a través de `req.body`.

Primero, buscamos el índice del héroe que queremos modificar. Utilizamos `findIndex()` para localizar el índice dentro del arreglo `classes`. Si encontramos el héroe (es decir, si el índice es diferente de -1), actualizamos sus datos. Si no lo encontramos, devolvemos un error indicando que el héroe no existe.

Para realizar la actualización, usamos la siguiente línea de código:

```javascript
classes[classIndex] = { ...classes[classIndex], ...updates };
```
La línea `classes[classIndex] = { ...classes[classIndex], ...updates };` hace lo siguiente:

- **`...classes[classIndex]`**: Utiliza el operador de expansión (`...`) también conocido como `desestructuración de objetos`, para copiar todas las propiedades del héroe original que se encuentra en `classes[classIndex]`. Esto significa que estamos tomando el objeto del héroe tal como está antes de la actualización.
  
- **`...updates`**: Toma las propiedades que vienen en `req.body`, que son las que deseamos actualizar. Estas propiedades pueden ser, por ejemplo, el nivel o puntos de salud de un héroe.
  
Al combinar ambos con el operador de expansión (`...`), se hace lo siguiente:
- Se conserva todo el objeto original del héroe.
- Se reemplazan solo las propiedades que han sido modificadas (es decir, las que vienen dentro de `updates`), dejando intactas las demás propiedades que no han sido cambiadas.

Esto permite realizar una **actualización parcial** del objeto, sin alterar las propiedades que no se desean modificar.

Finalmente, si el héroe se encuentra, se devuelve el objeto actualizado. Si no, se devuelve un error indicando que el héroe no fue encontrado.

```javascript
router.patch('/:id', async (req, res) => {
  try {
    const classId = req.params.id;
    const updates = req.body;

    const classIndex = classes.findIndex((cls) => cls.id === classId);

    if (classIndex !== -1) {
      // Actualizar parcialmente las propiedades
      classes[classIndex] = { ...classes[classIndex], ...updates };
      res.json(classes[classIndex]);
    } else {
      res.status(404).json({ message: 'Clase no encontrada' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al actualizar la clase', error: error.message });
  }
});
```

Ejemplo de solicitud:
```
PATCH /api/heroes/ca9301c4-7bea-44f7-a669-118d67dc5f5b
```
Supongomos que nuestro `Rogue` consiguio una poción de experiencia que lo llevara nivel 100. ¡Veamos que pasa!
Cuerpo de la solicitud:
```json
{
  "level": 100
}
```

Ejemplo de respuesta:
```json
{
    "id": "ca9301c4-7bea-44f7-a669-118d67dc5f5b",
    "name": "Rogue",
    "description": "Sneaky and quick, master of stealth. 🧝🏼",
    "level": 100, // ----> ¡y mira subimos de nivel!
    "healthPoints": 110,
    "manaPoints": 40,
    "attack": 22,
    "defense": 14,
    "skills": [
        "Backstab",
        "Invisibility"
    ],
    "weapon": "Dagger"
}
```

#### ¿Por qué usamos PATCH en lugar de PUT?

Utilizamos PATCH en lugar de PUT porque PATCH está diseñado para actualizaciones parciales, lo que significa que solo se actualizan los atributos que queremos modificar, dejando el resto intacto. Por el contrario, PUT reemplaza completamente el objeto, lo que no sería eficiente si solo queremos actualizar un atributo pequeño. Pero esto es acorde a el criterio de cada desarrollador sientete libre en usar PUT si asi lo deseas.

### 7. Eliminar un héroe (DELETE /:id)

En este proyecto decidimos que el ladrón (Rogue), aunque es útil en algunas situaciones, es una mala opción para formar un equipo balanceado, ya que el robo está mal visto en la mayoría de las "raids". Por eso, decidimos eliminarlo utilizando el método DELETE.
Finalmente, el método DELETE elimina el objeto del arreglo usando `splice()`, una función de JavaScript que remueve un elemento en un índice específico.
Cabe Recalcar que lo que estamos haciendo es considerado
como una **Eliminación lógica**.

**Nota**: Existen dos tipos de eliminación en el mundo real: la eliminación **física** y la eliminación **lógica**.

- **Eliminación física**: Es la eliminación de un objeto por completo, es decir, eliminamos el registro de la base de datos.
- **Eliminación lógica**: Implica eliminar un objeto cambiando su estado (por ejemplo, utilizando un atributo booleano que pase de `true` a `false`), en lugar de borrarlo por completo.

Cuando desarrollamos APIs, es importante considerar que la **eliminación lógica** es más común y recomendable que la eliminación física, especialmente en aplicaciones donde los datos eliminados pueden necesitar ser recuperados más tarde o donde es necesario llevar un historial de los cambios.

### Ejemplo:
Imagina un juego MMORPG donde un jugador quiere eliminar un héroe de su equipo. En lugar de eliminarlo físicamente de la base de datos, podríamos marcar al héroe como "inactivo" cambiando un atributo como `isActive: false`. De esta forma, el héroe no aparecerá en el juego, pero aún estará presente en la base de datos para referencias futuras o análisis.

Este enfoque de eliminación lógica permite realizar auditorías o recuperar datos más fácilmente en el futuro.

```javascript
router.delete('/:id', async (req, res) => {
  try {
    const classId = req.params.id;

    const classIndex = classes.findIndex((cls) => cls.id === classId);

    if (classIndex !== -1) {
      const deletedClass = classes.splice(classIndex, 1);
      res.json({ message: 'Clase eliminada', deletedClass });
    } else {
      res.status(404).json({ message: 'Clase no encontrada' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al eliminar la clase', error: error.message });
  }
});
```

Ejemplo de solicitud:
```
DELETE /api/heroes/ca9301c4-7bea-44f7-a669-118d67dc5f5b
```

Al realizar esta petición, el héroe específico será eliminado del equipo.

Ejemplo de respuesta:
```json
{
  "message": "Clase eliminada",
  "deletedClass": {
    "id": "some-uuid",
    "name": "Rogue",
    "description": "Sneaky and quick, master of stealth. 🗡️",
    "level": 1,
    "healthPoints": 110,
    "manaPoints": 40,
    "attack": 22,
    "defense": 14,
    "skills": ["Backstab", "Invisibility"],
    "weapon": "Dagger"
  }
}
```
### ¡Y con eso ya estás listo para tu próxima **Raid**!

---

### Pruebas

Si deseas probar la API, te dejo el repositorio en **GitHub** y un archivo de **Postman** para que puedas realizar las pruebas fácilmente.

**¿Qué es Postman?**
Postman es una herramienta muy útil para probar APIs. Permite realizar solicitudes HTTP, inspeccionar respuestas, y mucho más, lo que facilita la prueba y depuración de APIs durante el desarrollo.

#### Pasos para probar la API:

1. **Clona el repositorio**:
    ```bash
    git clone https://github.com/LuckyDg/api_phiz_heroes.git
    ```
2. Instala las dependencias: Entra en la carpeta del proyecto y ejecuta:

    ```bash
    npm install
    ```
3. Ejecuta la API en modo desarrollo o Producción(Tu escoges una de ambas): Para ejecutar la API en modo desarrollo (con recarga automática con ayuda de nodemon), usa:

  - Modo desarrollo:
    ```bash
    npm run dev
    ```

  - Modo producción:  

    ```bash
    npm run start
    ```

4. Importa el archivo de Postman:

- Descarga el archivo [Mmorpg_Api_Platzi_Node.postman_collection.json](../postman/Mmorpg_Api_Platzi_Node.postman_collection.json).
- Abre Postman y selecciona la opción para importar una colección.
- Importa el archivo descargado `Mmorpg_Api_Platzi_Node.postman_collection.json`.
- Una vez importado, podrás probar todas las rutas de la API directamente desde Postman.
- Espero que esta guía te sea útil para probar la API y empezar a crear tu equipo de héroes. 

**¡Buena suerte en tu próxima Raid!**

Saludos.
