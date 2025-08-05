import { useState } from "react";
import { QuestionGroup } from "@/types/assessment";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import i18n from "@/lib/i18n";
import { getPlaceholder } from "@/lib/placeholders";

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
  const lang = i18n.language.startsWith("fr") ? "fr" : "en";

  const handleGroupToggle = (groupLabel: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupLabel)) newExpanded.delete(groupLabel);
    else newExpanded.add(groupLabel);
    setExpandedGroups(newExpanded);
  };

  const handleOptionChange = (optValue: string, checked: boolean) => {
    const set = new Set(value);
    checked ? set.add(optValue) : set.delete(optValue);
    onChange(Array.from(set));
  };

  const getSelectedCountInGroup = (group: QuestionGroup): number =>
    group.options.filter(opt =>
      value.includes(typeof opt === "string" ? opt : opt.value)
    ).length;

  const filteredGroups = groups.filter(group => {
    if (!searchTerm) return true;
    if (group.label.toLowerCase().includes(searchTerm.toLowerCase())) return true;
    return group.options.some(opt => {
      const label = typeof opt === "string" ? opt : opt.label;
      return label.toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  const totalSelectedTools = value.length;

  return (
    <div className="mt-4 space-y-4">
      {/* Search & Summary */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={
              lang === "fr"
                ? "Rechercher des outils ou des catégories..."
                : getPlaceholder("searchTools")
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {totalSelectedTools > 0 && (
          <Badge variant="secondary">
            {totalSelectedTools} {lang === "fr" ? "outil" : "tool"}
            {totalSelectedTools !== 1 ? (lang === "fr" ? "s" : "s") : ""}{" "}
            {lang === "fr" ? "sélectionné" : "selected"}
          </Badge>
        )}
      </div>

      {/* Groups */}
      <div className="space-y-3">
        {filteredGroups.map(group => {
          const selectedInGroup = getSelectedCountInGroup(group);
          const isExpanded = expandedGroups.has(group.label);

          // filter options by searchTerm
          const opts = group.options.filter(opt => {
            if (!searchTerm) return true;
            const label = typeof opt === "string" ? opt : opt.label;
            return label.toLowerCase().includes(searchTerm.toLowerCase());
          });

          return (
            <Card key={group.label} className="overflow-hidden">
              <Collapsible open={isExpanded} onOpenChange={() => handleGroupToggle(group.label)}>
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between p-4 hover:bg-accent/50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      {isExpanded ? <ChevronDown /> : <ChevronRight />}
                      <Label className="font-medium">{group.label}</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedInGroup > 0 && <Badge variant="default" className="text-xs">{selectedInGroup}</Badge>}
                      <Badge variant="outline" className="text-xs">
                        {group.options.length} {lang === "fr" ? "outils" : "tools"}
                      </Badge>
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="px-4 pb-4 space-y-3 border-t bg-accent/20">
                    {opts.map(opt => {
                      const val = typeof opt === "string" ? opt : opt.value;
                      const label = typeof opt === "string" ? opt : opt.label;
                      return (
                        <div key={val} className="flex items-center space-x-2">
                          <Checkbox
                            id={`${group.label}-${val}`}
                            checked={value.includes(val)}
                            onCheckedChange={checked => handleOptionChange(val, checked as boolean)}
                          />
                          <Label htmlFor={`${group.label}-${val}`} className="font-normal text-sm">
                            {label}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          );
        })}
      </div>

      {/* Selected Summary */}
      {totalSelectedTools > 0 && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <Label className="font-medium text-sm">
            {lang === "fr" ? "Outils sélectionnés :" : "Selected Tools:"}
          </Label>
          <div className="flex flex-wrap gap-1 mt-2">
            {value.slice(0, 10).map(tool => (
              <Badge key={tool} variant="secondary" className="text-xs">
                {tool}
              </Badge>
            ))}
            {totalSelectedTools > 10 && (
              <Badge variant="secondary" className="text-xs">
                +{totalSelectedTools - 10} {lang === "fr" ? "de plus" : "more"}
              </Badge>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
