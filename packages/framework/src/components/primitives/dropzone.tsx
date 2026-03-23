import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";
import {
  semanticDataAttributes,
  type SemanticProps,
} from "../../lib/data-attrs";

export interface DropzoneProps
  extends HTMLAttributes<HTMLDivElement>,
    SemanticProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  hint?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  status?: ReactNode;
}

export const Dropzone = forwardRef<HTMLDivElement, DropzoneProps>(function Dropzone(
  {
    actions,
    children,
    className,
    density,
    description,
    eyebrow,
    hint,
    icon,
    size,
    state,
    status,
    title,
    tone,
    ...props
  },
  ref,
) {
  const hasStructuredContent = Boolean(
    eyebrow || title || description || hint || icon || actions || status,
  );

  return (
    <div
      ref={ref}
      className={cn("od-dropzone", className)}
      {...semanticDataAttributes({ tone, size, state, density })}
      {...props}
    >
      {hasStructuredContent ? (
        <div className="od-dropzone-content">
          <div className="od-dropzone-copy">
            {eyebrow ? <p className="u-mono-label">{eyebrow}</p> : null}
            {title ? <h3 className="od-dropzone-title">{title}</h3> : null}
            {description ? (
              <p className="od-dropzone-description">{description}</p>
            ) : null}
            {hint ? <p className="od-dropzone-hint">{hint}</p> : null}
          </div>
          {icon || status || actions ? (
            <div className="od-dropzone-side">
              {icon ? <div className="od-dropzone-icon">{icon}</div> : null}
              {status ? <div className="od-dropzone-status">{status}</div> : null}
              {actions ? (
                <div className="od-dropzone-actions">{actions}</div>
              ) : null}
            </div>
          ) : null}
          {children ? <div className="od-dropzone-body">{children}</div> : null}
        </div>
      ) : (
        children
      )}
    </div>
  );
});
