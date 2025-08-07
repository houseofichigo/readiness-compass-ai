import { useState } from "react";
import { QuestionGroup } from "@/types/assessment";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ProgressiveMultiGroupQuestionProps {
  groups: QuestionGroup[];
  value: string[];
  onChange: (value: string[]) => void;
}

export function ProgressiveMultiGroupQuestion({ 
  groups, 
  value, 
  onChange 
}: ProgressiveMultiGroupQuestionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const handleGroupToggle = (groupLabel: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupLabel)) {
      newExpanded.delete(groupLabel);
    } else {
      newExpanded.add(groupLabel);
    }
    setExpandedGroups(newExpanded);
  };

  const handleOptionChange = (optValue: string, checked: boolean) => {
    if (checked) {
      // Add option if not already present
      if (!value.includes(optValue)) {
        onChange([...value, optValue]);
      }
    } else {
      // Remove option
      onChange(value.filter(v => v !== optValue));
    }
  };

  const getSelectedCountInGroup = (group: QuestionGroup): number => {
    return group.options.filter(opt => 
      value.includes(typeof opt === 'string' ? opt : opt.value)
    ).length;
  };

  const filteredGroups = groups.filter(group => {
    if (!searchTerm) return true;
    
    // Search in group label
    if (group.label.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    }
    
    // Search in options
    return group.options.some(opt => {
      const optLabel = typeof opt === 'string' ? opt : opt.label;
      return optLabel.toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  const totalSelectedTools = value.length;

  return (
    <div className="mt-4 space-y-4">
      {/* Search and Summary */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search tools or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {totalSelectedTools > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {totalSelectedTools} tool{totalSelectedTools !== 1 ? 's' : ''} selected
            </Badge>
          </div>
        )}
      </div>

      {/* Tool Categories */}
      <div className="space-y-3">
        {filteredGroups.map((group) => {
          const selectedInGroup = getSelectedCountInGroup(group);
          const isExpanded = expandedGroups.has(group.label);
          
          // Filter options based on search
          const filteredOptions = group.options.filter(opt => {
            if (!searchTerm) return true;
            const optLabel = typeof opt === 'string' ? opt : opt.label;
            return optLabel.toLowerCase().includes(searchTerm.toLowerCase());
          });

          return (
            <Card key={group.label} className="overflow-hidden">
              <Collapsible 
                open={isExpanded} 
                onOpenChange={() => handleGroupToggle(group.label)}
              >
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between p-4 hover:bg-accent/50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      {isExpanded ? 
                        <ChevronDown className="h-4 w-4 text-muted-foreground" /> : 
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      }
                      <Label className="font-medium cursor-pointer">
                        {group.label}
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedInGroup > 0 && (
                        <Badge variant="default" className="text-xs">
                          {selectedInGroup}
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {group.options.length} tools
                      </Badge>
                    </div>
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <div className="px-4 pb-4 space-y-3 border-t bg-accent/20">
                    <div className="pt-3 space-y-2">
                       {filteredOptions.map((opt) => {
                         const optValue = typeof opt === 'string' ? opt : opt.value;
                         const optLabel = typeof opt === 'string' ? opt : opt.label;
                         
                         return (
                           <div key={`${group.label}-${optValue}`} className="flex items-center space-x-2">
                             <Checkbox
                               id={`${group.label}-${optValue}`}
                               checked={value.includes(optValue)}
                               onCheckedChange={(checked) => 
                                 handleOptionChange(optValue, checked as boolean)
                               }
                             />
                             <Label 
                               htmlFor={`${group.label}-${optValue}`} 
                               className="font-normal cursor-pointer text-sm"
                             >
                               {optLabel}
                             </Label>
                           </div>
                         );
                       })}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          );
        })}
      </div>

      {/* Selected Tools Summary */}
      {totalSelectedTools > 0 && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="space-y-2">
            <Label className="font-medium text-sm">Selected Tools:</Label>
             <div className="flex flex-wrap gap-1">
               {value.slice(0, 10).map(tool => (
                 <Badge key={`selected-${tool}`} variant="secondary" className="text-xs">
                   {tool}
                 </Badge>
               ))}
              {totalSelectedTools > 10 && (
                <Badge variant="secondary" className="text-xs">
                  +{totalSelectedTools - 10} more
                </Badge>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}