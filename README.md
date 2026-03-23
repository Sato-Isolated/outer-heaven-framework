# Outer Heaven Framework

Monorepo `pnpm` contenant:
- `packages/framework`: le framework visuel et les primitives React
- `apps/demo`: la démo Next.js qui valide les primitives sur une landing page et un dashboard

## Démarrage

```bash
pnpm install
pnpm dev
```

Vérification:

```bash
pnpm build
pnpm lint
pnpm test
```

## Importer Le Framework

Import React:

```tsx
import {
  Button,
  Dialog,
  Dropzone,
  Input,
  Panel,
  Select,
  Shell,
  ToastProvider,
  useToast,
} from "@outerhaven/framework";
```

Import CSS:

```tsx
import "@outerhaven/framework/styles.css";
```

## Contrat Public

Primitives publiques v1:
- `od-shell`
- `od-panel`
- `od-button`
- `od-input`
- `od-select`
- `od-badge`
- `od-dialog`
- `od-toast`
- `od-dropzone`
- `od-divider`
- `od-kbd`

Attributs sémantiques partagés:
- `data-tone`
- `data-size`
- `data-state`
- `data-density`

Tones disponibles:
- `primary`
- `success`
- `warning`
- `danger`
- `muted`

## API React Stable Actuelle

`Button`
- Props stables: `tone`, `size`, `state`, `density`, `loading`
- Extensions stables pour v1: `ghost`, `iconOnly`, `asChild`
- Convention: utiliser `Button` au lieu d’écrire `className="od-button"` dans l’app

`Dialog`
- Props clés: `open`, `onOpenChange`, `title`, `description`, `footer`
- Options de comportement: `closeOnBackdrop`, `closeOnEscape`, `initialFocusRef`

`ToastProvider` / `useToast`
- Envelopper l’application avec `ToastProvider`
- Utiliser `useToast().push(...)` pour créer un toast
- `toneToast(...)` fournit un helper minimal pour les toasts tonaux

## Accessibilité

- `Button` avec `iconOnly` doit toujours avoir un nom accessible via `aria-label`, `aria-labelledby` ou `title`
- `Dialog` maintient le focus dans l’overlay pendant l’ouverture et restaure le focus précédent à la fermeture
- `prefers-reduced-motion` reste la règle de réduction de mouvement pour les animations non essentielles
- Les états `warning` / `error` ne doivent pas reposer uniquement sur la couleur: texte, bordure ou icône doivent rester lisibles

## Exemple

```tsx
import Link from "next/link";
import {
  Button,
  Input,
  Panel,
  Shell,
  ToastProvider,
} from "@outerhaven/framework";
import "@outerhaven/framework/styles.css";

export function Example() {
  return (
    <ToastProvider>
      <Shell tone="primary" state="active">
        <Panel tone="muted">
          <Input
            aria-label="Mission query"
            insetLabel="Query"
            placeholder="Search payloads"
          />
          <Button asChild tone="primary">
            <Link href="/dashboard">Open command deck</Link>
          </Button>
        </Panel>
      </Shell>
    </ToastProvider>
  );
}
```

