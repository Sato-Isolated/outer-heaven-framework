# Outer Heaven Framework

Monorepo `pnpm` contenant :
- `packages/framework` : le framework visuel et les primitives React
- `apps/demo` : la démo Next.js qui valide les primitives et compositions sur une landing page, un dashboard et un component deck

## Démarrage

```bash
pnpm install
pnpm dev
```

Vérification :

```bash
pnpm build
pnpm lint
pnpm test
```

## GitHub Pages

La démo Next.js peut être exportée pour GitHub Pages avec un `basePath`
de projet.

Build statique local pour Pages :

```bash
pnpm build:pages
```

Déploiement direct vers la branche `gh-pages` :

```bash
pnpm deploy:pages
```

Notes :
- le script pousse le contenu exporté de `apps/demo/out` vers `origin/gh-pages`
- la config suppose par défaut un dépôt `outerhavenframework`, donc une URL de site en `/<repo>`
- pour un autre nom de dépôt, définir `GITHUB_PAGES_REPO=<nom-du-repo>` avant le lancement du script
- côté GitHub, activer GitHub Pages sur la branche `gh-pages`

## Importer le framework

Import React :

```tsx
import {
  ActivityFeed,
  Button,
  Checkbox,
  CommandHeader,
  CommandHero,
  Dialog,
  FilterStrip,
  Input,
  InspectorPanel,
  MissionQueue,
  Select,
  Shell,
  StatGrid,
  Switch,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
  Textarea,
  ToastProvider,
  Tooltip,
  useToast,
} from "@outerhaven/framework";
```

Import CSS :

```tsx
import "@outerhaven/framework/styles.css";
```

## Contrat public

Primitives publiques v1 :
- `od-shell`
- `od-panel`
- `od-button`
- `od-input`
- `od-select`
- `od-textarea`
- `od-checkbox`
- `od-switch`
- `od-tabs`
- `od-tooltip`
- `od-badge`
- `od-dialog`
- `od-toast`
- `od-dropzone`
- `od-divider`
- `od-kbd`

Compositions exportées :
- `CommandHero`
- `CommandHeader`
- `FilterStrip`
- `StatGrid`
- `ActivityFeed`
- `MissionQueue`
- `InspectorPanel`

Attributs sémantiques partagés :
- `data-tone`
- `data-size`
- `data-state`
- `data-density`

Tons disponibles :
- `primary`
- `success`
- `warning`
- `danger`
- `muted`

## API React stable actuelle

`Button`
- Props stables : `tone`, `size`, `state`, `density`, `loading`
- Extensions stables pour v1 : `ghost`, `iconOnly`, `asChild`
- Convention : utiliser `Button` au lieu d’écrire `className="od-button"` dans l’app

`Input` / `Select` / `Textarea`
- Chrome commun : `prefix`, `insetLabel`, `hint`, `message`
- États : `default`, `warning`, `error`, `disabled`
- `Textarea` étend le même langage visuel au contenu multi-ligne

`Checkbox` / `Switch`
- API simple pour les contrôles booléens
- Support contrôlé ou non contrôlé selon le composant
- Focus visible explicite et états d’erreur lisibles

`Tabs`
- Ensemble léger : `Tabs`, `TabsList`, `TabsTrigger`, `TabsPanel`
- Vise les changements de contexte compacts, pas encore les patterns de navigation lourds

`Tooltip`
- Overlay léger, non modal
- Ouverture au hover/focus, fermeture au blur/mouse leave/`Escape`

`Dialog`
- Props clés : `open`, `onOpenChange`, `title`, `description`, `footer`
- Options de comportement : `closeOnBackdrop`, `closeOnEscape`, `initialFocusRef`

`ToastProvider` / `useToast`
- Envelopper l’application avec `ToastProvider`
- Utiliser `useToast().push(...)` pour créer un toast
- `toneToast(...)` fournit un helper minimal pour les toasts tonaux

## Accessibilité

- `Button` avec `iconOnly` doit toujours avoir un nom accessible via `aria-label`, `aria-labelledby` ou `title`
- `Dialog` maintient le focus dans l’overlay pendant l’ouverture et restaure le focus précédent à la fermeture
- `Tooltip` reste non modal et ne doit pas porter une information critique seule
- `prefers-reduced-motion` reste la règle de réduction de mouvement pour les animations non essentielles
- Les états `warning` / `error` ne doivent pas reposer uniquement sur la couleur : texte, bordure ou icône doivent rester lisibles

## Blueprint historique

Le document [MGS-TAILWIND-FRAMEWORK.md](C:/Users/ismys/Documents/GitHub/MGS-TAILWIND-FRAMEWORK.md)
reste le blueprint historique qui a cadré la direction initiale du projet.
Le repo courant et sa documentation sont désormais la source de vérité pour
l’implémentation actuelle.

## Exemple

```tsx
import Link from "next/link";
import {
  Button,
  CommandHeader,
  FilterStrip,
  Input,
  MissionQueue,
  Shell,
  ToastProvider,
} from "@outerhaven/framework";
import "@outerhaven/framework/styles.css";

export function Example() {
  return (
    <ToastProvider>
      <Shell tone="primary" state="active">
        <CommandHeader
          eyebrow="Workspace"
          title="Mission intake"
          description="A page can compose exported patterns without rebuilding its chrome."
          actions={
            <Button asChild tone="primary">
              <Link href="/dashboard">Open command deck</Link>
            </Button>
          }
        />
        <FilterStrip
          eyebrow="Filters"
          title="Search and narrow"
          description="Operational controls share one contract."
        >
          <Input
            aria-label="Mission query"
            insetLabel="Query"
            placeholder="Search payloads"
          />
        </FilterStrip>
        <MissionQueue
          title="Queue preview"
          items={[
            {
              name: "Archive-17.tar",
              detail: "Owner NEST-04",
              status: "Encrypted",
              tone: "success",
            },
          ]}
        />
      </Shell>
    </ToastProvider>
  );
}
```
