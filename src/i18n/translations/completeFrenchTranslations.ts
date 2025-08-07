import { QuestionChoice } from '@/types/assessment';

interface TranslationEntry {
  text?: string;
  helper?: string;
  purpose?: string;
  choices?: QuestionChoice[];
}

export const frenchTranslations: Record<string, TranslationEntry> = {
  // Section purposes
  section_0: { purpose: "Collecter le profil de votre organisation pour détecter la filière et personnaliser les recommandations" },
  section_1: { purpose: "Évaluer l'alignement stratégique et la maturité de la planification" },
  section_2: { purpose: "Gérer budget, trésorerie, soutien investisseurs et conformité" },
  section_3: { purpose: "Fondation des données, sécurité, éthique et conformité" },
  section_4: { purpose: "Évaluer la maturité de la stack d'outils et leur intégration" },
  section_5: { purpose: "Évaluer la maturité de l'automatisation et la gouvernance des agents IA" },
  section_6: { purpose: "Évaluer les capacités de l'équipe et la culture d'apprentissage" },
  section_7: { purpose: "Évaluer la gouvernance, les risques et l'éthique" },
  section_8: { purpose: "Aligner l'horizon de déploiement, les KPI et la vision" },

  // Organization Profile Questions (Section 0)
  M0: { text: "Quel est le nom de votre organisation ?" },
  M1: { text: "Quel est votre nom complet ?" },
  M2: { 
    text: "Quelle est votre adresse e-mail professionnelle ?",
    helper: "Utilisez votre adresse de travail (pas Gmail, Hotmail, etc.)"
  },
  M3: {
    text: "Quel est votre rôle principal ?",
    helper: "Cela détermine votre filière de recommandations",
    choices: [
      { value: "Founder/CEO", label: "Fondateur·rice / CEO" },
      { value: "Executive", label: "Cadre dirigeant·e" },
      { value: "Marketing Lead", label: "Responsable Marketing" },
      { value: "Sales Lead", label: "Responsable Commercial" },
      { value: "Finance Lead", label: "Responsable Finance" },
      { value: "Operations Lead", label: "Responsable Opérations" },
      { value: "Product Lead", label: "Responsable Produit" },
      { value: "HR Lead", label: "Responsable RH" },
      { value: "Customer Support Lead", label: "Responsable Support Client" },
      { value: "CIO/CTO", label: "CIO / CTO" },
      { value: "IT Lead", label: "Responsable IT" },
      { value: "Data/AI Lead", label: "Responsable Data / IA" },
      { value: "ML Engineer", label: "Ingénieur·e ML" },
      { value: "Data Engineer", label: "Ingénieur·e Data" },
      { value: "DevOps Engineer", label: "Ingénieur·e DevOps" },
      { value: "Security Architect", label: "Architecte Sécurité" },
      { value: "Infrastructure Lead", label: "Responsable Infrastructure" },
      { value: "Legal/Compliance Lead", label: "Responsable Juridique / Conformité" },
      { value: "Privacy Lead", label: "Responsable Confidentialité" },
      { value: "Compliance Lead", label: "Responsable Conformité" },
      { value: "Risk Lead", label: "Responsable Risques" },
      { value: "Audit Lead", label: "Responsable Audit" },
      { value: "Governance Lead", label: "Responsable Gouvernance" }
    ]
  },
  M4_industry: {
    text: "Quel est votre secteur d'activité et sous-secteur ?",
    choices: [
      { value: "Agriculture, forestry and fishing", label: "Agriculture, forêt et pêche" },
      { value: "Mining and quarrying", label: "Extraction minière et carrières" },
      { value: "Utilities (electricity, gas, water, waste)", label: "Services publics (électricité, gaz, eau, déchets)" },
      { value: "Construction", label: "Construction" },
      { value: "Manufacturing", label: "Industrie manufacturière" },
      { value: "Wholesale trade", label: "Commerce de gros" },
      { value: "Retail trade", label: "Commerce de détail" },
      { value: "Transportation and warehousing", label: "Transport et entreposage" },
      { value: "Information and communication technology", label: "Technologies de l'information et de la communication" },
      { value: "Finance and insurance", label: "Finance et assurance" },
      { value: "Real estate and rental", label: "Immobilier et location" },
      { value: "Professional, scientific and technical services", label: "Services professionnels, scientifiques et techniques" },
      { value: "Administrative and waste management services", label: "Services administratifs et gestion des déchets" },
      { value: "Educational services", label: "Services d'enseignement" },
      { value: "Health care and social assistance", label: "Soins de santé et assistance sociale" },
      { value: "Arts, entertainment and recreation", label: "Arts, spectacles et loisirs" },
      { value: "Accommodation and food services", label: "Hébergement et restauration" },
      { value: "Public administration", label: "Administration publique" },
      { value: "Associations and NGOs", label: "Associations et ONG" }
    ]
  },
  M5_country: {
    text: "Dans quel pays êtes-vous basé·e ?",
    choices: [
      { value: "Afghanistan", label: "Afghanistan" },
      { value: "Albania", label: "Albanie" },
      { value: "Algeria", label: "Algérie" },
      { value: "Andorra", label: "Andorre" },
      { value: "Angola", label: "Angola" },
      { value: "Antigua and Barbuda", label: "Antigua-et-Barbuda" },
      { value: "Argentina", label: "Argentine" },
      { value: "Armenia", label: "Arménie" },
      { value: "Australia", label: "Australie" },
      { value: "Austria", label: "Autriche" },
      { value: "Azerbaijan", label: "Azerbaïdjan" },
      { value: "Bahamas", label: "Bahamas" },
      { value: "Bahrain", label: "Bahreïn" },
      { value: "Bangladesh", label: "Bangladesh" },
      { value: "Barbados", label: "Barbade" },
      { value: "Belarus", label: "Biélorussie" },
      { value: "Belgium", label: "Belgique" },
      { value: "Belize", label: "Bélize" },
      { value: "Benin", label: "Bénin" },
      { value: "Bhutan", label: "Bhoutan" },
      { value: "Bolivia", label: "Bolivie" },
      { value: "Bosnia and Herzegovina", label: "Bosnie-Herzégovine" },
      { value: "Botswana", label: "Botswana" },
      { value: "Brazil", label: "Brésil" },
      { value: "Brunei", label: "Brunei" },
      { value: "Bulgaria", label: "Bulgarie" },
      { value: "Burkina Faso", label: "Burkina Faso" },
      { value: "Burundi", label: "Burundi" },
      { value: "Cambodia", label: "Cambodge" },
      { value: "Cameroon", label: "Cameroun" },
      { value: "Canada", label: "Canada" },
      { value: "Cape Verde", label: "Cap-Vert" },
      { value: "Central African Republic", label: "République centrafricaine" },
      { value: "Chad", label: "Tchad" },
      { value: "Chile", label: "Chili" },
      { value: "China", label: "Chine" },
      { value: "Colombia", label: "Colombie" },
      { value: "Comoros", label: "Comores" },
      { value: "Congo", label: "République du Congo" },
      { value: "Democratic Republic of the Congo", label: "République démocratique du Congo" },
      { value: "Costa Rica", label: "Costa Rica" },
      { value: "Côte d'Ivoire", label: "Côte d'Ivoire" },
      { value: "Croatia", label: "Croatie" },
      { value: "Cuba", label: "Cuba" },
      { value: "Cyprus", label: "Chypre" },
      { value: "Czech Republic", label: "République tchèque" },
      { value: "Denmark", label: "Danemark" },
      { value: "Djibouti", label: "Djibouti" },
      { value: "Dominica", label: "Dominique" },
      { value: "Dominican Republic", label: "République dominicaine" },
      { value: "Ecuador", label: "Équateur" },
      { value: "Egypt", label: "Égypte" },
      { value: "El Salvador", label: "Salvador" },
      { value: "Equatorial Guinea", label: "Guinée équatoriale" },
      { value: "Eritrea", label: "Érythrée" },
      { value: "Estonia", label: "Estonie" },
      { value: "Eswatini", label: "Eswatini" },
      { value: "Ethiopia", label: "Éthiopie" },
      { value: "Fiji", label: "Fidji" },
      { value: "Finland", label: "Finlande" },
      { value: "France", label: "France" },
      { value: "Gabon", label: "Gabon" },
      { value: "Gambia", label: "Gambie" },
      { value: "Georgia", label: "Géorgie" },
      { value: "Germany", label: "Allemagne" },
      { value: "Ghana", label: "Ghana" },
      { value: "Greece", label: "Grèce" },
      { value: "Grenada", label: "Grenade" },
      { value: "Guatemala", label: "Guatemala" },
      { value: "Guinea", label: "Guinée" },
      { value: "Guinea-Bissau", label: "Guinée-Bissau" },
      { value: "Guyana", label: "Guyana" },
      { value: "Haiti", label: "Haïti" },
      { value: "Honduras", label: "Honduras" },
      { value: "Hungary", label: "Hongrie" },
      { value: "Iceland", label: "Islande" },
      { value: "India", label: "Inde" },
      { value: "Indonesia", label: "Indonésie" },
      { value: "Iran", label: "Iran" },
      { value: "Iraq", label: "Iraq" },
      { value: "Ireland", label: "Irlande" },
      { value: "Israel", label: "Israël" },
      { value: "Italy", label: "Italie" },
      { value: "Jamaica", label: "Jamaïque" },
      { value: "Japan", label: "Japon" },
      { value: "Jordan", label: "Jordanie" },
      { value: "Kazakhstan", label: "Kazakhstan" },
      { value: "Kenya", label: "Kenya" },
      { value: "Kiribati", label: "Kiribati" },
      { value: "Kuwait", label: "Koweït" },
      { value: "Kyrgyzstan", label: "Kirghizistan" },
      { value: "Laos", label: "Laos" },
      { value: "Latvia", label: "Lettonie" },
      { value: "Lebanon", label: "Liban" },
      { value: "Lesotho", label: "Lesotho" },
      { value: "Liberia", label: "Libéria" },
      { value: "Libya", label: "Libye" },
      { value: "Liechtenstein", label: "Liechtenstein" },
      { value: "Lithuania", label: "Lituanie" },
      { value: "Luxembourg", label: "Luxembourg" },
      { value: "Madagascar", label: "Madagascar" },
      { value: "Malawi", label: "Malawi" },
      { value: "Malaysia", label: "Malaisie" },
      { value: "Maldives", label: "Maldives" },
      { value: "Mali", label: "Mali" },
      { value: "Malta", label: "Malte" },
      { value: "Marshall Islands", label: "Îles Marshall" },
      { value: "Mauritania", label: "Mauritanie" },
      { value: "Mauritius", label: "Maurice" },
      { value: "Mexico", label: "Mexique" },
      { value: "Micronesia", label: "Micronésie" },
      { value: "Moldova", label: "Moldavie" },
      { value: "Monaco", label: "Monaco" },
      { value: "Mongolia", label: "Mongolie" },
      { value: "Montenegro", label: "Monténégro" },
      { value: "Morocco", label: "Maroc" },
      { value: "Mozambique", label: "Mozambique" },
      { value: "Myanmar", label: "Myanmar" },
      { value: "Namibia", label: "Namibie" },
      { value: "Nauru", label: "Nauru" },
      { value: "Nepal", label: "Népal" },
      { value: "Netherlands", label: "Pays-Bas" },
      { value: "New Zealand", label: "Nouvelle-Zélande" },
      { value: "Nicaragua", label: "Nicaragua" },
      { value: "Niger", label: "Niger" },
      { value: "Nigeria", label: "Nigéria" },
      { value: "North Korea", label: "Corée du Nord" },
      { value: "North Macedonia", label: "Macédoine du Nord" },
      { value: "Norway", label: "Norvège" },
      { value: "Oman", label: "Oman" },
      { value: "Palestine", label: "Palestine" },
      { value: "Pakistan", label: "Pakistan" },
      { value: "Palau", label: "Palaos" },
      { value: "Panama", label: "Panama" },
      { value: "Papua New Guinea", label: "Papouasie-Nouvelle-Guinée" },
      { value: "Paraguay", label: "Paraguay" },
      { value: "Peru", label: "Pérou" },
      { value: "Philippines", label: "Philippines" },
      { value: "Poland", label: "Pologne" },
      { value: "Portugal", label: "Portugal" },
      { value: "Qatar", label: "Qatar" },
      { value: "Romania", label: "Roumanie" },
      { value: "Russia", label: "Russie" },
      { value: "Rwanda", label: "Rwanda" },
      { value: "Saint Kitts and Nevis", label: "Saint-Kitts-et-Nevis" },
      { value: "Saint Lucia", label: "Sainte-Lucie" },
      { value: "Saint Vincent and the Grenadines", label: "Saint-Vincent-et-les-Grenadines" },
      { value: "Samoa", label: "Samoa" },
      { value: "San Marino", label: "Saint-Marin" },
      { value: "Sao Tome and Principe", label: "Sao Tomé-et-Principe" },
      { value: "Saudi Arabia", label: "Arabie saoudite" },
      { value: "Senegal", label: "Sénégal" },
      { value: "Serbia", label: "Serbie" },
      { value: "Seychelles", label: "Seychelles" },
      { value: "Sierra Leone", label: "Sierra Leone" },
      { value: "Singapore", label: "Singapour" },
      { value: "Slovakia", label: "Slovaquie" },
      { value: "Slovenia", label: "Slovénie" },
      { value: "Solomon Islands", label: "Îles Salomon" },
      { value: "Somalia", label: "Somalie" },
      { value: "South Africa", label: "Afrique du Sud" },
      { value: "South Sudan", label: "Soudan du Sud" },
      { value: "Spain", label: "Espagne" },
      { value: "Sri Lanka", label: "Sri Lanka" },
      { value: "Sudan", label: "Soudan" },
      { value: "Suriname", label: "Suriname" },
      { value: "Sweden", label: "Suède" },
      { value: "Switzerland", label: "Suisse" },
      { value: "Syria", label: "Syrie" },
      { value: "Tajikistan", label: "Tadjikistan" },
      { value: "Thailand", label: "Thaïlande" },
      { value: "Timor-Leste", label: "Timor-Leste" },
      { value: "Togo", label: "Togo" },
      { value: "Tonga", label: "Tonga" },
      { value: "Trinidad and Tobago", label: "Trinité-et-Tobago" },
      { value: "Tunisia", label: "Tunisie" },
      { value: "Turkey", label: "Turquie" },
      { value: "Turkmenistan", label: "Turkménistan" },
      { value: "Tuvalu", label: "Tuvalu" },
      { value: "Uganda", label: "Ouganda" },
      { value: "Ukraine", label: "Ukraine" },
      { value: "United Arab Emirates", label: "Émirats arabes unis" },
      { value: "United Kingdom", label: "Royaume-Uni" },
      { value: "United States", label: "États-Unis" },
      { value: "Uruguay", label: "Uruguay" },
      { value: "Uzbekistan", label: "Ouzbékistan" },
      { value: "Vanuatu", label: "Vanuatu" },
      { value: "Venezuela", label: "Venezuela" },
      { value: "Vietnam", label: "Vietnam" },
      { value: "Yemen", label: "Yémen" },
      { value: "Zambia", label: "Zambie" },
      { value: "Zimbabwe", label: "Zimbabwe" }
    ]
  },
  M6_size: {
    text: "Taille de l'entreprise (équivalent temps plein – ETP)",
    choices: [
      { value: "1–9", label: "1–9" },
      { value: "10–49", label: "10–49" },
      { value: "50–249", label: "50–249" },
      { value: "250–999", label: "250–999" },
      { value: "≥ 1 000", label: "≥ 1 000" },
      { value: "Prefer not to say", label: "Préfère ne pas dire" }
    ]
  },
  M7_revenue: {
    text: "Quel est votre chiffre d'affaires annuel ?",
    choices: [
      { value: "< €250 k", label: "< 250 000 €" },
      { value: "€250 k–1 M", label: "250 000–1 M €" },
      { value: "€1 M–€5 M", label: "1–5 M €" },
      { value: "€5 M–€20 M", label: "5–20 M €" },
      { value: "€20 M–€100 M", label: "20–100 M €" },
      { value: "> €100 M", label: "> 100 M €" },
      { value: "Prefer not to say", label: "Préfère ne pas dire" }
    ]
  },

  // Strategy & Use-Case Readiness (Section 1)
  S1: {
    text: "Combien de cas d'usage IA avez-vous identifiés pour mise en œuvre dans les 12 prochains mois ?",
    helper: "Définit votre maturité de planification et votre niveau de préparation",
    choices: [
      { value: "None", label: "Aucun" },
      { value: "Ideas only", label: "Idées seulement" },
      { value: "1–2 documented use cases", label: "1–2 cas documentés" },
      { value: "3–5 prioritized with owners", label: "3–5 cas priorisés avec responsables" },
      { value: "6+ with owners and timelines", label: "6 cas ou plus avec responsables et échéances" }
    ]
  },
  S2: {
    text: "Comment décidez-vous quelles opportunités IA prioriser ?",
    helper: "Sélectionnez le processus que vous utilisez actuellement",
    choices: [
      { value: "No formal process", label: "Pas de processus formel" },
      { value: "Ad-hoc based on perceived value", label: "Au cas par cas selon la valeur perçue" },
      { value: "Impact × Effort matrix", label: "Matrice Impact × Effort" },
      { value: "Impact × Effort + capability weighting", label: "Impact × Effort + pondération capacité" },
      { value: "Financial ROI modeling", label: "Modèle financier ROI" },
      { value: "Risk-adjusted prioritization", label: "Priorisation ajustée au risque" }
    ]
  },
  S3: {
    text: "Dans quelle mesure vos indicateurs IA sont-ils intégrés aux KPI ou OKR de l'entreprise ?",
    choices: [
      { value: "No AI KPI/OKRs defined", label: "Pas d'IA KPI/OKR définis" },
      { value: "KPIs written but not tracked", label: "KPI rédigés mais non suivis" },
      { value: "KPIs tracked but not linked", label: "KPI suivis mais non reliés" },
      { value: "Partially aligned with departmental OKRs", label: "Partiellement alignés aux OKR départementaux" },
      { value: "Fully integrated with executive OKRs", label: "Pleinement intégrés aux OKR exécutifs" }
    ]
  },
  S4: {
    text: "Comment évaluez-vous le ROI de vos projets IA ?",
    helper: "Choisissez la méthode conforme à votre pratique actuelle",
    choices: [
      { value: "No ROI estimation", label: "Pas d'estimation de ROI" },
      { value: "Rough empirical estimates", label: "Estimations empiriques approximatives" },
      { value: "Simple cost-benefit analysis", label: "Analyse coût – bénéfice simplifiée" },
      { value: "ROI tied to clear KPIs", label: "ROI lié à des KPI clairs" },
      { value: "Financial or risk-adjusted models", label: "Modèles financiers ou ajustés au risque" }
    ]
  },
  S5: {
    text: "Quel est votre délai typique de l'idée à un impact IA mesurable ?",
    choices: [
      { value: "12+ months", label: "Plus de 12 mois" },
      { value: "6–12 months", label: "6 – 12 mois" },
      { value: "3–6 months", label: "3 – 6 mois" },
      { value: "1–3 months", label: "1 – 3 mois" },
      { value: "< 30 days", label: "Moins de 30 jours" }
    ]
  },
  S6: {
    text: "Comment suivez-vous les avancées IA de vos concurrents et du secteur ?",
    choices: [
      { value: "No tracking", label: "Non suivi" },
      { value: "Ad-hoc research", label: "Recherches ponctuelles" },
      { value: "Annual review", label: "Revue annuelle" },
      { value: "Quarterly reports", label: "Rapports trimestriels" },
      { value: "Continuous dashboard", label: "Tableau de bord continu" }
    ]
  },
  S7: {
    text: "Classez vos quatre principaux objectifs stratégiques pour les initiatives IA ?",
    choices: [
      { value: "Productivity", label: "Productivité" },
      { value: "Cost reduction", label: "Réduction des coûts" },
      { value: "Revenue growth", label: "Croissance du chiffre d'affaires" },
      { value: "Customer experience", label: "Expérience client" },
      { value: "Innovation", label: "Innovation" },
      { value: "Regulatory compliance", label: "Conformité réglementaire" },
      { value: "Investor positioning", label: "Positionnement investisseurs" }
    ]
  },
  S8: {
    text: "Quel est le niveau d'adhésion de votre comité de direction à la stratégie IA ?",
    choices: [
      { value: "No buy-in", label: "Pas d'adhésion" },
      { value: "Ad-hoc discussions", label: "Discussions ponctuelles" },
      { value: "Interest without action", label: "Intérêt sans action" },
      { value: "Budget approved", label: "Budget approuvé" },
      { value: "Active executive sponsorship", label: "Sponsoring exécutif actif" }
    ]
  },
  S9: {
    text: "Quelles équipes participent à la définition des cas d'usage IA ?",
    choices: [
      { value: "Executive leadership", label: "Direction exécutive" },
      { value: "Product and marketing", label: "Produit et marketing" },
      { value: "Operations", label: "Opérations" },
      { value: "Data and IT", label: "Data et IT" },
      { value: "Legal and compliance", label: "Juridique et conformité" },
      { value: "HR", label: "RH" },
      { value: "Finance", label: "Finance" },
      { value: "Customer support", label: "Support client" }
    ]
  },
  S10: {
    text: "Dans quelle mesure votre organisation est-elle prête à gérer le changement induit par l'IA ?",
    choices: [
      { value: "Not prepared", label: "Pas prête" },
      { value: "Ad-hoc preparation", label: "Préparation ad hoc" },
      { value: "Formal process for some projects", label: "Processus formel pour certains projets" },
      { value: "Organizational framework", label: "Cadre organisationnel" },
      { value: "Continuous improvement culture", label: "Culture d'amélioration continue" }
    ]
  },
  S11: {
    text: "Dans quelle mesure vos objectifs IA sont-ils assortis d'indicateurs clairs ?",
    choices: [
      { value: "No clear goals", label: "Pas d'objectifs clairs" },
      { value: "Goals defined without metrics", label: "Objectifs définis sans indicateurs" },
      { value: "Some metrics tracked", label: "Quelques indicateurs suivis" },
      { value: "Most goals with metrics", label: "La plupart des objectifs avec indicateurs" },
      { value: "All goals with metrics and thresholds", label: "Tous les objectifs avec indicateurs et seuils" }
    ]
  },
  S12: {
    text: "Quelle est votre approche pour piloter et déployer vos projets IA ?",
    choices: [
      { value: "POC only with strict controls", label: "POC uniquement avec contrôles stricts" },
      { value: "Small pilots with gated access", label: "Petits pilotes en accès contrôlé" },
      { value: "Case-by-case security review", label: "Revue sécurité au cas par cas" },
      { value: "Agile testing with supervision", label: "Tests agiles avec supervision" },
      { value: "Fast iterations ready for production", label: "Itérations rapides prêtes pour production" }
    ]
  },

  // Budget & Compliance (Section 2)
  F1: {
    text: "Quel est votre budget mensuel pour les initiatives IA et données ?",
    choices: [
      { value: "< €100", label: "< 100 €" },
      { value: "€100–500", label: "100 – 500 €" },
      { value: "€500–2,000", label: "500 – 2 000 €" },
      { value: "€2,000–15,000", label: "2 000 – 15 000 €" },
      { value: "> €15,000", label: "> 15 000 €" }
    ]
  },
  F3: {
    text: "Combien de temps pouvez-vous financer vos efforts IA sans nouvel apport ?",
    helper: "Indiquez votre trésorerie disponible pour vos projets IA",
    choices: [
      { value: "< 3 months", label: "Moins de 3 mois" },
      { value: "3–6 months", label: "3 – 6 mois" },
      { value: "6–12 months", label: "6 – 12 mois" },
      { value: "12–24 months", label: "12 – 24 mois" },
      { value: "> 24 months", label: "> 24 mois" }
    ]
  },
  F4: {
    text: "Quel est le niveau de soutien de votre conseil ou de vos investisseurs pour l'IA ?",
    choices: [
      { value: "No support", label: "Pas de soutien" },
      { value: "Discussion without commitment", label: "Discussion sans engagement" },
      { value: "Open to AI initiatives", label: "Ouverts aux initiatives IA" },
      { value: "Budget approved", label: "Budget approuvé" },
      { value: "Active support", label: "Soutien actif" }
    ]
  },
  F5: {
    text: "Quels cadres réglementaires ou de sécurité supplémentaires s'appliquent à votre organisation ?",
    helper: "Le RGPD et le règlement IA européen s'appliquent par défaut",
    choices: [
      { value: "MiFID II / MDR – Finance & health (EU)", label: "MiFID II / MDR – Finance & santé (UE)" },
      { value: "ISO 27001 – Information security", label: "ISO 27001 – Sécurité de l'information" },
      { value: "PCI-DSS – Payment security", label: "PCI-DSS – Sécurité des paiements" },
      { value: "HIPAA – US health data", label: "HIPAA – Données de santé US" },
      { value: "CCPA – California privacy", label: "CCPA – Confidentialité Californie" },
      { value: "LGPD – Brazil privacy", label: "LGPD – Confidentialité Brésil" },
      { value: "POPIA – South Africa privacy", label: "POPIA – Confidentialité Afrique du Sud" },
      { value: "None", label: "Aucun" }
    ]
  },
  F6: {
    text: "Quel niveau de partenariats stratégiques avez-vous pour l'IA ?",
    helper: "Choisissez l'activité partenariale IA actuelle",
    choices: [
      { value: "None", label: "Aucun" },
      { value: "Exploratory discussions", label: "Discussions exploratoires" },
      { value: "One active partnership", label: "Un partenariat actif" },
      { value: "Multiple partnerships", label: "Plusieurs partenariats" },
      { value: "Ecosystem collaboration (R&D + vendors)", label: "Collaboration écosystème (R & D + fournisseurs)" }
    ]
  },
  F7: {
    text: "Quelle part de votre budget IA est consacrée à l'éthique et à la lutte contre les biais ?",
    choices: [
      { value: "None", label: "Aucune" },
      { value: "Planned next year", label: "Prévue l'an prochain" },
      { value: "< 5%", label: "< 5 %" },
      { value: "5–15%", label: "5 – 15 %" },
      { value: "> 15%", label: "> 15 %" }
    ]
  },

  // Data Foundation & Security (Section 3)
  D1: {
    text: "Où sont principalement stockées vos données critiques ?",
    helper: "Ces données pilotent vos opérations, décisions et conformité",
    choices: [
      { value: "Files and spreadsheets (Excel, Google Sheets, local files)", label: "Fichiers et tableurs (Excel, Google Sheets, fichiers locaux)" },
      { value: "Databases (SQL, NoSQL, data warehouses)", label: "Bases de données (SQL, NoSQL, entrepôts de données)" },
      { value: "Cloud and SaaS (Google Drive, Salesforce, HubSpot)", label: "Cloud et SaaS (Google Drive, Salesforce, HubSpot)" },
      { value: "Internal tools and legacy systems", label: "Outils internes et systèmes hérités" },
      { value: "BI platforms (Power BI, Looker, Tableau)", label: "Plateformes BI (Power BI, Looker, Tableau)" }
    ]
  },
  D2: {
    text: "Quel volume de données générez-vous ou collectez-vous chaque mois ?",
    choices: [
      { value: "Don't know", label: "Ne sait pas" },
      { value: "< 1 GB", label: "< 1 Go" },
      { value: "1–10 GB", label: "1–10 Go" },
      { value: "10–100 GB", label: "10–100 Go" },
      { value: "> 100 GB", label: "> 100 Go" }
    ]
  },
  D3: {
    text: "Dans quelle mesure votre gestion des données (structure, outils et traçabilité) est-elle mature ?",
    choices: [
      { value: "No standards or visibility", label: "Pas de normes ni de visibilité" },
      { value: "Basic naming conventions and partial documentation", label: "Conventions de nommage basiques et documentation partielle" },
      { value: "Defined standards with manual processes", label: "Normes définies avec processus manuels" },
      { value: "Schema tooling and automated tracking for key systems", label: "Outils de schéma et suivi automatisé pour les systèmes clés" },
      { value: "Versioned models with full lineage and governance", label: "Modèles versionnés avec traçabilité et gouvernance complètes" }
    ]
  },
  D4: {
    text: "Quel est votre niveau de confiance dans la qualité et l'actualité de vos données critiques ?",
    choices: [
      { value: "Low: data often stale or unreliable", label: "Faible : données souvent obsolètes ou peu fiables" },
      { value: "Medium: manual quality checks", label: "Moyen : vérifications manuelles pour la qualité" },
      { value: "High: periodic data quality testing", label: "Élevé : tests périodiques de qualité des données" },
      { value: "Very high: automated anomaly alerts", label: "Très élevé : alertes automatisées pour anomalies" },
      { value: "Excellent: real-time monitoring and validation", label: "Excellent : surveillance et validation en temps réel" }
    ]
  },
  D5: {
    text: "Quelles mesures de sécurité protègent votre infrastructure de données ?",
    helper: "Chiffrement, contrôle d'accès et surveillance",
    choices: [
      { value: "Encryption at rest (AWS S3, Azure Blob)", label: "Chiffrement au repos (AWS S3, Azure Blob)" },
      { value: "TLS/HTTPS in transit", label: "TLS/HTTPS en transit" },
      { value: "Role-based access controls (IAM, RBAC)", label: "Contrôles d'accès par rôle (IAM, RBAC)" },
      { value: "Audit logs & monitoring", label: "Journaux d'audit et monitoring" },
      { value: "DLP (data loss prevention)", label: "DLP (prévention des pertes de données)" },
      { value: "Tokenization (Vault, etc.)", label: "Tokenisation (Vault, etc.)" },
      { value: "Differential privacy", label: "Confidentialité différentielle" },
      { value: "None", label: "Aucune" },
      { value: "I don't know", label: "Ne sait pas" },
      { value: "Other (please specify)", label: "Autre (à préciser)" }
    ]
  },
  D6: {
    text: "Comment gérez-vous la gouvernance et le nettoyage des données ?",
    choices: [
      { value: "No owner defined", label: "Pas de responsable défini" },
      { value: "Occasional clean-ups", label: "Nettoyages ponctuels" },
      { value: "Assigned owner with periodic review", label: "Responsable désigné avec révisions périodiques" },
      { value: "Dedicated steward with monthly routines", label: "Steward dédié avec routines mensuelles" },
      { value: "Continuous governance and monitoring", label: "Gouvernance continue et monitoring" }
    ]
  },
  D7: {
    text: "Quel est votre niveau de préparation pour un audit RGPD ou loi IA européenne ?",
    helper: "Indiquez votre préparation aux audits externes ou internes",
    choices: [
      { value: "None – no audit readiness", label: "Aucune préparation" },
      { value: "Basic logs only", label: "Journaux basiques uniquement" },
      { value: "Audit trail for critical systems", label: "Traçabilité pour systèmes critiques" },
      { value: "Explainability logs + scripts", label: "Journaux explicatifs et scripts" },
      { value: "Automated compliance checks", label: "Contrôles de conformité automatisés" },
      { value: "I don't know", label: "Ne sait pas" }
    ]
  },
  D8: {
    text: "Quel est le niveau de maturité de votre processus d'étiquetage et d'annotation des données ?",
    choices: [
      { value: "None", label: "Aucun" },
      { value: "Ad-hoc manual labeling", label: "Étiquetage manuel ponctuel" },
      { value: "Defined guidelines", label: "Directives définies" },
      { value: "Standardized taxonomy", label: "Taxonomie standardisée" },
      { value: "Automated labeling and ontology management", label: "Étiquetage automatisé et gestion d'ontologie" }
    ]
  },
  D9: {
    text: "Utilisez-vous des données synthétiques ou tierces pour enrichir vos jeux de données ?",
    choices: [
      { value: "No", label: "Non" },
      { value: "Exploring", label: "En phase d'exploration" },
      { value: "Limited pilot projects", label: "Projets pilotes limités" },
      { value: "Regular production use", label: "Usage régulier en production" },
      { value: "Advanced synthetic pipelines", label: "Pipelines synthétiques avancés" }
    ]
  },
  D10: {
    text: "Quel est le niveau de maturité de vos politiques d'éthique IA et de confidentialité des données ?",
    helper: "Ex. : « Politiques + formation et contrôle » = guides documentés et ateliers",
    choices: [
      { value: "No formal policies", label: "Pas de politique formelle" },
      { value: "High-level principles only", label: "Principes généraux uniquement" },
      { value: "Documented guidelines (but no training or oversight)", label: "Directives documentées sans formation" },
      { value: "Guidelines + training & oversight", label: "Directives avec formation et contrôle" },
      { value: "Audited & continuously improved", label: "Auditées et améliorées en continu" }
    ]
  },

  // Tool Stack & Integration (Section 4)
  T0_tools: {
    text: "Quels outils utilisez-vous activement avec votre équipe ?",
    helper: "Sélectionnez tous les outils pour personnaliser les recommandations d'automatisation"
  },
  T1: {
    text: "Dans quelle mesure vos outils et systèmes sont-ils connectés ?",
    choices: [
      { value: "Isolated – no connections", label: "Isolés – aucune connexion" },
      { value: "Manual – CSV import/export", label: "Manuel – import/export CSV" },
      { value: "Batch – scheduled syncing", label: "Batch – synchronisations programmées" },
      { value: "API – platform integrations", label: "API – intégrations plateformes" },
      { value: "Real-time – event mesh", label: "Temps réel – maillage événementiel" }
    ]
  },
  T2: {
    text: "À quelle fréquence vos connexions de données échouent-elles ou posent-elles problème ?",
    choices: [
      { value: "Weekly – frequent breakages", label: "Hebdomadaire – pannes fréquentes" },
      { value: "Monthly – occasional errors", label: "Mensuelle – erreurs occasionnelles" },
      { value: "Quarterly – rare issues", label: "Trimestrielle – rares problèmes" },
      { value: "Almost never – very stable", label: "Quasiment jamais – très stable" },
      { value: "Never – completely reliable", label: "Jamais – totalement fiable" }
    ]
  },
  T3: {
    text: "Qui est responsable de la gestion et de la maintenance de vos intégrations système ?",
    choices: [
      { value: "No owner defined", label: "Pas de responsable défini" },
      { value: "External agency or freelancer", label: "Agence ou freelance externe" },
      { value: "Ops/Product team", label: "Équipe Ops/Produit" },
      { value: "Internal technical team", label: "Équipe technique interne" },
      { value: "Dedicated integrations team", label: "Équipe dédiée aux intégrations" }
    ]
  },
  T4: {
    text: "Comment êtes-vous connectés aux services IA externes et aux LLM ?",
    helper: "Ex. : ChatGPT, Claude, Mistral, Copilot ou LLM interne",
    choices: [
      { value: "Forbidden access to external LLMs", label: "Accès interdit aux LLM externes" },
      { value: "Exploratory testing only", label: "Tests exploratoires uniquement" },
      { value: "API pilots", label: "Pilotes API" },
      { value: "One API in production", label: "Une API en production" },
      { value: "Multiple APIs in production + internal LLM", label: "Plusieurs APIs en production + LLM interne" }
    ]
  },
  T5: {
    text: "Quel accès avez-vous aux ressources GPU/TPU ?",
    choices: [
      { value: "None", label: "Aucun" },
      { value: "Colab only", label: "Colab uniquement" },
      { value: "On-demand cloud GPU/TPU", label: "GPU/TPU cloud à la demande" },
      { value: "Dedicated GPU/TPU budget", label: "Budget GPU/TPU dédié" },
      { value: "Managed AI cluster", label: "Cluster IA managé" }
    ]
  },
  T6: {
    text: "Dans quelle mesure votre architecture technique et data est-elle documentée ?",
    choices: [
      { value: "None", label: "Aucune" },
      { value: "High-level diagrams", label: "Schémas sommaires" },
      { value: "Critical systems mapped", label: "Systèmes critiques cartographiés" },
      { value: "Comprehensive diagrams", label: "Diagrammes complets" },
      { value: "Auto-generated and maintained documentation", label: "Documentation auto-générée et maintenue" }
    ]
  },
  T7: {
    text: "Quel niveau de plan de reprise d'activité avez-vous pour vos données et IA ?",
    choices: [
      { value: "No plan", label: "Aucun plan" },
      { value: "Backups only", label: "Sauvegardes uniquement" },
      { value: "Manual failover", label: "Basculage manuel" },
      { value: "Automated failover", label: "Basculage automatisé" },
      { value: "AI-aware playbooks", label: "Playbook IA-aware" }
    ]
  },
  T8: {
    text: "Quels outils low-code ou no-code utilisez-vous pour l'automatisation ?",
    helper: "Sélectionnez tous les outils ou choisissez « Aucun »",
    choices: [
      { value: "None", label: "Aucun" },
      { value: "Zapier", label: "Zapier" },
      { value: "Make", label: "Make" },
      { value: "n8n", label: "n8n" },
      { value: "Power Automate", label: "Power Automate" },
      { value: "UiPath", label: "UiPath" },
      { value: "Workato", label: "Workato" },
      { value: "Airbyte", label: "Airbyte" },
      { value: "Fivetran", label: "Fivetran" },
      { value: "dbt", label: "dbt" }
    ]
  },

  // Automation & AI Agents (Section 5)
  A1: {
    text: "Quelles trois tâches bénéficieraient le plus de l'automatisation ?",
    helper: "Classez vos priorités",
    choices: [
      { value: "Reporting", label: "Reporting" },
      { value: "Scheduling", label: "Planification" },
      { value: "Data entry", label: "Saisie de données" },
      { value: "FAQ", label: "FAQ" },
      { value: "Ticket triage", label: "Tri des tickets" },
      { value: "Contract generation", label: "Génération de contrats" },
      { value: "Inventory management", label: "Gestion des stocks" },
      { value: "Compliance checks", label: "Vérifications de conformité" }
    ]
  },
  A2: {
    text: "Quel est le niveau de maturité de vos efforts d'automatisation ?",
    helper: "De l'absence d'automatisation à l'autonomie complète",
    choices: [
      { value: "0 – no automation", label: "0 – aucune automatisation" },
      { value: "1 – ad-hoc scripts", label: "1 – scripts ad hoc" },
      { value: "2 – basic tools with supervision", label: "2 – outils basiques avec supervision" },
      { value: "3 – integrated workflows", label: "3 – workflows intégrés" },
      { value: "4 – continuous automation", label: "4 – automatisation continue" },
      { value: "5 – fully autonomous processes", label: "5 – processus entièrement autonomes" }
    ]
  },
  A3: {
    text: "Quel est le statut actuel des agents IA dans vos opérations ?",
    helper: "Permet d'orienter la formation dédiée",
    choices: [
      { value: "No agents", label: "Aucun agent" },
      { value: "Prototype", label: "Prototype" },
      { value: "One agent in production", label: "Un agent en production" },
      { value: "Multiple agents in production", label: "Plusieurs agents en production" },
      { value: "Widespread deployment", label: "Déploiement généralisé" }
    ]
  },
  A4: {
    text: "Pour quelles tâches envisagez-vous une automatisation par agents IA ?",
    helper: "Sélectionnez tout ce qui s'applique",
    choices: [
      { value: "Customer support", label: "Support client" },
      { value: "Report generation", label: "Génération de rapports" },
      { value: "Email drafting", label: "Rédaction d'e-mails" },
      { value: "Lead scoring", label: "Scoring des prospects" },
      { value: "Meeting summaries", label: "Compte-rendu de réunions" },
      { value: "Market monitoring", label: "Veille marché" },
      { value: "Quality control", label: "Contrôle qualité" }
    ]
  },
  A5: {
    text: "Quel niveau d'autonomie souhaitez-vous pour vos agents IA ?",
    choices: [
      { value: "Suggestions only", label: "Suggestions uniquement" },
      { value: "Human approval required", label: "Approbation humaine requise" },
      { value: "Semi-automated", label: "Semi-automatisé" },
      { value: "Fully automated", label: "Entièrement automatisé" }
    ]
  },
  A6: {
    text: "Comment surveillez-vous et alertez-vous vos processus automatisés ?",
    choices: [
      { value: "No monitoring", label: "Pas de surveillance" },
      { value: "Manual checks", label: "Contrôles manuels" },
      { value: "KPI dashboards", label: "Tableaux de bord KPI" },
      { value: "Automated alerts", label: "Alertes automatisées" },
      { value: "Full observability and logging", label: "Observabilité et journalisation complètes" }
    ]
  },
  A7: {
    text: "Quels sont les principaux freins à l'automatisation et au déploiement d'agents IA ?",
    helper: "Sélectionnez tout ce qui s'applique",
    choices: [
      { value: "Data silos", label: "Silos de données" },
      { value: "Lack of technical resources", label: "Manque de ressources techniques" },
      { value: "Insufficient buy-in", label: "Adhésion insuffisante" },
      { value: "Compliance constraints", label: "Contraintes de conformité" },
      { value: "Uncertain ROI", label: "ROI incertain" },
      { value: "Limited budget", label: "Budget limité" },
      { value: "Integration complexity", label: "Complexité d'intégration" }
    ]
  },
  A8: {
    text: "Quelle interface préférez-vous pour interagir avec vos agents IA ?",
    helper: "Permet de personnaliser l'interface",
    choices: [
      { value: "Chatbot (Slack/Teams)", label: "Chatbot (Slack/Teams)" },
      { value: "Embedded widget", label: "Widget intégré" },
      { value: "Dashboard", label: "Tableau de bord" },
      { value: "Email assistant", label: "Assistant e-mail" },
      { value: "API/CLI", label: "API/CLI" },
      { value: "Voice assistant", label: "Assistant vocal" },
      { value: "Need guidance", label: "Besoin de conseils" }
    ]
  },
  A9: {
    text: "Quels processus de gouvernance appliquez-vous à vos agents IA ?",
    choices: [
      { value: "None", label: "Aucun" },
      { value: "Ad-hoc checks", label: "Vérifications ponctuelles" },
      { value: "Formal process", label: "Processus formel" },
      { value: "Logging with oversight", label: "Journalisation avec supervision" },
      { value: "Continuous audit", label: "Audit continu" }
    ]
  },
  A10: {
    text: "Quelle stratégie de reprise existe en cas d'échec des automatisations ou agents IA ?",
    choices: [
      { value: "No plan", label: "Aucun plan" },
      { value: "Manual rollback", label: "Rollback manuel" },
      { value: "Predefined fallback procedures", label: "Procédures de bascule prédéfinies" },
      { value: "Automated rollback", label: "Rollback automatisé" },
      { value: "Self-healing loops", label: "Boucles d'auto-réparation" }
    ]
  },
  A11: {
    text: "Comment suivez-vous la qualité des résultats de vos agents IA ?",
    choices: [
      { value: "No tracking", label: "Pas de suivi" },
      { value: "Manual spot checks", label: "Contrôles manuels ponctuels" },
      { value: "Pre-deployment testing", label: "Tests avant déploiement" },
      { value: "Continuous testing and spot checks", label: "Tests continus et contrôles ponctuels" },
      { value: "Continuous quality monitoring", label: "Surveillance qualité en continu" }
    ]
  },

  // Team Capability & Culture (Section 6)
  C1: {
    text: "À quelle fréquence utilisez-vous des outils IA au quotidien ?",
    choices: [
      { value: "Never", label: "Jamais" },
      { value: "Rarely", label: "Rarement" },
      { value: "Monthly", label: "Mensuel" },
      { value: "Weekly", label: "Hebdomadaire" },
      { value: "Daily", label: "Quotidien" }
    ]
  },
  C2: {
    text: "Quel est votre niveau de confiance pour ces compétences en rédaction de prompts ?",
    choices: [
      { value: "Basic prompt writing", label: "Rédaction de prompts basiques" },
      { value: "Using few-shot examples", label: "Utilisation d'exemples few-shot" },
      { value: "Structured prompt formatting", label: "Formatage de prompts structurés" },
      { value: "Prompt chain design", label: "Conception de chaînes de prompts" }
    ]
  },
  C3: {
    text: "Comment partagez-vous vos apprentissages IA en interne ?",
    choices: [
      { value: "No sharing", label: "Aucun partage" },
      { value: "Informal tips", label: "Astuces informelles" },
      { value: "Dedicated chat channel", label: "Canal de chat dédié" },
      { value: "Regular workshops", label: "Ateliers réguliers" },
      { value: "Active community of practice", label: "Communauté de pratique active" }
    ]
  },
  C3a: {
    text: "Quels sujets de formation IA priorisez-vous ? (Classez top 3)",
    choices: [
      { value: "Prompt engineering", label: "Ingénierie de prompt" },
      { value: "AI tool mastery", label: "Maîtrise des outils IA" },
      { value: "Data literacy", label: "Littératie des données" },
      { value: "Model fine-tuning", label: "Fine-tuning de modèles" },
      { value: "Retrieval-augmented generation", label: "Génération augmentée" },
      { value: "Agent orchestration", label: "Orchestration d'agents" },
      { value: "Ethics and governance", label: "Éthique et gouvernance" }
    ]
  },
  C4: {
    text: "Quel budget annuel par personne allouez-vous à la montée en compétence IA ?",
    choices: [
      { value: "€0", label: "0 €" },
      { value: "< €200", label: "< 200 €" },
      { value: "€200–500", label: "200–500 €" },
      { value: "€500–1,000", label: "500–1 000 €" },
      { value: "> €1,000", label: "> 1 000 €" }
    ]
  },
  C5: {
    text: "Combien d'heures par mois pouvez-vous consacrer à la formation IA ?",
    choices: [
      { value: "None", label: "Aucune" },
      { value: "< 1h", label: "< 1 h" },
      { value: "1–3h", label: "1–3 h" },
      { value: "3–5h", label: "3–5 h" },
      { value: "> 5h", label: "> 5 h" }
    ]
  },
  C6: {
    text: "Quel format de formation IA préférez-vous ?",
    choices: [
      { value: "Written guides", label: "Guides écrits" },
      { value: "Short videos", label: "Vidéos courtes" },
      { value: "Live workshops", label: "Ateliers en direct" },
      { value: "Self-paced courses", label: "Cours en autonomie" },
      { value: "Mixed formats", label: "Formats mixtes" }
    ]
  },
  C7: {
    text: "À quelle fréquence faites-vous appel à des experts IA externes ?",
    choices: [
      { value: "Never", label: "Jamais" },
      { value: "Ad-hoc advice", label: "Conseils ponctuels" },
      { value: "Regular sessions", label: "Séances régulières" },
      { value: "Expert network access", label: "Accès à un réseau d'experts" },
      { value: "Dedicated AI advisory board", label: "Comité conseil IA dédié" }
    ]
  },
  C8: {
    text: "Qu'est-ce qui freine vos pilotes de projets IA ?",
    choices: [
      { value: "Limited budget", label: "Budget limité" },
      { value: "Lack of skills", label: "Manque de compétences" },
      { value: "Data silos", label: "Silos de données" },
      { value: "Compliance constraints", label: "Contraintes de conformité" },
      { value: "Uncertain ROI", label: "ROI incertain" },
      { value: "Technical complexity", label: "Complexité technique" }
    ]
  },
  C9: {
    text: "Quel est votre degré d'ouverture aux pilotes IA ?",
    choices: [
      { value: "Resistant", label: "Résistant·e" },
      { value: "Cautious", label: "Prudent·e" },
      { value: "Interested", label: "Intéressé·e" },
      { value: "Proactive", label: "Proactif·ve" },
      { value: "Active pilots", label: "Pilotes actifs" }
    ]
  },
  C10: {
    text: "À quelle fréquence collaborez-vous inter-fonctions sur l'IA ?",
    choices: [
      { value: "Never", label: "Jamais" },
      { value: "Occasionally", label: "Occasionnellement" },
      { value: "Quarterly", label: "Trimestriellement" },
      { value: "Cross-functional squads", label: "En squads" },
      { value: "Embedded practice", label: "Pratique intégrée" }
    ]
  },
  C11: {
    text: "Vous sentez-vous en sécurité pour expérimenter et échouer avec l'IA ?",
    helper: "Petites erreurs (bugs, sorties erronées) : quel niveau de confort ?",
    choices: [
      { value: "Not comfortable at all", label: "Pas du tout à l'aise" },
      { value: "Slightly comfortable", label: "Peu à l'aise" },
      { value: "Moderately comfortable", label: "Modérément à l'aise" },
      { value: "Often comfortable", label: "Souvent à l'aise" },
      { value: "Always encouraged", label: "Toujours encouragé·e" }
    ]
  },

  // Governance, Risk & Ethics (Section 7)
  G1: {
    text: "Quel est le niveau de maturité de vos processus de gestion des risques et biais IA ?",
    choices: [
      { value: "No process", label: "Aucun processus" },
      { value: "Reactive fixes", label: "Corrections réactives" },
      { value: "Pre-deployment testing", label: "Tests avant déploiement" },
      { value: "Formal framework defined", label: "Cadre formel défini" },
      { value: "EU AI Act compliant", label: "Conforme au règlement IA UE" }
    ]
  },
  G2: {
    text: "Pouvez-vous expliquer et auditer les décisions de vos modèles IA ?",
    helper: "Traçabilité et journalisation pour audits",
    choices: [
      { value: "No logging or explanations", label: "Pas de journalisation ni d'explications" },
      { value: "High-risk models only", label: "Modèles à haut risque uniquement" },
      { value: "Audit logs", label: "Journaux d'audit" },
      { value: "Explanations for all models", label: "Explications pour tous les modèles" },
      { value: "Audit-ready (tooling and docs)", label: "Prêt pour audit (outils et docs)" }
    ]
  },
  G3: {
    text: "Dans quelle mesure êtes-vous transparent·e sur l'usage de l'IA auprès des parties prenantes ?",
    choices: [
      { value: "No communication", label: "Aucune communication" },
      { value: "Mentioned in policies", label: "Mention dans les politiques" },
      { value: "Published docs and FAQs", label: "Docs et FAQ publiés" },
      { value: "Explanation button", label: "Bouton d'explication" },
      { value: "Proactive dashboards", label: "Tableaux de bord proactifs" }
    ]
  },
  G4: {
    text: "Quel plan de réponse aux incidents IA appliquez-vous ?",
    choices: [
      { value: "No plan", label: "Aucun plan" },
      { value: "General IT plan", label: "Plan IT général" },
      { value: "Manual rollback", label: "Rollback manuel" },
      { value: "Automated rollback", label: "Rollback automatisé" },
      { value: "Comprehensive playbook", label: "Playbook complet" }
    ]
  },
  G5: {
    text: "Quel niveau de supervision humaine imposez-vous sur l'IA ?",
    choices: [
      { value: "None", label: "Aucune" },
      { value: "Final review", label: "Revue finale" },
      { value: "Random audits", label: "Vérifications aléatoires" },
      { value: "Human-in-the-loop", label: "Humain-dans-la-boucle" },
      { value: "Automated escalation", label: "Escalade automatique" }
    ]
  },
  G6: {
    text: "Quelle profondeur de confidentialité intégrez-vous dans vos process IA ?",
    choices: [
      { value: "Basic compliance", label: "Conformité basique" },
      { value: "Enhanced controls", label: "Contrôles renforcés" },
      { value: "Privacy technologies", label: "Technologies de confidentialité" },
      { value: "Privacy by design", label: "Par conception" },
      { value: "CI/CD privacy checks", label: "Vérifications CI/CD" }
    ]
  },
  G7: {
    text: "Quel est le statut des audits indépendants de vos systèmes IA ?",
    choices: [
      { value: "No audit", label: "Aucun audit" },
      { value: "Audit planned", label: "Audit planifié" },
      { value: "Audit underway", label: "Audit en cours" },
      { value: "Initial audit completed", label: "Audit initial terminé" },
      { value: "Continuous audit cycle", label: "Cycle d'audit continu" }
    ]
  },
  G8: {
    text: "Où en êtes-vous dans la cartographie des risques IA selon le règlement UE ?",
    helper: "Cartographie = registre des risques IA",
    choices: [
      { value: "Not aware", label: "Pas conscient·e" },
      { value: "Aware but not mapped", label: "Conscient·e mais non cartographié" },
      { value: "Mapping underway", label: "Cartographie en cours" },
      { value: "Registry completed", label: "Registre terminé" },
      { value: "Results shared", label: "Résultats partagés" }
    ]
  },
  G9: {
    text: "À quelle fréquence testez-vous l'équité de vos modèles IA ?",
    choices: [
      { value: "Never", label: "Jamais" },
      { value: "Post-incident only", label: "Ponctuellement après incidents" },
      { value: "Before each deployment", label: "Avant chaque déploiement" },
      { value: "Quarterly review", label: "Revue trimestrielle" },
      { value: "Continuous monitoring", label: "Surveillance continue" }
    ]
  },
  G10: {
    text: "Quel organe de gouvernance supervise l'éthique et la conformité IA ?",
    helper: "Comité, équipe conformité ou experts externes",
    choices: [
      { value: "None", label: "Aucun" },
      { value: "Ad-hoc advice", label: "Conseil occasionnel" },
      { value: "Project-by-project review", label: "Revue projet-par-projet" },
      { value: "Regular meetings", label: "Réunions régulières" },
      { value: "External experts", label: "Experts externes" }
    ]
  },

  // Implementation Horizon & Vision (Section 8)
  P1: {
    text: "Quand prévoyez-vous de déployer vos initiatives IA ?",
    helper: "Détermine l'urgence et le calendrier",
    choices: [
      { value: "Within 3 months", label: "D'ici 3 mois" },
      { value: "3–6 months", label: "3–6 mois" },
      { value: "6–12 months", label: "6–12 mois" },
      { value: "> 12 months", label: "> 12 mois" }
    ]
  },
  P2: {
    text: "Quel niveau de risque acceptez-vous pour vos projets IA ?",
    helper: "Tolérance au risque pour nouvelles expérimentations",
    choices: [
      { value: "Conservative – pilots first", label: "Conservateur – pilotes d'abord" },
      { value: "Cautious – small tests", label: "Prudent – petits tests" },
      { value: "Balanced – with oversight", label: "Équilibré – supervision" },
      { value: "Bold – broad experiments", label: "Audacieux – expérimentations larges" }
    ]
  },
  P3: {
    text: "Quels indicateurs de succès sont prioritaires pour votre IA ? (Max 3)",
    helper: "Nous adaptons la formation à ces objectifs",
    choices: [
      { value: "Return on investment", label: "Retour sur investissement" },
      { value: "Cost reduction", label: "Réduction des coûts" },
      { value: "Operational efficiency", label: "Efficacité opérationnelle" },
      { value: "Customer experience", label: "Expérience client" },
      { value: "Employee productivity", label: "Productivité employés" },
      { value: "Innovation", label: "Innovation" },
      { value: "Regulatory compliance", label: "Conformité réglementaire" },
      { value: "Sustainable impact", label: "Impact durable" }
    ]
  },
  P4: {
    text: "Quelle stratégie de ressources privilégiez-vous pour vos projets IA ?",
    helper: "Interne vs externe",
    choices: [
      { value: "Fully internal", label: "Entièrement interne" },
      { value: "Hybrid – internal and external", label: "Hybride – interne et externe" },
      { value: "Fully outsourced", label: "Entièrement externalisé" }
    ]
  },
  P5: {
    text: "Quelles architectures techniques préférez-vous pour l'IA ?",
    helper: "Guide les ateliers techniques",
    choices: [
      { value: "Cloud-native", label: "Cloud-native" },
      { value: "Hybrid/on-premise", label: "Hybride/on-premise" },
      { value: "API-first", label: "API-first" },
      { value: "Low-code/no-code", label: "Low-code/no-code" },
      { value: "Open source frameworks", label: "Frameworks open source" },
      { value: "Enterprise suites", label: "Suites d'entreprise" }
    ]
  },
  P6: {
    text: "Quel niveau de support externe attendez-vous pour l'IA ?",
    choices: [
      { value: "None", label: "Aucun" },
      { value: "Ad-hoc consulting", label: "Consulting ponctuel" },
      { value: "Ongoing advisory", label: "Conseil continu" },
      { value: "Managed services", label: "Services managés" },
      { value: "Full outsourcing", label: "Externalisation totale" }
    ]
  },
  P7: {
    text: "Quel changement organisationnel êtes-vous prêt·e à engager pour l'IA ?",
    helper: "Adapte la formation gestion du changement",
    choices: [
      { value: "Minimal changes", label: "Modifications minimales" },
      { value: "Minor adjustments", label: "Ajustements mineurs" },
      { value: "Moderate transformation", label: "Transformation modérée" },
      { value: "Major transformation", label: "Transformation majeure" },
      { value: "Continuous evolution", label: "Évolution continue" }
    ]
  },

  // Add-on questions
  T9: {
    text: "Comment déployez-vous et supervisez-vous vos modèles ML en production ?",
    helper: "Garantit fiabilité et détection rapide",
    choices: [
      { value: "No deployment", label: "Pas de déploiement" },
      { value: "Manual scripts", label: "Scripts manuels" },
      { value: "CI/CD pipeline", label: "Pipeline CI/CD" },
      { value: "MLOps platform (Kubeflow, MLflow)", label: "Plateforme MLOps (Kubeflow, MLflow)" },
      { value: "Automated blue/green deployment", label: "Déploiement blue/green automatisé" }
    ]
  },
  F8: {
    text: "Quels mécanismes utilisez-vous pour les transferts transfrontaliers de données ?",
    helper: "Le RGPD impose un encadrement légal",
    choices: [
      { value: "No transfers", label: "Pas de transfert" },
      { value: "Ad-hoc contracts", label: "Contrats ad hoc" },
      { value: "Standard contractual clauses", label: "Clauses contractuelles types" },
      { value: "Binding corporate rules", label: "Règles d'entreprise contraignantes" },
      { value: "Adequacy decision and ongoing monitoring", label: "Décision d'adéquation et suivi continu" }
    ]
  }
};
