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
//commend-line
const cohortName = process.argv[2];

// Store all potentially malicious values in an array.
const values = [`${cohortName || 'JUL02'}`];

const queryString =`
select DISTINCT teachers.name as teacher,   teacherCohort.name as cohort
FROM teachers 
JOIN
(SELECT assistance_requests.teacher_id,cohorts.name
FROM assistance_requests
JOIN students ON assistance_requests.student_id=students.id
JOIN cohorts ON cohorts.id= students.cohort_id
where cohorts.name =$1
GROUP by assistance_requests.teacher_id,cohorts.name) AS teacherCohort
ON teacherCohort.teacher_id=teachers.id
ORDER BY teachers.name;
`

client.query(queryString,values)
.then(res => {
    console.log(res);
  res.rows.forEach(user => {
    console.log(`${user.cohort} : ${user.teacher}`);
  })
});