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
const args=process.argv.slice(2);
client.query(`
select DISTINCT teachers.name as teacher,   teacherCohort.name as cohort
FROM teachers 
JOIN
(SELECT assistance_requests.teacher_id,cohorts.name
FROM assistance_requests
JOIN students ON assistance_requests.student_id=students.id
JOIN cohorts ON cohorts.id= students.cohort_id
where cohorts.name ='${args[0] || 'JUL02'}'
GROUP by assistance_requests.teacher_id,cohorts.name) AS teacherCohort
ON teacherCohort.teacher_id=teachers.id
ORDER BY teachers.name;
`)
.then(res => {
    console.log(res);
  res.rows.forEach(user => {
    console.log(`${user.cohort} : ${user.teacher}`);
  })
});