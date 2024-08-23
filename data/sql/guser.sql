DROP TABLE IF EXISTS public.gusersetlist;

CREATE TABLE public.gusersetlist (
    id SERIAL PRIMARY KEY,
    -- guserid INT REFERENCES public.gusers(id) ON DELETE CASCADE,
    gsid INT REFERENCES public.gsets(id) ON DELETE CASCADE,
    ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) TABLESPACE pg_default;

ALTER TABLE public.gusersetlist OWNER to gridadmin;
