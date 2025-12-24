-- Add dropdown support to navigation_items table
-- This enables database-driven dropdown menus in the header

-- Add new columns for dropdown functionality
ALTER TABLE navigation_items ADD COLUMN IF NOT EXISTS has_dropdown BOOLEAN DEFAULT false;
ALTER TABLE navigation_items ADD COLUMN IF NOT EXISTS dropdown_type TEXT; -- 'search', 'links', 'custom'
ALTER TABLE navigation_items ADD COLUMN IF NOT EXISTS dropdown_config JSONB DEFAULT '{}'::jsonb;

-- Update existing navigation items to support dropdowns
-- BUY dropdown
UPDATE navigation_items 
SET has_dropdown = true, 
    dropdown_type = 'search',
    dropdown_config = '{
      "search_placeholder": "Enter location, address, ZIP...",
      "search_type": "buy",
      "quick_links": [
        {"label": "Find All Sales Properties", "url": "/sales/new-york-ny"},
        {"label": "Find an Elliman Agent", "url": "/agents"},
        {"label": "Find Commercial Properties", "url": "/sales/new-york-ny/home-types=commercial-office"}
      ]
    }'::jsonb
WHERE menu_location = 'header_main' AND UPPER(label) = 'BUY';

-- RENT dropdown
UPDATE navigation_items 
SET has_dropdown = true, 
    dropdown_type = 'search',
    dropdown_config = '{
      "search_placeholder": "Enter location, address, ZIP...",
      "search_type": "rent",
      "quick_links": [
        {"label": "Find All Rental Properties", "url": "/rentals/new-york-ny"},
        {"label": "Find an Elliman Agent", "url": "/agents"},
        {"label": "Find Commercial Properties", "url": "/sales/new-york-ny/home-types=commercial-office"}
      ]
    }'::jsonb
WHERE menu_location = 'header_main' AND UPPER(label) = 'RENT';

-- AGENTS dropdown
UPDATE navigation_items 
SET has_dropdown = true, 
    dropdown_type = 'search',
    dropdown_config = '{
      "search_placeholder": "Enter agent name, state or office address",
      "search_type": "agents",
      "quick_links": [
        {"label": "Connect With Our Agents", "url": "/agents"}
      ]
    }'::jsonb
WHERE menu_location = 'header_main' AND UPPER(label) = 'AGENTS';

-- Create index for dropdown queries
CREATE INDEX IF NOT EXISTS idx_navigation_has_dropdown ON navigation_items(has_dropdown) WHERE has_dropdown = true;

COMMENT ON COLUMN navigation_items.has_dropdown IS 'Whether this navigation item has a dropdown menu';
COMMENT ON COLUMN navigation_items.dropdown_type IS 'Type of dropdown: search (with input), links (just links), custom';
COMMENT ON COLUMN navigation_items.dropdown_config IS 'JSON configuration for dropdown content including search placeholder, quick links, etc.';
