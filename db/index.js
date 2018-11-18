const db = require('./db');
const Student = require('./student');
const Test = require('./test');

Test.belongsTo(Student);
Student.hasMany(Test);

(async function fillDatabase() {
  const student1 = await Student.create({ name: 'Mitch' });
  const test1 = await Test.create({ name: 'biology', score: 97 });
  test1.setStudent(student1);

  const student2 = await Student.create({ name: 'Ethan' });
  const test2 = await Test.create({ name: 'math', score: 94 });
  test2.setStudent(student2);
})();

module.exports = {
  db,
  Student,
  Test
}
