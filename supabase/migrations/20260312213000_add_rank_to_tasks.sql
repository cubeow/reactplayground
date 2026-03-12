-- Add rank column to tasks table for reordering task prefabs
ALTER TABLE tasks ADD COLUMN rank integer;
