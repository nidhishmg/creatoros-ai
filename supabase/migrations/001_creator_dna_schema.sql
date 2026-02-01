-- ============================================================================
-- CREATOR DNA SCANNER - DATABASE SCHEMA
-- ============================================================================
-- Run this in your Supabase SQL Editor to create the necessary tables
-- ============================================================================

-- Enable UUID extension if not already enabled
-- Note: In Supabase, this extension is usually already enabled
CREATE EXTENSION IF NOT EXISTS uuid-ossp;

-- ============================================================================
-- TABLES
-- ============================================================================

-- Creator DNA Profiles Table
-- Stores the analyzed DNA profiles for each creator
CREATE TABLE IF NOT EXISTS creator_dna_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id TEXT NOT NULL UNIQUE,
    generated_at TIMESTAMPTZ NOT NULL,
    
    -- DNA Attributes (denormalized for easy querying)
    primary_tone TEXT NOT NULL CHECK (primary_tone IN (
        'casual', 'professional', 'educational', 'satirical',
        'emotional', 'political', 'inspirational', 'entertainment'
    )),
    humor_level INTEGER NOT NULL CHECK (humor_level >= 0 AND humor_level <= 10),
    dark_humor_present BOOLEAN NOT NULL DEFAULT FALSE,
    risk_tolerance TEXT NOT NULL CHECK (risk_tolerance IN ('low', 'medium', 'high')),
    audience_type TEXT NOT NULL CHECK (audience_type IN (
        'mass entertainment', 'niche technical', 'opinion-driven',
        'activist / political', 'educational / learner-focused',
        'lifestyle / aspirational', 'community-focused'
    )),
    
    -- Confidence Scores
    confidence_tone DECIMAL(3,2) NOT NULL CHECK (confidence_tone >= 0 AND confidence_tone <= 1),
    confidence_humor DECIMAL(3,2) NOT NULL CHECK (confidence_humor >= 0 AND confidence_humor <= 1),
    confidence_risk DECIMAL(3,2) NOT NULL CHECK (confidence_risk >= 0 AND confidence_risk <= 1),
    confidence_audience DECIMAL(3,2) NOT NULL CHECK (confidence_audience >= 0 AND confidence_audience <= 1),
    
    -- Full profile JSON (for complete data access)
    raw_profile JSONB NOT NULL,
    
    -- Metadata
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast creator lookups
CREATE INDEX IF NOT EXISTS idx_creator_dna_creator_id ON creator_dna_profiles(creator_id);

-- Index for filtering by attributes
CREATE INDEX IF NOT EXISTS idx_creator_dna_tone ON creator_dna_profiles(primary_tone);
CREATE INDEX IF NOT EXISTS idx_creator_dna_risk ON creator_dna_profiles(risk_tolerance);
CREATE INDEX IF NOT EXISTS idx_creator_dna_audience ON creator_dna_profiles(audience_type);

-- ============================================================================
-- ANALYSIS HISTORY TABLE (Optional - for tracking changes over time)
-- ============================================================================

CREATE TABLE IF NOT EXISTS creator_dna_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id TEXT NOT NULL,
    profile_snapshot JSONB NOT NULL,
    analyzed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT fk_creator_dna_history_creator
        FOREIGN KEY (creator_id) 
        REFERENCES creator_dna_profiles(creator_id) 
        ON DELETE CASCADE
);

-- Index for history lookups
CREATE INDEX IF NOT EXISTS idx_creator_dna_history_creator ON creator_dna_history(creator_id);
CREATE INDEX IF NOT EXISTS idx_creator_dna_history_date ON creator_dna_history(analyzed_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS
ALTER TABLE creator_dna_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_dna_history ENABLE ROW LEVEL SECURITY;

-- Policy: Service role has full access (for API operations)
CREATE POLICY "Service role has full access to creator_dna_profiles"
    ON creator_dna_profiles
    FOR ALL
    USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to creator_dna_history"
    ON creator_dna_history
    FOR ALL
    USING (auth.role() = 'service_role');

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_creator_dna_profiles_updated_at
    BEFORE UPDATE ON creator_dna_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically save history on update
CREATE OR REPLACE FUNCTION save_dna_history()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.raw_profile IS DISTINCT FROM NEW.raw_profile THEN
        INSERT INTO creator_dna_history (creator_id, profile_snapshot, analyzed_at)
        VALUES (OLD.creator_id, OLD.raw_profile, OLD.generated_at);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to save history before update
CREATE TRIGGER save_creator_dna_history
    BEFORE UPDATE ON creator_dna_profiles
    FOR EACH ROW
    EXECUTE FUNCTION save_dna_history();

-- ============================================================================
-- SAMPLE QUERIES
-- ============================================================================

-- Get all high-risk creators
-- SELECT * FROM creator_dna_profiles WHERE risk_tolerance = 'high';

-- Get creators with dark humor
-- SELECT * FROM creator_dna_profiles WHERE dark_humor_present = TRUE;

-- Get creators by tone with high confidence
-- SELECT * FROM creator_dna_profiles 
-- WHERE primary_tone = 'satirical' AND confidence_tone > 0.7;

-- Get DNA history for a creator
-- SELECT * FROM creator_dna_history 
-- WHERE creator_id = 'creator123' 
-- ORDER BY analyzed_at DESC;
