select * from public.users

SELECT 
    u.name AS username,
    u.role AS userrole,
    g.id AS gridId,
    g.name AS gridName
FROM 
    public.users u
JOIN 
    jsonb_array_elements_text(u.grids) AS grid_id ON TRUE
JOIN 
    public.grids g ON g.id = grid_id::INT 
WHERE
   -- u.name = 'unknown'
   -- u.name = 'codemarc'
   u.name = 'info'
   ;



SELECT 
    u.name AS username,
    u.role AS userrole,
    g.id AS gridId,
    g.name AS gridName,
    p.id AS panelId,
    p.name AS panelName,
    p.links AS panelLinks
FROM 
    public.users u
JOIN 
    jsonb_array_elements_text(u.grids) AS grid_id ON TRUE
JOIN 
    public.grids g ON g.id = grid_id::INT
JOIN 
    jsonb_array_elements_text(g.panels) AS panel_id ON TRUE
JOIN 
    public.panels p ON p.id = panel_id::INT
WHERE 
    u.name = 'info' 
    --u.name = 'codemarc' 
    --AND g.id=1 
    --AND g.id=2 
    --AND g.id=3
    --AND g.name = 'personal'
    --AND g.name = 'builtin'
    ;

