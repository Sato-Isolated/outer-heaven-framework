# Roadmap du monorepo Outer Heaven Framework

## Vision produit

Outer Heaven Framework doit devenir une couche de design system tactique prête
à être consommée par des apps React et Next.js qui veulent une interface de
command center, dense, lisible et cohérente. Tailwind reste le moteur de layout
et de composition bas niveau. Le framework porte les tokens, les primitives,
les compositions, les règles de motion, les conventions d’accessibilité et la
documentation d’adoption.

Le monorepo doit servir trois usages en parallèle :
- construire un package réutilisable
- valider visuellement ce package via une démo crédible
- documenter un chemin d’adoption assez clair pour qu’une autre équipe puisse l’utiliser sans reverse-engineering

## État actuel du repo

Le repo dispose déjà :
- d’un socle de tokens et d’un thème tactique stable
- des primitives v1 historiques : `Shell`, `Panel`, `Button`, `Input`, `Select`, `Badge`, `Dialog`, `Toast`, `Dropzone`, `Divider`, `Kbd`
- d’une tranche v1.5 ajoutée : `Textarea`, `Checkbox`, `Switch`, `Tabs`, `Tooltip`
- d’une première bibliothèque de compositions réutilisables
- d’une démo structurée autour d’une landing page, d’un dashboard et d’un component deck
- d’une couverture de tests orientée contrat public

## Backlog par phases

### Phase 1 — Stabilisation de la tranche v1.5

- valider les APIs publiques des nouvelles primitives sur plusieurs cas d’usage réels
- ajouter les variantes manquantes si elles ne cassent pas le contrat existant
- durcir les tests clavier, overlay et data attributes
- vérifier la cohérence responsive et `prefers-reduced-motion`

### Phase 2 — Bibliothèque de compositions

- enrichir `CommandHeader`, `FilterStrip`, `StatGrid`, `ActivityFeed`, `MissionQueue`, `InspectorPanel`
- ajouter d’autres patterns à forte récurrence seulement après validation dans la démo
- éviter toute dérive vers une couche de pages figées ou trop prescriptive
- documenter les cas où une composition est préférable à une primitive brute

### Phase 3 — Documentation d’adoption

- écrire des exemples d’intégration dans plusieurs types d’écrans
- formaliser des guidelines d’usage : quand utiliser un ton, une densité, une composition
- ajouter une page de documentation “getting started” plus narrative
- faire du component deck une référence produit autant qu’un terrain de régression

### Phase 4 — Distribution et release

- définir une stratégie de versioning semver explicite
- préparer la publication du package avec changelog et notes de release
- vérifier l’ergonomie d’import depuis un projet consommateur externe
- documenter la politique de breaking changes pour les classes `od-*` et l’API React

## Composants existants et à venir

### Primitives actuelles

- `Shell`
- `Panel`
- `Button`
- `Input`
- `Select`
- `Textarea`
- `Checkbox`
- `Switch`
- `Tabs`
- `Tooltip`
- `Badge`
- `Dialog`
- `Toast`
- `Dropzone`
- `Divider`
- `Kbd`

### Compositions actuelles

- `CommandHero`
- `CommandHeader`
- `FilterStrip`
- `StatGrid`
- `ActivityFeed`
- `MissionQueue`
- `InspectorPanel`

### Candidats futurs

- `RadioGroup`
- `Progress`
- `CommandMenu`
- `DataTable` ou composition de grille dense
- `EmptyState`
- `SectionHeading`
- `FormSection`

Règle de sélection :
- ajouter une primitive seulement si le pattern est transversal, stable et difficile à exprimer proprement avec les briques existantes
- ajouter une composition seulement si plusieurs écrans répètent déjà le même agencement

## Stratégie de tests

- tests de contrat public pour chaque primitive : classes publiques, data attributes, états, accessibilité de base
- tests de focus et fermeture pour les overlays
- tests de navigation clavier pour tabs, switch et checkbox
- assertions structurelles sur les compositions pour éviter la dérive du DOM contractuel
- vérification continue via `pnpm test`, `pnpm build` et `pnpm lint`

À renforcer ensuite :
- tests visuels ou snapshots de rendu
- tests manuels documentés mobile / desktop
- audit régulier `prefers-reduced-motion`

## Stratégie de docs et d’adoption

- garder `README.md` comme point d’entrée monorepo
- garder `packages/framework/README.md` comme doc package courte et directement consommable
- utiliser le component deck comme documentation visuelle vivante
- référencer `MGS-TAILWIND-FRAMEWORK.md` comme blueprint historique, sans lui donner le rôle de doc produit principale

## Packaging, versioning et publication

- conserver `@outerhaven/framework` comme package unique tant que le scope reste compact
- publier seulement quand la surface publique React et CSS est jugée stable sur deux cycles de validation
- versionner les changements publics de primitives, compositions et classes `od-*`
- accompagner chaque release d’un changelog lisible côté consommateur

## Critères “release ready”

Le framework est prêt pour une première release publique quand :
- les primitives existantes ont un contrat clair et testé
- les nouvelles primitives v1.5 ont été validées dans la démo sans bricolage local
- les compositions principales couvrent au moins une landing page et un dashboard crédible
- la documentation d’import et d’usage est suffisante pour un consommateur externe
- `pnpm build`, `pnpm test` et `pnpm lint` passent proprement
- la démo reste cohérente sur desktop, mobile et reduced motion
