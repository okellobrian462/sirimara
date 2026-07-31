-- Migration: update agents search placeholder
-- Updates the agents page hero search placeholder from "Enter agent name, state or office address" to "Enter agent name".

UPDATE public.page_sections
SET
    layout_config = jsonb_set(
        layout_config,
        '{search_placeholder}',
        '"Enter agent name"',
        true
    ),
    updated_at = now()
WHERE page = 'agents'
    AND section_type = 'hero'
    AND layout_config->>'search_placeholder' = 'Enter agent name, state or office address';