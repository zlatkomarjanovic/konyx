import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Code2,
  FileText,
  PenTool,
  Globe,
  Headphones,
  Infinity,
  Layers,
  LayoutTemplate,
  MessageSquare,
  Palette,
  RefreshCw,
  Shield,
  Sparkles,
  TerminalSquare,
  Zap,
} from "lucide-react";

export type PricingPlan = {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  price: number | "Custom";
  priceSuffix: string;
  highlighted: boolean;
  badge?: string;
  features: { icon: LucideIcon; label: string }[];
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "single-page",
    name: "Single page",
    icon: Zap,
    description: "One polished landing page with the full reskin kit included.",
    price: 79,
    priceSuffix: "one-time",
    highlighted: false,
    features: [
      { icon: FileText, label: "One landing page template" },
      { icon: LayoutTemplate, label: "Hero, features, pricing, and FAQ sections" },
      { icon: TerminalSquare, label: ".cursor/rules included" },
      { icon: MessageSquare, label: "Reskin prompt kit" },
      { icon: Palette, label: "Typography and color token system" },
      { icon: Code2, label: "Next.js + Tailwind source" },
      { icon: Globe, label: "SEO-ready metadata and structure" },
      { icon: Shield, label: "Commercial license for one client" },
      { icon: RefreshCw, label: "Lifetime updates for this template" },
    ],
  },
  {
    id: "full-site",
    name: "Full site",
    icon: Sparkles,
    description: "Complete multi-page template for product sites, studios, and local businesses.",
    price: 149,
    priceSuffix: "one-time",
    highlighted: true,
    badge: "Most popular",
    features: [
      { icon: Layers, label: "Full multi-page template" },
      { icon: LayoutTemplate, label: "Home, about, services, pricing, and contact pages" },
      { icon: TerminalSquare, label: ".cursor/rules included" },
      { icon: MessageSquare, label: "Reskin prompt kit" },
      { icon: Palette, label: "Typography and color token system" },
      { icon: PenTool, label: "Optional layout reference file" },
      { icon: Code2, label: "Next.js + Tailwind source" },
      { icon: Globe, label: "SEO-ready metadata and structure" },
      { icon: Shield, label: "Commercial license for one client" },
      { icon: Headphones, label: "Priority email support" },
      { icon: RefreshCw, label: "All future page patterns included" },
    ],
  },
  {
    id: "agency",
    name: "Agency license",
    icon: Building2,
    description: "Unlimited client projects across every template in the store.",
    price: 399,
    priceSuffix: "one-time",
    highlighted: false,
    features: [
      { icon: Infinity, label: "Unlimited client projects" },
      { icon: Layers, label: "All current and future templates" },
      { icon: LayoutTemplate, label: "Every page pattern in the store" },
      { icon: TerminalSquare, label: ".cursor/rules included" },
      { icon: MessageSquare, label: "Reskin prompt kit" },
      { icon: Palette, label: "Typography and color token system" },
      { icon: PenTool, label: "Layout reference files included" },
      { icon: Code2, label: "Next.js + Tailwind source" },
      { icon: Shield, label: "White-label friendly license" },
      { icon: Headphones, label: "Priority email support" },
      { icon: RefreshCw, label: "Lifetime updates across the catalog" },
      { icon: Sparkles, label: "Early access to new releases" },
    ],
  },
];
