const express = require('express');
const router = express.Router();

const { Test } = require('../db/index');

router.get('/', async (request, result, next) => {
  try {
    const tests = await Test.findAll();
    result.json(tests);
  } catch (error) {
    next(error)
  };
});

router.post('/', (request, result, next) => {
  try {
   Test.create({
    name: request.body.name,
    score: request.body.score
   });
   result.redirect('/test')
  } catch (error) {
    next(error);
  }
});

router.get('/:id', (request, result, next) => {
  try {
    const test = Test.findById(request.params.id);
    result.json(test);
  } catch (error) {
    next(error)
  }
});

router.put('/:id', (request, result, next) => {
  try {
    const test = Test.findById(request.params.id);
    test.update({
      score: request.body.score
    });
    result.redirect(`/test/${request.params.id}`)
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', (request, result, next) => {
  try {
    const test = Test.findById(request.params.id);
    test.destroy();
    result.redirect('/test');
  } catch (error) {
    next(error);
  }
});


module.exports = router;
