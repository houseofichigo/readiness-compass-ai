import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { SecurityUtils } from "@/utils/security";
import { toast } from "sonner";
import { AlertTriangle, Send, Shield } from "lucide-react";

interface SecuredFeedbackFormProps {
  submissionId?: string;
  onSubmitSuccess?: () => void;
}

export function SecuredFeedbackForm({ submissionId, onSubmitSuccess }: SecuredFeedbackFormProps) {
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Security validations
      if (email && !SecurityUtils.isValidEmail(email)) {
        setError("Please enter a valid email address");
        return;
      }

      const textValidation = SecurityUtils.validateTextInput(comments, 1000);
      if (!textValidation.isValid) {
        setError(textValidation.error!);
        return;
      }

      // Check rate limiting
      const rateLimitPassed = await SecurityUtils.checkFeedbackRateLimit();
      if (!rateLimitPassed) {
        setError("Too many feedback submissions. Please try again later.");
        await SecurityUtils.logSecurityEvent({
          eventType: 'feedback_rate_limit_exceeded',
          eventData: { submissionId }
        });
        return;
      }

      // Sanitize input
      const sanitizedComments = SecurityUtils.sanitizeInput(comments);

      // Submit feedback
      const { error: submitError } = await supabase
        .from('feedback')
        .insert({
          submission_id: submissionId,
          email: email || null,
          rating,
          comments: sanitizedComments,
          user_agent: navigator.userAgent,
          page: window.location.pathname
        });

      if (submitError) {
        throw submitError;
      }

      // Log successful feedback submission
      await SecurityUtils.logSecurityEvent({
        eventType: 'feedback_submitted',
        eventData: {
          submissionId,
          hasEmail: !!email,
          hasRating: !!rating,
          commentsLength: sanitizedComments.length
        }
      });

      toast.success("Thank you for your feedback!");
      
      // Reset form
      setEmail("");
      setRating(null);
      setComments("");
      
      onSubmitSuccess?.();

    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError("Failed to submit feedback. Please try again.");
      
      await SecurityUtils.logSecurityEvent({
        eventType: 'feedback_submission_error',
        eventData: {
          error: error instanceof Error ? error.message : 'Unknown error',
          submissionId
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-4 w-4 text-primary" />
        <span className="text-sm text-muted-foreground">Secured feedback form</span>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div>
        <Label htmlFor="email">Email (optional)</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          maxLength={100}
        />
      </div>

      <div>
        <Label>Rating</Label>
        <div className="flex gap-2 mt-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setRating(num)}
              className={`w-10 h-10 rounded-full border-2 transition-colors ${
                rating === num
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="comments">Comments</Label>
        <Textarea
          id="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Share your thoughts..."
          maxLength={1000}
          rows={4}
        />
        <div className="text-xs text-muted-foreground mt-1">
          {comments.length}/1000 characters
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting || (!rating && !comments.trim())} className="w-full">
        {isSubmitting ? (
          "Submitting..."
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            Submit Feedback
          </>
        )}
      </Button>
    </form>
  );
}