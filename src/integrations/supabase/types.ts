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
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      answers: {
        Row: {
          answered_at: string
          question_id: string
          submission_id: string
          value: Json | null
        }
        Insert: {
          answered_at?: string
          question_id: string
          submission_id: string
          value?: Json | null
        }
        Update: {
          answered_at?: string
          question_id?: string
          submission_id?: string
          value?: Json | null
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
      assessments: {
        Row: {
          created_at: string
          id: string
          locale_default: string | null
          max_visible_questions: number | null
          question_cap: Json | null
          size_breakpoints: Json | null
          updated_at: string
          version: string
        }
        Insert: {
          created_at?: string
          id: string
          locale_default?: string | null
          max_visible_questions?: number | null
          question_cap?: Json | null
          size_breakpoints?: Json | null
          updated_at?: string
          version: string
        }
        Update: {
          created_at?: string
          id?: string
          locale_default?: string | null
          max_visible_questions?: number | null
          question_cap?: Json | null
          size_breakpoints?: Json | null
          updated_at?: string
          version?: string
        }
        Relationships: []
      }
      computed_definitions: {
        Row: {
          conditions: Json | null
          field_id: string
          formula: string | null
          logic: string | null
          section_id: string
        }
        Insert: {
          conditions?: Json | null
          field_id: string
          formula?: string | null
          logic?: string | null
          section_id: string
        }
        Update: {
          conditions?: Json | null
          field_id?: string
          formula?: string | null
          logic?: string | null
          section_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "computed_definitions_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      computed_values: {
        Row: {
          field_id: string
          submission_id: string
          value: Json | null
        }
        Insert: {
          field_id: string
          submission_id: string
          value?: Json | null
        }
        Update: {
          field_id?: string
          submission_id?: string
          value?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "computed_values_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      consent_banners: {
        Row: {
          consent_text: string | null
          description: string | null
          required: boolean
          section_id: string
          text: string | null
          title: string | null
        }
        Insert: {
          consent_text?: string | null
          description?: string | null
          required?: boolean
          section_id: string
          text?: string | null
          title?: string | null
        }
        Update: {
          consent_text?: string | null
          description?: string | null
          required?: boolean
          section_id?: string
          text?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consent_banners_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: true
            referencedRelation: "sections"
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
          assessment_id: string | null
          cap: number | null
          columns: Json | null
          created_at: string
          groups: Json | null
          helper: string | null
          hide_if: Json | null
          id: string
          is_add_on: boolean
          max_rank: number | null
          max_select: number | null
          options: Json | null
          required: boolean
          rows: Json | null
          score_by_count: Json | null
          score_formula: string | null
          score_map: Json | null
          score_per: number | null
          section_id: string | null
          sequence: number
          show_if: Json | null
          text: string
          type: string
          updated_at: string
          weight: Json | null
        }
        Insert: {
          assessment_id?: string | null
          cap?: number | null
          columns?: Json | null
          created_at?: string
          groups?: Json | null
          helper?: string | null
          hide_if?: Json | null
          id: string
          is_add_on?: boolean
          max_rank?: number | null
          max_select?: number | null
          options?: Json | null
          required?: boolean
          rows?: Json | null
          score_by_count?: Json | null
          score_formula?: string | null
          score_map?: Json | null
          score_per?: number | null
          section_id?: string | null
          sequence: number
          show_if?: Json | null
          text: string
          type: string
          updated_at?: string
          weight?: Json | null
        }
        Update: {
          assessment_id?: string | null
          cap?: number | null
          columns?: Json | null
          created_at?: string
          groups?: Json | null
          helper?: string | null
          hide_if?: Json | null
          id?: string
          is_add_on?: boolean
          max_rank?: number | null
          max_select?: number | null
          options?: Json | null
          required?: boolean
          rows?: Json | null
          score_by_count?: Json | null
          score_formula?: string | null
          score_map?: Json | null
          score_per?: number | null
          section_id?: string | null
          sequence?: number
          show_if?: Json | null
          text?: string
          type?: string
          updated_at?: string
          weight?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
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
          assessment_id: string | null
          category: string | null
          id: string
          purpose: string | null
          sequence: number
          title: string
        }
        Insert: {
          assessment_id?: string | null
          category?: string | null
          id: string
          purpose?: string | null
          sequence: number
          title: string
        }
        Update: {
          assessment_id?: string | null
          category?: string | null
          id?: string
          purpose?: string | null
          sequence?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "sections_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      submissions: {
        Row: {
          assessment_id: string | null
          company_size: string | null
          completed: boolean
          country: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          industry: string | null
          industry_other: string | null
          organization_name: string | null
          regulated: boolean | null
          revenue: string | null
          role: string | null
          role_other: string | null
          track: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          assessment_id?: string | null
          company_size?: string | null
          completed?: boolean
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          industry?: string | null
          industry_other?: string | null
          organization_name?: string | null
          regulated?: boolean | null
          revenue?: string | null
          role?: string | null
          role_other?: string | null
          track?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          assessment_id?: string | null
          company_size?: string | null
          completed?: boolean
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          industry?: string | null
          industry_other?: string | null
          organization_name?: string | null
          regulated?: boolean | null
          revenue?: string | null
          role?: string | null
          role_other?: string | null
          track?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "submissions_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_track_fkey"
            columns: ["track"]
            isOneToOne: false
            referencedRelation: "tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      track_detection_rules: {
        Row: {
          condition: Json
          id: number
          precedence: number
          track_id: string
        }
        Insert: {
          condition: Json
          id?: number
          precedence: number
          track_id: string
        }
        Update: {
          condition?: Json
          id?: number
          precedence?: number
          track_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "track_detection_rules_track_id_fkey"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      track_weights: {
        Row: {
          automation: number
          data: number
          governance: number
          people: number
          strategy: number
          tools: number
          track_id: string
        }
        Insert: {
          automation: number
          data: number
          governance: number
          people: number
          strategy: number
          tools: number
          track_id: string
        }
        Update: {
          automation?: number
          data?: number
          governance?: number
          people?: number
          strategy?: number
          tools?: number
          track_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "track_weights_track_id_fkey"
            columns: ["track_id"]
            isOneToOne: true
            referencedRelation: "tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      tracks: {
        Row: {
          id: string
          label: string
        }
        Insert: {
          id: string
          label: string
        }
        Update: {
          id?: string
          label?: string
        }
        Relationships: []
      }
    }
    Views: {
      admin_analytics: {
        Row: {
          active_organizations: number | null
          completed_submissions: number | null
          completion_rate: number | null
          today_submissions: number | null
          total_submissions: number | null
          week_submissions: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_admin_dashboard_data: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_assessment_progress: {
        Args: { assessment_id: string }
        Returns: Json
      }
      get_current_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_organization_leaderboard: {
        Args: Record<PropertyKey, never>
        Returns: {
          organization_id: string
          organization_name: string
          submission_count: number
          completion_rate: number
          combined_score: number
        }[]
      }
      get_user_assessment_submissions: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          session_id: string
          user_id: string
          user_email: string
          full_name: string
          persona_type: string
          responses: Json
          completed: boolean
          current_section: number
          created_at: string
          updated_at: string
          response_count: number
        }[]
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      is_admin: {
        Args: { user_email: string }
        Returns: boolean
      }
      track_analytics_event: {
        Args: {
          _event_name: string
          _assessment_id?: string
          _event_data?: Json
        }
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
