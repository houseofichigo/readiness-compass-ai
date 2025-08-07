export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      answers: {
        Row: {
          chosen_label: string | null
          chosen_value: string | null
          confidence_score: number | null
          created_at: string
          final_response_at: string | null
          first_response_at: string | null
          id: string
          max_possible_score: number | null
          model_input_context: string | null
          pillar_scores: Json | null
          question_id: string
          raw_response: Json | null
          reasoning: string | null
          response_time_seconds: number | null
          revision_count: number | null
          score: number | null
          submission_id: string
          updated_at: string
        }
        Insert: {
          chosen_label?: string | null
          chosen_value?: string | null
          confidence_score?: number | null
          created_at?: string
          final_response_at?: string | null
          first_response_at?: string | null
          id?: string
          max_possible_score?: number | null
          model_input_context?: string | null
          pillar_scores?: Json | null
          question_id: string
          raw_response?: Json | null
          reasoning?: string | null
          response_time_seconds?: number | null
          revision_count?: number | null
          score?: number | null
          submission_id: string
          updated_at?: string
        }
        Update: {
          chosen_label?: string | null
          chosen_value?: string | null
          confidence_score?: number | null
          created_at?: string
          final_response_at?: string | null
          first_response_at?: string | null
          id?: string
          max_possible_score?: number | null
          model_input_context?: string | null
          pillar_scores?: Json | null
          question_id?: string
          raw_response?: Json | null
          reasoning?: string | null
          response_time_seconds?: number | null
          revision_count?: number | null
          score?: number | null
          submission_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          annual_revenue_exact: number | null
          avg_overall_score: number | null
          benchmark_percentile: number | null
          completed_submissions: number | null
          country: string | null
          created_at: string
          employee_count_exact: number | null
          first_submission_at: string | null
          id: string
          industry: string | null
          industry_other: string | null
          is_verified: boolean
          last_submission_at: string | null
          linkedin_url: string | null
          median_score: number | null
          name: string
          pillar_scores_avg: Json | null
          pillar_scores_median: Json | null
          primary_contact_email: string | null
          region: string | null
          regulatory_status: string | null
          revenue_bucket: string | null
          size_bucket: string | null
          slug: string
          sub_industry: string | null
          total_submissions: number | null
          track: string | null
          updated_at: string
          verification_notes: string | null
          website: string | null
        }
        Insert: {
          annual_revenue_exact?: number | null
          avg_overall_score?: number | null
          benchmark_percentile?: number | null
          completed_submissions?: number | null
          country?: string | null
          created_at?: string
          employee_count_exact?: number | null
          first_submission_at?: string | null
          id?: string
          industry?: string | null
          industry_other?: string | null
          is_verified?: boolean
          last_submission_at?: string | null
          linkedin_url?: string | null
          median_score?: number | null
          name: string
          pillar_scores_avg?: Json | null
          pillar_scores_median?: Json | null
          primary_contact_email?: string | null
          region?: string | null
          regulatory_status?: string | null
          revenue_bucket?: string | null
          size_bucket?: string | null
          slug: string
          sub_industry?: string | null
          total_submissions?: number | null
          track?: string | null
          updated_at?: string
          verification_notes?: string | null
          website?: string | null
        }
        Update: {
          annual_revenue_exact?: number | null
          avg_overall_score?: number | null
          benchmark_percentile?: number | null
          completed_submissions?: number | null
          country?: string | null
          created_at?: string
          employee_count_exact?: number | null
          first_submission_at?: string | null
          id?: string
          industry?: string | null
          industry_other?: string | null
          is_verified?: boolean
          last_submission_at?: string | null
          linkedin_url?: string | null
          median_score?: number | null
          name?: string
          pillar_scores_avg?: Json | null
          pillar_scores_median?: Json | null
          primary_contact_email?: string | null
          region?: string | null
          regulatory_status?: string | null
          revenue_bucket?: string | null
          size_bucket?: string | null
          slug?: string
          sub_industry?: string | null
          total_submissions?: number | null
          track?: string | null
          updated_at?: string
          verification_notes?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_track_fkey"
            columns: ["track"]
            isOneToOne: false
            referencedRelation: "tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          cap: number | null
          created_at: string
          helper: string | null
          hide_if: Json | null
          id: string
          max_rank: number | null
          max_select: number | null
          required: boolean | null
          score_by_count: Json | null
          score_formula: string | null
          score_map: Json | null
          score_map_by_bucket: Json | null
          score_per: number | null
          section_id: string
          sequence: number | null
          show_if: Json | null
          text: string
          type: string
          updated_at: string
          weight: number[] | null
        }
        Insert: {
          cap?: number | null
          created_at?: string
          helper?: string | null
          hide_if?: Json | null
          id: string
          max_rank?: number | null
          max_select?: number | null
          required?: boolean | null
          score_by_count?: Json | null
          score_formula?: string | null
          score_map?: Json | null
          score_map_by_bucket?: Json | null
          score_per?: number | null
          section_id: string
          sequence?: number | null
          show_if?: Json | null
          text: string
          type: string
          updated_at?: string
          weight?: number[] | null
        }
        Update: {
          cap?: number | null
          created_at?: string
          helper?: string | null
          hide_if?: Json | null
          id?: string
          max_rank?: number | null
          max_select?: number | null
          required?: boolean | null
          score_by_count?: Json | null
          score_formula?: string | null
          score_map?: Json | null
          score_map_by_bucket?: Json | null
          score_per?: number | null
          section_id?: string
          sequence?: number | null
          show_if?: Json | null
          text?: string
          type?: string
          updated_at?: string
          weight?: number[] | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      sections: {
        Row: {
          category: string | null
          created_at: string
          id: string
          purpose: string | null
          sequence: number | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          id: string
          purpose?: string | null
          sequence?: number | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          purpose?: string | null
          sequence?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      submissions: {
        Row: {
          active_time_minutes: number | null
          completed: boolean
          completion_time_minutes: number | null
          created_at: string
          id: string
          ip_address: unknown | null
          max_possible_score: number | null
          organization_id: string | null
          percentage_score: number | null
          pillar_scores: Json | null
          readiness_level: string | null
          referrer_url: string | null
          total_score: number | null
          updated_at: string
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          active_time_minutes?: number | null
          completed?: boolean
          completion_time_minutes?: number | null
          created_at?: string
          id?: string
          ip_address?: unknown | null
          max_possible_score?: number | null
          organization_id?: string | null
          percentage_score?: number | null
          pillar_scores?: Json | null
          readiness_level?: string | null
          referrer_url?: string | null
          total_score?: number | null
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          active_time_minutes?: number | null
          completed?: boolean
          completion_time_minutes?: number | null
          created_at?: string
          id?: string
          ip_address?: unknown | null
          max_possible_score?: number | null
          organization_id?: string | null
          percentage_score?: number | null
          pillar_scores?: Json | null
          readiness_level?: string | null
          referrer_url?: string | null
          total_score?: number | null
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "submissions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      tracks: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
          password_hash: string | null
          role: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name?: string | null
          password_hash?: string | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          password_hash?: string | null
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
