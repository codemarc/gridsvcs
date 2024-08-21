DROP TABLE IF EXISTS public.gsets;

CREATE TABLE public.gsets 
(
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    title VARCHAR,
    href1 VARCHAR,
    href2 VARCHAR,
    uid VARCHAR DEFAULT CURRENT_USER,
    ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP

) TABLESPACE pg_default;

ALTER TABLE public.gsets OWNER to gridadmin;


INSERT INTO public.gsets ("name", title, href1, href2) VALUES
('comms','communicate / discuss', 'https://www.youtube.com/@allin', '*/settings'),
('devtools','devtools', '', '*/settings'),
('genai','genai / tools', '', '*/settings'),
('devops','devops toolchain', 'https://www.cncf.io/','*/settings'),
('msft','microsoft','https://developer.microsoft.com/','*/settings'),
('amzn','amazon','https://aws.amazon.com/','*/settings'),
('goog','google','https://developers.google.com/','*/settings'),
('apache','apache','https://apache.org','*/settings'),
('fintech','financial news / data','https://www.bloomberg.com/','*/settings'),
('banking','banking','','*/settings'),
('house','household / credit','https://home.nest.com/home','*/settings'),
('cloud','cloud','https://www.cloudzero.com/blog/cloud-service-providers/','*/settings'),
('services','services','https://codemarc.net/doc/gridsvcs/#/','*/settings'),
('stream','stream','https://www.xfinity.com/stream/','*/settings')
;

select * from public.gsets;