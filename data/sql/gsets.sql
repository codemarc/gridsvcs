DROP TABLE IF EXISTS public.glinks;
DROP TABLE IF EXISTS public.gsets;

CREATE TABLE public.gsets 
(
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    uid VARCHAR DEFAULT CURRENT_USER,
    ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP

) TABLESPACE pg_default;

ALTER TABLE public.gsets OWNER to gridadmin;


INSERT INTO public.gsets ("name") VALUES ('comms'),('devtools'),('genai'),('devops'),('msft'),('amzn'),
    ('goog'),('apache'),('fintech'),('banking'),('house'),('cloud'),('services'),('stream'),('shopify');

select * from public.gsets;