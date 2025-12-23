-- Check for duplicate navigation items
SELECT menu_location, label, url, COUNT(*) as count
FROM navigation_items
GROUP BY menu_location, label, url
HAVING COUNT(*) > 1;

-- Correct way to delete duplicates in Postgres for UUID columns
DELETE FROM navigation_items
WHERE id IN (
    SELECT id
    FROM (
        SELECT id,
               ROW_NUMBER() OVER (
                   PARTITION BY menu_location, label, url 
                   ORDER BY id
               ) as row_num
        FROM navigation_items
    ) t
    WHERE t.row_num > 1
);
