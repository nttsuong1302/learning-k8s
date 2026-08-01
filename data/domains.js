// Domaines CKA (pondération officielle) + registre global des questions.
window.CKA = window.CKA || {};
window.CKA.questions = window.CKA.questions || [];

window.CKA.domains = [
  { id: "architecture", short: "Architecture", name: "Cluster Architecture, Installation & Configuration", weight: 25, icon: "🏗️", color: "#3b82f6" },
  { id: "workloads", short: "Workloads", name: "Workloads & Scheduling", weight: 15, icon: "📦", color: "#8b5cf6" },
  { id: "networking", short: "Networking", name: "Services & Networking", weight: 20, icon: "🌐", color: "#10b981" },
  { id: "storage", short: "Storage", name: "Storage", weight: 10, icon: "💾", color: "#f59e0b" },
  { id: "troubleshooting", short: "Troubleshooting", name: "Troubleshooting", weight: 30, icon: "🩺", color: "#ef4444" },
];
