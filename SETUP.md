# دليل الإعداد والتشغيل

هذا الدليل يشرح كيفية إعداد وتشغيل موقع خالد عزالدين الشخصي على جهازك.

## المتطلبات الأساسية

قبل البدء، تأكد من تثبيت:

- **Node.js** (الإصدار 16 أو أحدث)
  - تحميل من: https://nodejs.org/
  - للتحقق من التثبيت: `node --version`

- **Git** (اختياري لكن موصى به)
  - تحميل من: https://git-scm.com/
  - للتحقق من التثبيت: `git --version`

## خطوات الإعداد

### الخطوة 1: استنساخ المشروع

```bash
# باستخدام Git
git clone https://github.com/yourusername/khaled-portfolio.git
cd khaled-portfolio

# أو تحميل الملفات مباشرة
# ثم فك الضغط والدخول إلى المجلد
cd khaled-portfolio
```

### الخطوة 2: تثبيت المتطلبات

اختر أحد الخيارات التالية:

**باستخدام npm (الخيار الافتراضي):**
```bash
npm install
```

**باستخدام pnpm (أسرع وأخف):**
```bash
npm install -g pnpm  # تثبيت pnpm مرة واحدة
pnpm install
```

**باستخدام yarn:**
```bash
npm install -g yarn  # تثبيت yarn مرة واحدة
yarn install
```

### الخطوة 3: تشغيل خادم التطوير

```bash
# باستخدام npm
npm run dev

# أو باستخدام pnpm
pnpm dev

# أو باستخدام yarn
yarn dev
```

**النتيجة المتوقعة:**
```
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

افتح المتصفح على `http://localhost:5173` لرؤية الموقع.

### الخطوة 4: التطوير والتعديل

الآن يمكنك تعديل الملفات والموقع سيتحدث تلقائياً:

- **تعديل المحتوى**: `client/src/pages/Home.tsx`
- **تعديل الأنماط**: `client/src/index.css`
- **إضافة مكونات**: `client/src/components/`

## بناء النسخة الإنتاجية

عندما تكون جاهزاً للنشر:

```bash
# بناء الملفات المُحسّنة
npm run build

# اختبار النسخة المبنية محلياً
npm run preview
```

سيتم إنشاء مجلد `dist/` يحتوي على ملفات الموقع الجاهزة للنشر.

## تخصيص المشروع

### تغيير معلومات الملف الشخصي

افتح `client/src/pages/Home.tsx` وعدّل:

```typescript
// غيّر البيانات الشخصية
const name = "خالد عزالدين";  // اسمك
const email = "khaled@example.com";  // بريدك
const phone = "+966501234567";  // رقم هاتفك
```

### إضافة مشاريع جديدة

في نفس الملف، جد قائمة `projects` وأضف مشروعك:

```typescript
{
  title: "اسم المشروع",
  description: "وصف المشروع",
  technologies: ["React", "TypeScript"],
  link: "رابط المشروع",
}
```

### تغيير الألوان

عدّل الألوان في `client/src/index.css`:

```css
:root {
  --primary: #1e40af;  /* اللون الأزرق الرئيسي */
  --accent: #06b6d4;   /* لون التأكيد */
}
```

### إضافة صور مخصصة

1. احفظ صورك في مجلد `client/public/images/`
2. استخدمها في الكود:
```tsx
<img src="/images/your-image.png" alt="وصف الصورة" />
```

## استكشاف الأخطاء

### المشكلة: "npm: command not found"

**الحل:** تثبيت Node.js من https://nodejs.org/

### المشكلة: "Port 5173 is already in use"

**الحل:** استخدم منفذ مختلف:
```bash
npm run dev -- --port 3000
```

### المشكلة: الموقع لا يعرض الصور

**الحل:** تأكد من المسارات:
- الصور يجب أن تكون في `client/public/`
- استخدم المسار: `/images/filename.png`

### المشكلة: الأنماط لا تظهر بشكل صحيح

**الحل:** امسح ذاكرة التخزين المؤقتة:
```bash
# توقف الخادم (Ctrl+C)
# ثم احذف مجلد node_modules والملفات المؤقتة
rm -rf node_modules dist .vite

# أعد التثبيت
npm install

# شغّل الخادم مرة أخرى
npm run dev
```

## نشر الموقع

### خيار 1: Vercel (موصى به)

1. أنشئ حساب على https://vercel.com
2. ربط مستودع GitHub
3. اضغط "Deploy"

### خيار 2: Netlify

1. أنشئ حساب على https://netlify.com
2. اربط مستودع GitHub
3. اضغط "Deploy site"

### خيار 3: GitHub Pages

```bash
# تعديل vite.config.ts
# أضف: base: '/khaled-portfolio/'

# بناء الموقع
npm run build

# نشر على gh-pages
npm install -g gh-pages
gh-pages -d dist
```

## الأوامر المتاحة

| الأمر | الوصف |
|------|-------|
| `npm run dev` | تشغيل خادم التطوير |
| `npm run build` | بناء النسخة الإنتاجية |
| `npm run preview` | معاينة النسخة المبنية |
| `npm run check` | فحص الأنواع (TypeScript) |
| `npm run format` | تنسيق الكود |

## البنية الأساسية للمشروع

```
khaled-portfolio/
├── client/
│   ├── public/              # ملفات ثابتة
│   │   └── images/          # صورك الشخصية
│   ├── src/
│   │   ├── components/      # مكونات React
│   │   │   ├── Header.tsx   # رأس الصفحة
│   │   │   ├── Footer.tsx   # تذييل الصفحة
│   │   │   └── ui/          # مكونات shadcn/ui
│   │   ├── pages/
│   │   │   └── Home.tsx     # الصفحة الرئيسية
│   │   ├── App.tsx          # المكون الرئيسي
│   │   ├── main.tsx         # نقطة الدخول
│   │   └── index.css        # الأنماط العامة
│   └── index.html           # ملف HTML الرئيسي
├── package.json             # ملف المتطلبات
├── README.md               # التوثيق الرئيسي
└── SETUP.md                # هذا الملف
```

## نصائح مفيدة

1. **استخدم Git**: احفظ تغييراتك بانتظام
   ```bash
   git add .
   git commit -m "وصف التغييرات"
   ```

2. **اختبر على أجهزة مختلفة**: استخدم أدوات DevTools في المتصفح

3. **حافظ على الكود نظيفاً**: استخدم `npm run format`

4. **راقب الأخطاء**: افتح console المتصفح (F12) للتحقق من الأخطاء

## الدعم والمساعدة

- **المستندات الرسمية**: 
  - React: https://react.dev
  - Tailwind CSS: https://tailwindcss.com
  - Vite: https://vitejs.dev

- **المجتمع**:
  - Stack Overflow
  - GitHub Discussions

## الخطوات التالية

بعد إعداد الموقع:

1. ✅ تخصيص المحتوى بمعلوماتك الشخصية
2. ✅ إضافة صورتك الشخصية
3. ✅ تحديث معلومات التواصل
4. ✅ إضافة مشاريعك الخاصة
5. ✅ اختبار الموقع على أجهزة مختلفة
6. ✅ نشر الموقع على الإنترنت

---

**استمتع ببناء موقعك الشخصي! 🚀**
