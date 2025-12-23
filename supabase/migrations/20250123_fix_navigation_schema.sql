-- Fix navigation_items table schema
-- Rename "order" column to "order_index" to avoid reserved keyword and match Phase 3 plan
-- Add "opens_in_new_tab" column

ALTER TABLE navigation_items 
RENAME COLUMN "order" TO order_index;

ALTER TABLE navigation_items
ADD COLUMN IF NOT EXISTS opens_in_new_tab BOOLEAN DEFAULT false;
