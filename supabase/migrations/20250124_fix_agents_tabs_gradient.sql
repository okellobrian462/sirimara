-- Fix Agents page tabs section to match Sell page (no gradient)
UPDATE page_sections
SET layout_config = jsonb_set(
    layout_config,
    '{show_gradient}',
    'false'
)
WHERE page = 'agents' 
  AND section_type = 'tabs'
  AND title = 'START YOUR JOURNEY WITH EVERY ADVANTAGE';
