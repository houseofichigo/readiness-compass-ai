import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Track } from "@/types/assessment";

interface ProgressHeaderProps {
  currentSectionIndex: number;
  totalSections: number;
  answeredInSection: number;
  totalInSection: number;
  sectionTitle: string;
  detectedTrack?: Track;
  showTrackInfo: boolean;
}

export function ProgressHeader({
  currentSectionIndex,
  totalSections,
  answeredInSection,
  totalInSection,
  sectionTitle,
  detectedTrack,
  showTrackInfo
}: ProgressHeaderProps) {
  const getTrackLabel = (track?: Track) => {
    switch (track) {
      case 'TECH': return 'Technical Track';
      case 'REG': return 'Regulated Track';
      case 'GEN': return 'General Track';
      default: return 'Complete Profile First';
    }
  };

  const getTrackColor = (track?: Track) => {
    switch (track) {
      case 'TECH': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'REG': return 'bg-red-500/10 text-red-700 border-red-200';
      case 'GEN': return 'bg-green-500/10 text-green-700 border-green-200';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
      <div className="container mx-auto max-w-6xl px-4 py-4">
        <Card className="p-4 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="text-sm">
                  Section {currentSectionIndex + 1} of {totalSections}
                </Badge>
                {showTrackInfo && (
                  <Badge 
                    variant="outline"
                    className={getTrackColor(detectedTrack)}
                  >
                    {getTrackLabel(detectedTrack)}
                  </Badge>
                )}
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                {sectionTitle}
              </h2>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-muted-foreground">
                Questions Answered
              </div>
              <div className="text-2xl font-bold text-foreground">
                {answeredInSection} / {totalInSection}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}