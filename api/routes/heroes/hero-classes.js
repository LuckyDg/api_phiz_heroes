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

router.get('/', async (req, res) => {
  try {
    res.json(classes);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al obtener las clases', error: error.message });
  }
});

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

module.exports = router;
