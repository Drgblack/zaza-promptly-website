# 🚀 Quick Start - See Your Components in Action

## Step 1: Choose a Project

Pick any Zaza project from your workspace:
- `zaza-promptly-site`
- `zaza-homepage`
- `zaza-pricing-page`
- Or any other project

## Step 2: Add the Demo Page

In your chosen project, create a new page or modify an existing one:

```typescript
// app/demo/page.tsx (create this file)
import { DemoPage } from '@zaza/shared-components'

export default function DemoPageRoute() {
  return <DemoPage />
}
```

## Step 3: Run the Project

```bash
cd zaza-promptly-site  # or your chosen project
npm run dev
```

## Step 4: View the Demo

Open your browser and go to:
- `http://localhost:3000/demo` (if you created a demo page)
- Or whatever page you added the component to

## 🎯 What You'll See

The demo page includes:

1. **Free Resources Hub** - Downloadable templates and guides
2. **Productivity Calculator** - Interactive ROI calculator
3. **Testimonials Hub** - Video testimonials and case studies
4. **Blog Content Hub** - Educational articles and guides
5. **Pricing Optimizer** - Transparent pricing with trials

## 🔧 Alternative: View Individual Components

If you want to see just one component:

```typescript
// app/resources/page.tsx
import { FreeResourcesHub } from '@zaza/shared-components'

export default function ResourcesPage() {
  return <FreeResourcesHub />
}
```

## 📁 File Locations

All components are located in:
```
ZazaWebsites/shared-components/
├── resources/free-resources-hub.tsx
├── tools/productivity-calculator.tsx
├── social-proof/testimonials-hub.tsx
├── content/blog-hub.tsx
├── pricing/pricing-optimizer.tsx
└── demo/demo-page.tsx
```

## 🎨 Customization

Each component is fully customizable:

```typescript
// Customize colors, content, etc.
<FreeResourcesHub 
  primaryColor="#3B82F6"
  resources={yourCustomResources}
/>
```

## 🚀 Next Steps

Once you've seen the components:
1. **Choose which ones** you want to implement
2. **Follow the implementation guide** in `CONVERSION_OPTIMIZATION_GUIDE.md`
3. **Customize** for your specific needs
4. **Deploy** across your Zaza websites

---

**Need help?** Check the `CONVERSION_OPTIMIZATION_GUIDE.md` for detailed implementation instructions! 