
select teachers.name as teacher,   teacherCohort.name as cohort
FROM teachers 
JOIN
(SELECT assistance_requests.teacher_id,cohorts.name
FROM assistance_requests
JOIN students ON assistance_requests.student_id=students.id
JOIN cohorts ON cohorts.id= students.cohort_id
where cohorts.name='JUL02'
GROUP by assistance_requests.teacher_id,cohorts.name) AS teacherCohort
ON teacherCohort.teacher_id=teachers.id
ORDER BY teachers.name;
