-- Skill 2: Map the Country Club Relationships

-- Which columns in cd.bookings are foreign keys

-- facid - cd.facilities
-- memid - cd.members

-- What kind of relationship is there between members and facilities ?


-- member
-- 1
-- 2
-- 3
-- 4
-- 5

-- facilies
-- 1
-- 2
-- 3
-- 4
-- 5

-- booking
-- bookingId facid memid
-- 1 1 1
-- 2 1 1
-- 3 2 1

-- one member can have many bookings and one member can have many different facilities (many to many)

-- recommendedby column

-- recommendedby - memid-cd.members

-- one member can recomand many member so it has one to many relationship

-- Skill 3: The Joins and Subqueries Exercises

-- 1. Retrieve the start times of members' bookings
SELECT bks.starttime
FROM cd.bookings bks
JOIN cd.members mems ON mems.memid = bks.memid
WHERE mems.firstname = 'David' AND mems.surname = 'Farrell';

-- 2. Work out the start times of bookings for tennis courts

SELECT b.starttime, f.name from cd.bookings b
JOIN cd.facilities f ON b.facid = f.facid
where f.name  like 'Tennis Court%'
AND b.starttime >='2012-09-21' AND b.starttime < '2012-09-22'

-- 3. Produce a list of all members who have recommended another member

SELECT distinct m2.firstname as fname, m2.surname as sname from cd.members m1
join cd.members m2 on m1.recommendedby = m2.memid
WHERE m1.recommendedby is NOT NULL 
order by sname, fname;

-- 4. Produce a list of all members, along with their recommender

SELECT m1.firstname, m1.surname, m2.firstname as recfname, m2.surname as recsname from cd.members m1
left outer join cd.members m2 on m1.recommendedby = m2.memid
order by surname, firstname;

-- 5. Produce a list of all members who have used a tennis court

SELECT distinct m.firstname || ' ' || m.surname as member , f.name 
from cd.bookings b
JOIN cd.facilities f ON f.facid=b.facid 
JOIN cd.members m ON b.memid=m.memid
Where f.name like 'Tennis Court%'

-- 6. Produce a list of costly bookings

SELECT 
    m.firstname || ' ' || m.surname AS member,
    f.name AS facility,
    CASE
        WHEN m.memid = 0 THEN b.slots * f.guestcost
        ELSE b.slots * f.membercost
    END AS cost
FROM cd.bookings b
JOIN cd.facilities f ON f.facid = b.facid
JOIN cd.members m ON b.memid = m.memid
WHERE b.starttime >= '2012-09-14'
  AND b.starttime < '2012-09-15'
  AND (
      (m.memid = 0 AND b.slots * f.guestcost > 30)
      OR
      (m.memid != 0 AND b.slots * f.membercost > 30)
  )
ORDER BY cost DESC;


-- 7. Produce a list of all members, along with their recommender, using no joins

SELECT DISTINCT
    firstname || ' ' || surname AS member,
    (
        SELECT firstname || ' ' || surname
        FROM cd.members r
        WHERE r.memid = m.recommendedby
    ) AS recommender
FROM cd.members m
ORDER BY member;

-- 8. Produce a list of costly bookings, using a subquery

select member, facility, cost from (
	select 
		m.firstname || ' ' || m.surname as member,
		f.name as facility,
		case
			when m.memid = 0 then
				b.slots*f.guestcost
			else
				b.slots*f.membercost
		end as cost
		from
			cd.members m
			inner join cd.bookings b
				on m.memid = b.memid
			inner join cd.facilities f
				on b.facid = f.facid
	) as bookings
	where cost > 30
order by cost desc; 