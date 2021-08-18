SELECT day, count(id) as  number_of_assignments,sum(duration) as duration
FROM assignments
GROUP by day
ORDER by day;