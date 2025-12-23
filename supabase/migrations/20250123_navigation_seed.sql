-- Seed Navigation Items
-- This migration populates the navigation_items table with all current navigation from header and footer

-- Insert Header Main Navigation
INSERT INTO navigation_items (menu_location, label, url, order_index, is_active) VALUES
('header_main', 'BUY', '/sales/new-york-ny', 1, true),
('header_main', 'RENT', '/rentals/new-york-ny', 2, true),
('header_main', 'SELL', '/sell', 3, true),
('header_main', 'AGENTS', '/agents', 4, true);

-- Insert Header Secondary Navigation
INSERT INTO navigation_items (menu_location, label, url, order_index, is_active) VALUES
('header_secondary', 'NEW DEVELOPMENT', '/new-development', 1, true),
('header_secondary', 'WORLD OF ELLIMAN', '/world-of-elliman', 2, true);

-- Insert Footer Company Section
INSERT INTO navigation_items (menu_location, label, url, order_index, is_active) VALUES
('footer_company', 'About Us', '/about', 1, true),
('footer_company', 'Leadership', '/leadership', 2, true),
('footer_company', 'Offices', '#', 3, true),
('footer_company', 'Contact Us', '#contact', 4, true);

-- Insert Footer Resources Section
INSERT INTO navigation_items (menu_location, label, url, order_index, is_active) VALUES
('footer_resources', 'World of Elliman', '/world-of-elliman', 1, true),
('footer_resources', 'Elliman Exclusives', '#', 2, true);

-- Insert Footer Brand Portfolio Section
INSERT INTO navigation_items (menu_location, label, url, order_index, is_active) VALUES
('footer_portfolio', 'New Development', '/new-development', 1, true),
('footer_portfolio', 'Commercial', '#', 2, true),
('footer_portfolio', 'Farm & Ranch', '#', 3, true);

-- Insert Footer Markets Section
INSERT INTO navigation_items (menu_location, label, url, order_index, is_active) VALUES
('footer_markets', 'California', '#', 1, true),
('footer_markets', 'Colorado', '#', 2, true),
('footer_markets', 'Connecticut', '#', 3, true),
('footer_markets', 'Florida', '#', 4, true),
('footer_markets', 'Massachusetts', '#', 5, true),
('footer_markets', 'Mid-Atlantic', '#', 6, true),
('footer_markets', 'Nevada', '#', 7, true),
('footer_markets', 'New Jersey', '#', 8, true),
('footer_markets', 'New York', '#', 9, true),
('footer_markets', 'New York City', '#', 10, true),
('footer_markets', 'Texas', '#', 11, true),
('footer_markets', 'Vermont', '#', 12, true);
