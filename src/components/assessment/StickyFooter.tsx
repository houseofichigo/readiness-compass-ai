import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StickyFooterProps {
  onPrevious?: () => void;
  onNext: () => void;
  canGoNext: boolean;
  isLastSection: boolean;
  showPrevious: boolean;
}

export function StickyFooter({ 
  onPrevious, 
  onNext, 
  canGoNext, 
  isLastSection, 
  showPrevious 
}: StickyFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t border-border">
      <div className="container mx-auto max-w-6xl px-4 py-3">
        <div className="flex justify-between items-center">
          <div>
            {showPrevious && onPrevious && (
              <Button
                variant="outline"
                onClick={onPrevious}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
            )}
          </div>

          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className={cn(
              "flex items-center gap-2",
              !canGoNext && "opacity-50 cursor-not-allowed"
            )}
          >
            {isLastSection ? "Complete Assessment" : "Next Section"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}