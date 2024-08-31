select * from cmc.users;
select * from cmc.panels;
select * from cmc.grids;
select * from cmc.usergrids;

SELECT u.name, u.role
  , JSONB_AGG(
        JSONB_BUILD_OBJECT(
            'gid', g.gid,
            'gridname', g.name,
            'panels', (
                SELECT JSONB_AGG(
                    JSONB_BUILD_OBJECT(
                        'name', p.name,
                        'links', p.links
                    ) ORDER BY p.name
                )
                FROM cmc.panels p
                WHERE p.pid IN (
                    SELECT jsonb_array_elements_text(g.panels)::int
                )
            )
        ) ORDER BY g.gid
    ) AS gridlist
FROM 
    cmc.users u
JOIN 
    cmc.usergrids ug ON u.id = ug.id
JOIN 
    cmc.grids g ON ug.gid = g.gid
WHERE 
    u.name = 'codemarc' -- replace with the actual username
    AND ug.isactive = TRUE
GROUP BY 
    u.name, u.role
ORDER BY 
    u.name;
