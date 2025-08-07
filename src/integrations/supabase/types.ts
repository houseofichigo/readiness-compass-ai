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
      analytics_events: {
        Row: {
          browser_info: Json | null
          country_code: string | null
          created_at: string
          device_type: string | null
          event_category: string | null
          event_data: Json | null
          event_name: string
          id: string
          ip_address: unknown | null
          load_time_ms: number | null
          new_value: Json | null
          organization_id: string | null
          previous_value: Json | null
          question_id: string | null
          response_time_ms: number | null
          screen_size: string | null
          section_id: string | null
          submission_id: string | null
          timezone: string | null
          user_agent: string | null
        }
        Insert: {
          browser_info?: Json | null
          country_code?: string | null
          created_at?: string
          device_type?: string | null
          event_category?: string | null
          event_data?: Json | null
          event_name: string
          id?: string
          ip_address?: unknown | null
          load_time_ms?: number | null
          new_value?: Json | null
          organization_id?: string | null
          previous_value?: Json | null
          question_id?: string | null
          response_time_ms?: number | null
          screen_size?: string | null
          section_id?: string | null
          submission_id?: string | null
          timezone?: string | null
          user_agent?: string | null
        }
        Update: {
          browser_info?: Json | null
          country_code?: string | null
          created_at?: string
          device_type?: string | null
          event_category?: string | null
          event_data?: Json | null
          event_name?: string
          id?: string
          ip_address?: unknown | null
          load_time_ms?: number | null
          new_value?: Json | null
          organization_id?: string | null
          previous_value?: Json | null
          question_id?: string | null
          response_time_ms?: number | null
          screen_size?: string | null
          section_id?: string | null
          submission_id?: string | null
          timezone?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_events_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_events_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_events_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
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
      assessment_sessions: {
        Row: {
          active_time_seconds: number | null
          completed_at: string | null
          completion_percentage: number | null
          created_at: string
          exit_question_id: string | null
          exit_reason: string | null
          help_requests: number | null
          id: string
          idle_time_seconds: number | null
          organization_id: string | null
          paused_at: string | null
          questions_answered: number | null
          questions_skipped: number | null
          questions_total: number | null
          resumed_at: string | null
          revision_count: number | null
          section_id: string | null
          started_at: string | null
          submission_id: string | null
          time_spent_seconds: number | null
        }
        Insert: {
          active_time_seconds?: number | null
          completed_at?: string | null
          completion_percentage?: number | null
          created_at?: string
          exit_question_id?: string | null
          exit_reason?: string | null
          help_requests?: number | null
          id?: string
          idle_time_seconds?: number | null
          organization_id?: string | null
          paused_at?: string | null
          questions_answered?: number | null
          questions_skipped?: number | null
          questions_total?: number | null
          resumed_at?: string | null
          revision_count?: number | null
          section_id?: string | null
          started_at?: string | null
          submission_id?: string | null
          time_spent_seconds?: number | null
        }
        Update: {
          active_time_seconds?: number | null
          completed_at?: string | null
          completion_percentage?: number | null
          created_at?: string
          exit_question_id?: string | null
          exit_reason?: string | null
          help_requests?: number | null
          id?: string
          idle_time_seconds?: number | null
          organization_id?: string | null
          paused_at?: string | null
          questions_answered?: number | null
          questions_skipped?: number | null
          questions_total?: number | null
          resumed_at?: string | null
          revision_count?: number | null
          section_id?: string | null
          started_at?: string | null
          submission_id?: string | null
          time_spent_seconds?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_sessions_exit_question_id_fkey"
            columns: ["exit_question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_sessions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_sessions_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_sessions_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          comments: string | null
          created_at: string
          email: string | null
          id: string
          page: string | null
          rating: number | null
          submission_id: string | null
          user_agent: string | null
        }
        Insert: {
          comments?: string | null
          created_at?: string
          email?: string | null
          id?: string
          page?: string | null
          rating?: number | null
          submission_id?: string | null
          user_agent?: string | null
        }
        Update: {
          comments?: string | null
          created_at?: string
          email?: string | null
          id?: string
          page?: string | null
          rating?: number | null
          submission_id?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      organization_members: {
        Row: {
          created_at: string
          id: string
          member_role: string | null
          organization_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          member_role?: string | null
          organization_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          member_role?: string | null
          organization_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
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
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      question_choices: {
        Row: {
          created_at: string
          label: string | null
          model_input_context: string | null
          question_id: string
          reasoning: string | null
          score: number | null
          sequence: number | null
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          label?: string | null
          model_input_context?: string | null
          question_id: string
          reasoning?: string | null
          score?: number | null
          sequence?: number | null
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          label?: string | null
          model_input_context?: string | null
          question_id?: string
          reasoning?: string | null
          score?: number | null
          sequence?: number | null
          updated_at?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_choices_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      question_scores: {
        Row: {
          question_id: string
          score: number | null
          submission_id: string
        }
        Insert: {
          question_id: string
          score?: number | null
          submission_id: string
        }
        Update: {
          question_id?: string
          score?: number | null
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_scores_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_scores_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
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
      section_scores: {
        Row: {
          score: number | null
          section_id: string
          submission_id: string
        }
        Insert: {
          score?: number | null
          section_id: string
          submission_id: string
        }
        Update: {
          score?: number | null
          section_id?: string
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "section_scores_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "section_scores_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
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
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
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
      compute_submission_scores: {
        Args: { _submission_id: string }
        Returns: undefined
      }
      get_is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      is_org_member: {
        Args: { _org_id: string; _user_id?: string }
        Returns: boolean
      }
      seed_assessment: {
        Args: { _sections: Json } | { _sections: Json; _add_ons?: Json }
        Returns: undefined
      }
      submission_org: {
        Args: { _submission_id: string }
        Returns: string
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
