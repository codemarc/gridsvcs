select * from users;
select * from panels;
select * from grids;
select * from usergrids;

SELECT u.username, u.userrole
  , JSONB_AGG(
        JSONB_BUILD_OBJECT(
            'gid', g.gid,
            'gridname', g.gridname,
            'panels', (
                SELECT JSONB_AGG(
                    JSONB_BUILD_OBJECT(
                        'name', p.name,
                        'links', p.links
                    ) ORDER BY p.name
                )
                FROM public.panels p
                WHERE p.pid IN (
                    SELECT jsonb_array_elements_text(g.panels)::int
                )
            )
        ) ORDER BY g.gid
    ) AS gridlist
FROM 
    public.users u
JOIN 
    public.usergrids ug ON u.id = ug.id
JOIN 
    public.grids g ON ug.gid = g.gid
WHERE 
    u.username = 'codemarc' -- replace with the actual username
    AND ug.isactive = TRUE
GROUP BY 
    u.username, u.userrole
ORDER BY 
    u.username;
