import { generatePalette } from "@/src/lib/color/generatePalette";

export default function Home() {
  return <div>
    <h1>Gargari Color Palette Generator</h1>
    <pre>{JSON.stringify(
      generatePalette({
        baseColor: "#3498db",
        websiteType: "saas",
        vibe: "modern",
        theme: "light",
      }),
      null,
      2,
    )}</pre>
  </div>;
}
