DROP TABLE IF EXISTS public.panels;

CREATE TABLE public.panels (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "links" JSONB,
  "dbu" varchar DEFAULT CURRENT_USER,
  "created" timestamp DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE "panels" OWNER to gridadmin;

DROP TABLE IF EXISTS public.grids;
CREATE TABLE public.grids (
  id SERIAL PRIMARY KEY,
  "name" varchar,
  panels JSONB,
  dbu varchar DEFAULT CURRENT_USER,
  created timestamp DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE public.grids OWNER to gridadmin;

DROP TABLE IF EXISTS public.users;

CREATE TABLE public.users (
  id SERIAL PRIMARY KEY,
  "name" varchar,
  role varchar,
  grids JSONB,
  dbu varchar DEFAULT CURRENT_USER,
  created timestamp DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE public.users OWNER to gridadmin;


INSERT INTO public.panels ("name",links) VALUES 
  ('comms',pg_read_file('/gridjson/comms.json')::jsonb)
, ('devtools',pg_read_file('/gridjson/devtools.json')::jsonb)
, ('genai',pg_read_file('/gridjson/genai.json')::jsonb)
, ('devops',pg_read_file('/gridjson/devops.json')::jsonb)
, ('msft',pg_read_file('/gridjson/msft.json')::jsonb)
, ('amzn',pg_read_file('/gridjson/amzn.json')::jsonb)
, ('goog',pg_read_file('/gridjson/goog.json')::jsonb)
, ('apache',pg_read_file('/gridjson/apache.json')::jsonb)
, ('fintech',pg_read_file('/gridjson/fintech.json')::jsonb)
, ('banking',pg_read_file('/gridjson/banking.json')::jsonb)
, ('house',pg_read_file('/gridjson/house.json')::jsonb) 
, ('cloud',pg_read_file('/gridjson/cloud.json')::jsonb) 
, ('services',pg_read_file('/gridjson/services.json')::jsonb) 
, ('stream',pg_read_file('/gridjson/stream.json')::jsonb) 
, ('shopify',pg_read_file('/gridjson/shopify.json')::jsonb)
;

INSERT INTO public.grids ("name", panels) VALUES 
  ('builtin','[1,2,3,4,5,6,7,8]')
  , ('personal','[1,9,10,11,3,12,13,14]')
  ;

INSERT INTO public.users ("name", "role", grids) VALUES 
  ('unknown','user','[1]')
  , ('codemarc','admin','[1,2]')
  ;

select * from panels;
select * from grids;
select * from users;
