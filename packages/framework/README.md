# @outerhaven/framework

## Imports

```tsx
import {
  Button,
  Dialog,
  Dropzone,
  Input,
  Select,
  ToastProvider,
  useToast,
} from "@outerhaven/framework";
import "@outerhaven/framework/styles.css";
```

## Notes

- `ghost`, `iconOnly`, and `asChild` are considered stable for `Button` in v1
- `iconOnly` requires an accessible name
- `Dialog` handles the focus trap and focus restoration
- `ToastProvider` handles explicit dismissal and pause on hover
