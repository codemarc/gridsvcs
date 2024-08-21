DROP TABLE IF EXISTS public.glinks;

CREATE TABLE public.glinks (
    id SERIAL PRIMARY KEY,
    gsid INT REFERENCES public.gsets(id) ON DELETE CASCADE,
    links jsonb,
    ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) TABLESPACE pg_default;

ALTER TABLE public.glinks OWNER to gridadmin;

INSERT INTO public.glinks (gsid, links) VALUES
(1,pg_read_file('/gridjson/comms.json')::jsonb)
, (2,pg_read_file('/gridjson/devtools.json')::jsonb)
, (3,pg_read_file('/gridjson/genai.json')::jsonb)
, (4,pg_read_file('/gridjson/devops.json')::jsonb)
, (5,pg_read_file('/gridjson/msft.json')::jsonb)
, (6,pg_read_file('/gridjson/amzn.json')::jsonb)
, (7,pg_read_file('/gridjson/goog.json')::jsonb)
, (8,pg_read_file('/gridjson/apache.json')::jsonb)
, (9,pg_read_file('/gridjson/fintech.json')::jsonb)
, (10,pg_read_file('/gridjson/banking.json')::jsonb)
;

select * from public.gsets;
select * from public.glinks;