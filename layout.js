import "./globals.css";
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "VastuPlan — Vastu House Plan & Construction Estimate",
  description: "Create a conceptual Vastu-oriented house plan for different plot sizes and terrain conditions with an indicative construction, material and labour estimate.",
  keywords: ["Vastu house plan","house plan","home construction estimate","plot planner","terrain house plan","Vastu map","house budget calculator"],
  alternates:{canonical:"/"},
  openGraph:{title:"VastuPlan",description:"Vastu + terrain-aware house planning and construction estimate",type:"website"}
};
export default function RootLayout({children}) {
 return <html lang="en"><body>{children}</body></html>
}