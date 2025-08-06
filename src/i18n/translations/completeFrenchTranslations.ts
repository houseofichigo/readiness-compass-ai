import { QuestionOption } from '@/types/assessment';

interface TranslationEntry {
  text?: string;
  helper?: string;
  purpose?: string;
  options?: QuestionOption[];
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
    options: [
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
    options: [
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
    options: [
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
    options: [
      { value: "1–9", label: "1–9" },
      { value: "10–49", label: "10–49" },
      { value: "50–249", label: "50–249" },
      { value: "250–999", label: "250–999" },
      { value: "≥ 1,000", label: "≥ 1 000" },
      { value: "Prefer not to say", label: "Préfère ne pas dire" }
    ]
  },
  M7_revenue: {
    text: "Quel est votre chiffre d'affaires annuel ?",
    options: [
      { value: "< €250k", label: "< 250 000 €" },
      { value: "€250k–1M", label: "250 000–1 M €" },
      { value: "€1–5M", label: "1–5 M €" },
      { value: "€5–20M", label: "5–20 M €" },
      { value: "€20–100M", label: "20–100 M €" },
      { value: "> €100M", label: "> 100 M €" },
      { value: "Prefer not to say", label: "Préfère ne pas dire" }
    ]
  },

  // Strategy & Use-Case Readiness (Section 1)
  S1: {
    text: "Combien de cas d'usage IA avez-vous identifiés pour mise en œuvre dans les 12 prochains mois ?",
    helper: "Définit votre maturité de planification et votre niveau de préparation",
    options: [
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
    options: [
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
    options: [
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
    options: [
      { value: "No ROI estimation", label: "Pas d'estimation de ROI" },
      { value: "Rough empirical estimates", label: "Estimations empiriques approximatives" },
      { value: "Simple cost-benefit analysis", label: "Analyse coût – bénéfice simplifiée" },
      { value: "ROI tied to clear KPIs", label: "ROI lié à des KPI clairs" },
      { value: "Financial or risk-adjusted models", label: "Modèles financiers ou ajustés au risque" }
    ]
  },
  S5: {
    text: "Quel est votre délai typique de l'idée à un impact IA mesurable ?",
    options: [
      { value: "12+ months", label: "Plus de 12 mois" },
      { value: "6–12 months", label: "6 – 12 mois" },
      { value: "3–6 months", label: "3 – 6 mois" },
      { value: "1–3 months", label: "1 – 3 mois" },
      { value: "< 30 days", label: "Moins de 30 jours" }
    ]
  },
  S6: {
    text: "Comment suivez-vous les avancées IA de vos concurrents et du secteur ?",
    options: [
      { value: "No tracking", label: "Non suivi" },
      { value: "Ad-hoc research", label: "Recherches ponctuelles" },
      { value: "Annual review", label: "Revue annuelle" },
      { value: "Quarterly reports", label: "Rapports trimestriels" },
      { value: "Continuous dashboard", label: "Tableau de bord continu" }
    ]
  },
  S7: {
    text: "Classez vos quatre principaux objectifs stratégiques pour les initiatives IA ?",
    options: [
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
    options: [
      { value: "No buy-in", label: "Pas d'adhésion" },
      { value: "Ad-hoc discussions", label: "Discussions ponctuelles" },
      { value: "Interest without action", label: "Intérêt sans action" },
      { value: "Budget approved", label: "Budget approuvé" },
      { value: "Active executive sponsorship", label: "Sponsoring exécutif actif" }
    ]
  },
  S9: {
    text: "Quelles équipes participent à la définition des cas d'usage IA ?",
    options: [
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
    options: [
      { value: "Not prepared", label: "Pas prête" },
      { value: "Ad-hoc preparation", label: "Préparation ad hoc" },
      { value: "Formal process for some projects", label: "Processus formel pour certains projets" },
      { value: "Organizational framework", label: "Cadre organisationnel" },
      { value: "Continuous improvement culture", label: "Culture d'amélioration continue" }
    ]
  },
  S11: {
    text: "Dans quelle mesure vos objectifs IA sont-ils assortis d'indicateurs clairs ?",
    options: [
      { value: "No clear goals", label: "Pas d'objectifs clairs" },
      { value: "Goals defined without metrics", label: "Objectifs définis sans indicateurs" },
      { value: "Some metrics tracked", label: "Quelques indicateurs suivis" },
      { value: "Most goals with metrics", label: "La plupart des objectifs avec indicateurs" },
      { value: "All goals with metrics and thresholds", label: "Tous les objectifs avec indicateurs et seuils" }
    ]
  },
  S12: {
    text: "Quelle est votre approche pour piloter et déployer vos projets IA ?",
    options: [
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
    options: [
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
    options: [
      { value: "< 3 months", label: "Moins de 3 mois" },
      { value: "3–6 months", label: "3 – 6 mois" },
      { value: "6–12 months", label: "6 – 12 mois" },
      { value: "12–24 months", label: "12 – 24 mois" },
      { value: "> 24 months", label: "> 24 mois" }
    ]
  },
  F4: {
    text: "Quel est le niveau de soutien de votre conseil ou de vos investisseurs pour l'IA ?",
    options: [
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
    options: [
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
    options: [
      { value: "None", label: "Aucun" },
      { value: "Exploratory discussions", label: "Discussions exploratoires" },
      { value: "One active partnership", label: "Un partenariat actif" },
      { value: "Multiple partnerships", label: "Plusieurs partenariats" },
      { value: "Ecosystem collaboration (R&D + vendors)", label: "Collaboration écosystème (R & D + fournisseurs)" }
    ]
  },
  F7: {
    text: "Quelle part de votre budget IA est consacrée à l'éthique et à la lutte contre les biais ?",
    options: [
      { value: "None", label: "Aucune" },
      { value: "Planned next year", label: "Prévue l'an prochain" },
      { value: "< 5%", label: "< 5 %" },
      { value: "5–15%", label: "5 – 15 %" },
      { value: "> 15%", label: "> 15 %" }
    ]
  }
};