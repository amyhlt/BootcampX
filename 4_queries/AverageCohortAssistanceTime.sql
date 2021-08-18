
SELECT cohorts.name, AVG(assistance_requests.completed_at-assistance_requests.started_at) AS average_assistance_time
FROM  students 
JOIN cohorts ON cohorts.id= students.cohort_id 
join assistance_requests ON assistance_requests.student_id=students.id
group by cohorts.name;