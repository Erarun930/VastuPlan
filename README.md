# VastuPlan — Google-first Web MVP

## What this version does
- Mobile-first Vastu house planning UI
- Plot size, road direction, terrain, slope, floors
- Bedrooms, bathrooms, kitchen, parking
- Conceptual 2D plan
- Vastu guidance
- Indicative material/masonry/labour/finishing estimate
- SEO title, description, keywords
- robots.txt and sitemap generation

## Important
The plan and cost calculations are illustrative. For a real construction product, add:
1. Supabase auth + project storage
2. Polygon/irregular plot editor
3. Drag/resize rooms
4. Multiple floors
5. Detailed BOQ and city-wise rates
6. Terrain contours, cut/fill, retaining wall and drainage calculations
7. 3D visualization
8. PDF/DWG export
9. Architect/engineer review workflow
10. Privacy policy, terms, consent and user data controls

## Deploy
1. Upload this folder to GitHub.
2. Import repository into Vercel.
3. Add environment variables from `.env.example` if/when Supabase is enabled.
4. Set `NEXT_PUBLIC_SITE_URL` to your real domain.
5. Deploy.
6. Add the domain in Google Search Console and submit `/sitemap.xml`.
7. Do not expect instant indexing; Google decides crawling/indexing.

## Supabase
`lib/supabase.js` is ready for the next stage. Never put a Supabase service-role key in browser code.
