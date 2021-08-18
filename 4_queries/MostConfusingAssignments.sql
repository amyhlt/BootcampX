
SELECT assignments.id  ,   assignments.name ,day ,assignments.chapter,count(assistance_requests.id) as total_requests 
FROM assistance_requests
JOIN assignments ON    assistance_requests.assignment_id = assignments.id
GROUP BY  assignments.id 
ORDER BY total_requests desc