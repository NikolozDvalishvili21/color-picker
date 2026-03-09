export type WebsiteType =
  | "ecommerce"
  | "portfolio"
  | "saas"
  | "fintech"
  | "beauty"
  | "gaming";

export type Vibe =
  | "modern"
  | "minimal"
  | "luxury"
  | "playful"
  | "bold"
  | "calm";

export type ThemeMode = "light" | "dark";

export type PaletteInput = {
    baseColor: string;
    websiteType: WebsiteType;
    vibe: Vibe;
    theme: ThemeMode;
}