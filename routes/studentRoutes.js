const express = require('express');
const router = express.Router();

const { Student } = require('../db/index');

router.get('/', async (request, result, next) => {
  try {
    const students = await Student.findAll();

    result.json(students);
  } catch (error) { next(error) }
});

router.get('/:id/testMean', async (request, result, next) => {
  try {
    const student = await Student.findById(request.params.id);
    const tests = await student.getTests();
    const mean = tests.reduce((sum, test) => {
      sum += Number(test.score);
      return sum;
    }, 0) / tests.length;

    result.send(`<h1>${mean}</h1>`)
  } catch (error) { next(error) }
});

router.get('/:id', async (request, result, next) => {
  try {
    const student = await Student.findById(request.params.id);
    result.json(student);
  } catch (error) { next(error) }
});

router.put('/:id', async (request, result, next) => {
  try {
    const student = await Student.findById(request.params.id);
    student.update({name: request.body.name});
    result.redirect(`/student/${request.params.id}`);
  } catch (error) { next(error) }
});

router.delete('/:id', async (request, result, next) => {
  try {
    const student = await Student.findById(request.params.id);
    student.destroy();
    result.redirect('/student');
  } catch (error) { next(error) }
});

module.exports = router;
