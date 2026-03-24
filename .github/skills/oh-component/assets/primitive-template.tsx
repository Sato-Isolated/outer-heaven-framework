/**
 * Outer Haven Framework — Primitive Component Template
 *
 * Usage: Copy this file, rename the component, and adjust.
 * Replace all occurrences of "Template" and "template" with your component name.
 */

import { type HTMLAttributes, forwardRef } from "react";

import {
	type SemanticProps,
	semanticDataAttributes,
} from "../../lib/data-attrs";
import { cn } from "../../lib/cn";

/* ─── types ──────────────────────────────────────────── */

export interface TemplateProps
	extends HTMLAttributes<HTMLDivElement>,
		SemanticProps {
	// Add component-specific props here
}

/* ─── component ──────────────────────────────────────── */

export const Template = forwardRef<HTMLDivElement, TemplateProps>(
	({ className, tone, size, state, density, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn("od-template", className)}
				{...semanticDataAttributes({ tone, size, state, density })}
				{...props}
			/>
		);
	},
);
Template.displayName = "Template";
