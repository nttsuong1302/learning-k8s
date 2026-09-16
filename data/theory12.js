// Lot 12 : questions théoriques sourcées sur kubernetes.io (scan de la doc).
// Chaque question porte why[] par option, explain (synthèse) et ref (doc officielle),
// plus la traduction en:{q,choices}.
(function () {
  const Q = window.CKA.questions;
  const DATA = [
{
  "id": "t12-a1",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Le kube-apiserver expose l'API Kubernetes en HTTPS. Parmi les méthodes suivantes, lesquelles sont des méthodes d'authentification qu'il prend en charge ?",
  "choices": [
    "Certificats client X.509 (authentification mutuelle TLS)",
    "Bearer tokens (tokens de ServiceAccount, OpenID Connect, bootstrap tokens, authentification par webhook token…)",
    "Authentification par adresse IP source autorisée",
    "Authentification HTTP Basic (identifiant / mot de passe)"
  ],
  "correct": [
    0,
    1
  ],
  "why": [
    "Vrai : les certificats client X.509 (authentification mutuelle TLS) figurent parmi les méthodes d'authentification documentées de kube-apiserver.",
    "Vrai : la doc regroupe plusieurs mécanismes sous « bearer tokens » — tokens de ServiceAccount, tokens OpenID Connect, bootstrap tokens et authentification par webhook token — tous envoyés via l'en-tête `Authorization: Bearer <token>`.",
    "Faux : l'adresse IP source n'est pas une méthode d'authentification documentée pour l'API server ; le filtrage réseau (pare-feu, règles cloud) est un mécanisme distinct, en dehors de l'authentification Kubernetes.",
    "Faux : l'authentification HTTP Basic (identifiant/mot de passe) ne fait pas partie des méthodes d'authentification actuellement documentées pour kube-apiserver."
  ],
  "explain": "kube-apiserver authentifie chaque requête HTTPS via une chaîne de plugins d'authentification, en s'appuyant sur des certificats client, des bearer tokens, ou un reverse proxy authentifiant. Les méthodes officiellement documentées sont : certificats client X.509, bootstrap tokens, tokens de ServiceAccount, fichier de tokens statiques, et des intégrations externes (JSON Web Tokens, OpenID Connect, authentification par webhook token, reverse proxy authentifiant). Une requête peut être testée successivement par plusieurs plugins jusqu'à ce que l'un d'eux l'authentifie ; en l'absence de succès, elle est rejetée en 401.",
  "ref": "https://kubernetes.io/docs/reference/access-authn-authz/authentication/",
  "en": {
    "q": "kube-apiserver exposes the Kubernetes API over HTTPS. Which of the following are authentication methods it supports?",
    "choices": [
      "X.509 client certificates (mutual TLS)",
      "Bearer tokens (ServiceAccount tokens, OpenID Connect, bootstrap tokens, webhook token authentication…)",
      "Authentication by allowed source IP address",
      "HTTP Basic authentication (username / password)"
    ]
  }
}
  ];
  DATA.forEach((o) => Q.push(Object.assign({ type: "theory" }, o)));
  window.CKA._t12 = DATA.length;
})();
