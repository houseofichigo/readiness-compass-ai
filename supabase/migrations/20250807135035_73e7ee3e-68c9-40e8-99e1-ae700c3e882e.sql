-- Phase 1: Fix RLS Policies for sections and questions tables

-- Add INSERT policy for sections table
CREATE POLICY "Allow system sync to insert sections" 
ON public.sections 
FOR INSERT 
WITH CHECK (true);

-- Add INSERT policy for questions table  
CREATE POLICY "Allow system sync to insert questions"
ON public.questions 
FOR INSERT 
WITH CHECK (true);

-- Add UPDATE policies to allow sync function to update existing records
CREATE POLICY "Allow system sync to update sections"
ON public.sections 
FOR UPDATE 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow system sync to update questions"
ON public.questions 
FOR UPDATE 
USING (true) 
WITH CHECK (true);

-- Add DELETE policies to allow sync function to clean up before inserting
CREATE POLICY "Allow system sync to delete sections"
ON public.sections 
FOR DELETE 
USING (true);

CREATE POLICY "Allow system sync to delete questions"
ON public.questions 
FOR DELETE 
USING (true);