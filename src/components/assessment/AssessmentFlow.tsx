--- a/src/components/assessment/AssessmentFlow.tsx
+++ b/src/components/assessment/AssessmentFlow.tsx
@@
-import { assessmentSections, assessmentAddOns } from "@/data/assessmentQuestions";
-import { isQuestionVisible, detectTrack } from "@/utils/questionVisibility";
-import { AssessmentResponse, Track, OrganizationProfile, ComputedField } from "@/types/assessment";
+import {
+  assessmentSections,
+  assessmentAddOns,
+  assessmentMeta
+} from "@/data/assessmentQuestions";
+import { isQuestionVisible, detectTrack } from "@/utils/questionVisibility";
+import {
+  AssessmentResponse,
+  Track,
+  OrganizationProfile,
+  ComputedField,
+  AssessmentValue
+} from "@/types/assessment";
@@
// Helpers to parse YAML list literals like "['A','B','C']"
 const parseListLiteral = (lit: string): string[] => {
@@
// 1) Compute “regulated” logic from meta
+// 2) Find TECH roles from track_detection rules
 const parseTechRoles = (rules: Array<Record<string, any>>): string[] => {
   const techRule = rules.find(
-    r => typeof r.if === "string" && (r.if as string).includes("-> TECH")
+    r => r.if && typeof r.if !== "object" && String(r.if).includes("TECH")
   );
   return techRule
     ? parseListLiteral(String(techRule.if))
@@
-export function AssessmentFlow({
+export function AssessmentFlow({
   onComplete
 }: AssessmentFlowProps) {
@@
   // Precompute global computed fields (e.g., from profile section)
   const profileSection = assessmentSections.find(s => s.id === "section_0");
+  // --- regulatedIndustries from meta
+  const regulatedLogic = assessmentMeta.track_detection.precedence
+    .find(p => p.then === "REG")?.if;
+  const regulatedIndustries = Array.isArray(regulatedLogic)
+    ? regulatedLogic as string[]
+    : parseListLiteral(String(regulatedLogic));
+
+  // --- techRoles from meta
+  const techRoles = parseTechRoles(assessmentMeta.track_detection.precedence);
+  const legalRole = "Legal / Compliance Lead";
+
   // 3) Fallback computeTrack for persona changes
   const computeTrack = (rs: Record<string, AssessmentValue>): Track => {
     const role = rs.M3 as string;
     const industry = rs.M4_industry as string;
     if (techRoles.includes(role)) return "TECH";
     if (regulatedIndustries.includes(industry) || role === legalRole)
       return "REG";
     return "GEN";
   };
+
+  // Original compute for per‐section computed fields
+  const evaluateComputed = (fields: ComputedField[] | undefined, rs: Record<string, any>) => {
+    const values: Record<string, any> = {};
+    fields?.forEach(f => {
+      if (f.id === "regulated") {
+        const inds = parseListLiteral(String(f.logic));
+        values.regulated = inds.includes(rs.M4_industry);
+      }
+    });
+    return values;
+  };
+
   // Global computed
-  const globalComputed = evaluateComputed(profileSection?.computed, responses);
+  const globalComputed = evaluateComputed(profileSection?.computed, responses);
+  // Initialize detectedTrack from profile
+  React.useEffect(() => {
+    setDetectedTrack(computeTrack(responses));
+  }, []);
 
   // Filter visible “add-on” questions
   const visibleAddOns = assessmentAddOns.filter(q =>
     isQuestionVisible(
       q,
       responses,
-      detectedTrack,
+      detectedTrack,
       /* totalVisible= */ 0,
       globalComputed
     )
   );
@@
   // Move forwards/backwards
   const goPrev = () => setCurrentPage(i => Math.max(0, i - 1));
 
   // UI bits
@@
-        <div className="flex justify-between">
-          {currentPage > 0
-            ? <Button …>Previous</Button>
-            : <div />}
+        <div className="flex justify-between">
+          <Button
+            onClick={goPrev}
+            variant="outline"
+            className="flex items-center gap-2"
+            disabled={currentPage === 0}
+          >
+            <ArrowLeft className="h-4 w-4" />
+            Previous
+          </Button>
 
           <Button
             onClick={goNext}
