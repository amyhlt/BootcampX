const { Client } = require('pg');
//database connection
const client = new Client({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});
client.connect()
.then(()=>{
    console.log('db connected!');
})
.catch(err => console.error('db connection error', err.stack));
//excute queries
client.query(`
SELECT students.id, students.name, cohorts.name as cohort_name
FROM students
JOIN cohorts on cohorts.id=students.cohort_id
LIMIT 5;
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort_name} cohort`);
  })
});
//commend-line
const args=process.argv.slice(2);
client.query(`
SELECT students.id, students.name, cohorts.name as cohort_name
FROM students
JOIN cohorts on cohorts.id=students.cohort_id
WHERE cohorts.name like '%${args[0]}%'
LIMIT ${args[1]};
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort_name} cohort`);
  })
});