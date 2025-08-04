-- Update RLS policies to allow anonymous access for assessments
-- This enables the app to work without authentication

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view their own submissions" ON submissions;
DROP POLICY IF EXISTS "Users can create their own submissions" ON submissions;
DROP POLICY IF EXISTS "Users can update their own submissions" ON submissions;
DROP POLICY IF EXISTS "Users can view their own answers" ON answers;
DROP POLICY IF EXISTS "Users can create their own answers" ON answers;
DROP POLICY IF EXISTS "Users can update their own answers" ON answers;
DROP POLICY IF EXISTS "Users can view their own computed values" ON computed_values;
DROP POLICY IF EXISTS "Users can view their own section scores" ON section_scores;
DROP POLICY IF EXISTS "Users can view their own question scores" ON question_scores;

-- Create permissive policies for anonymous access
-- Anyone can create submissions and view them by ID
CREATE POLICY "Anyone can create submissions" 
ON submissions FOR INSERT 
TO anon 
WITH CHECK (true);

CREATE POLICY "Anyone can view submissions" 
ON submissions FOR SELECT 
TO anon 
USING (true);

CREATE POLICY "Anyone can update submissions" 
ON submissions FOR UPDATE 
TO anon 
USING (true);

-- Anyone can create and view answers
CREATE POLICY "Anyone can create answers" 
ON answers FOR INSERT 
TO anon 
WITH CHECK (true);

CREATE POLICY "Anyone can view answers" 
ON answers FOR SELECT 
TO anon 
USING (true);

CREATE POLICY "Anyone can update answers" 
ON answers FOR UPDATE 
TO anon 
USING (true);

-- Anyone can create and view computed values
CREATE POLICY "Anyone can create computed values" 
ON computed_values FOR INSERT 
TO anon 
WITH CHECK (true);

CREATE POLICY "Anyone can view computed values" 
ON computed_values FOR SELECT 
TO anon 
USING (true);

-- Anyone can create and view section scores
CREATE POLICY "Anyone can create section scores" 
ON section_scores FOR INSERT 
TO anon 
WITH CHECK (true);

CREATE POLICY "Anyone can view section scores" 
ON section_scores FOR SELECT 
TO anon 
USING (true);

-- Anyone can create and view question scores
CREATE POLICY "Anyone can create question scores" 
ON question_scores FOR INSERT 
TO anon 
WITH CHECK (true);

CREATE POLICY "Anyone can view question scores" 
ON question_scores FOR SELECT 
TO anon 
USING (true);

-- Make user_id nullable since we don't require authentication
ALTER TABLE submissions ALTER COLUMN user_id DROP NOT NULL;