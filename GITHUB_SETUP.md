# دليل رفع المشروع على GitHub

هذا الدليل يشرح كيفية رفع موقعك الشخصي على GitHub ليصبح متاحاً للجميع.

## المتطلبات

- حساب GitHub (مجاني)
- Git مثبت على جهازك
- المشروع جاهز محلياً

## خطوات الرفع

### الخطوة 1: إنشاء مستودع جديد على GitHub

1. اذهب إلى https://github.com/new
2. أدخل اسم المستودع: `khaled-portfolio`
3. أضف وصف: "موقع شخصي احترافي لخالد عزالدين"
4. اختر "Public" لجعل المستودع متاحاً للجميع
5. اضغط "Create repository"

### الخطوة 2: ربط المستودع المحلي بـ GitHub

في سطر الأوامر، انسخ الأوامر من GitHub وشغّلها:

```bash
# أضف المستودع البعيد
git remote add origin https://github.com/yourusername/khaled-portfolio.git

# غيّر اسم الفرع الرئيسي إلى main (إذا لم يكن بالفعل)
git branch -M main

# ادفع الملفات إلى GitHub
git push -u origin main
```

**ملاحظة:** استبدل `yourusername` باسم مستخدمك على GitHub

### الخطوة 3: التحقق من الرفع

1. اذهب إلى `https://github.com/yourusername/khaled-portfolio`
2. تأكد من ظهور جميع الملفات
3. تحقق من ظهور README.md بشكل صحيح

## نشر الموقع مباشرة

### خيار 1: Vercel (الأفضل والأسرع)

**الخطوة 1: إنشاء حساب**
- اذهب إلى https://vercel.com
- اضغط "Sign Up" واختر "GitHub"
- وافق على الأذونات

**الخطوة 2: استيراد المشروع**
- اضغط "New Project"
- اختر مستودع `khaled-portfolio`
- اضغط "Import"

**الخطوة 3: التكوين**
- Framework: اختر "React"
- Build Command: `npm run build` (افتراضي)
- اضغط "Deploy"

**النتيجة:**
- سيحصل موقعك على رابط مثل: `https://khaled-portfolio.vercel.app`
- يتم التحديث تلقائياً عند كل push إلى GitHub

### خيار 2: Netlify

**الخطوة 1: إنشاء حساب**
- اذهب إلى https://netlify.com
- اضغط "Sign up" واختر "GitHub"

**الخطوة 2: ربط المستودع**
- اضغط "New site from Git"
- اختر GitHub
- اختر مستودع `khaled-portfolio`

**الخطوة 3: التكوين**
- Build command: `npm run build`
- Publish directory: `dist`
- اضغط "Deploy site"

### خيار 3: GitHub Pages

**الخطوة 1: تفعيل GitHub Pages**
1. اذهب إلى Settings في مستودعك
2. انقر على "Pages" من الجانب الأيسر
3. اختر "GitHub Actions" من "Source"

**الخطوة 2: إنشاء ملف GitHub Actions**

أنشئ ملف `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**الخطوة 3: الدفع**
```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deployment workflow"
git push
```

موقعك سيكون متاحاً على: `https://yourusername.github.io/khaled-portfolio`

## إضافة نطاق مخصص (اختياري)

### مع Vercel

1. اذهب إلى إعدادات المشروع
2. انقر على "Domains"
3. أضف نطاقك المخصص
4. اتبع التعليمات لتحديث DNS

### مع Netlify

1. اذهب إلى "Site settings"
2. انقر على "Domain management"
3. أضف نطاقك المخصص
4. حدّث إعدادات DNS لديك

## الحفاظ على التحديثات

بعد النشر، يمكنك الاستمرار في التطوير:

```bash
# عمل تغييرات محلياً
# تعديل الملفات...

# حفظ التغييرات
git add .
git commit -m "وصف التغييرات"

# دفع التغييرات إلى GitHub
git push

# سيتم التحديث تلقائياً على الموقع المنشور
```

## استكشاف الأخطاء

### المشكلة: "fatal: remote origin already exists"

```bash
# احذف الـ remote القديم
git remote remove origin

# أضفه مرة أخرى
git remote add origin https://github.com/yourusername/khaled-portfolio.git
```

### المشكلة: "Permission denied (publickey)"

```bash
# أنشئ مفتاح SSH
ssh-keygen -t ed25519 -C "your_email@example.com"

# أضفه إلى GitHub
# Settings → SSH and GPG keys → New SSH key
```

### المشكلة: الموقع المنشور لا يعرض الصور

تأكد من:
- استخدام المسارات النسبية للصور
- الصور موجودة في `client/public/`
- لا توجد أخطاء في console المتصفح

## نصائح مفيدة

1. **استخدم .gitignore**: تأكد من عدم رفع `node_modules` و `dist`

2. **اكتب رسائل commit جيدة**:
   ```bash
   git commit -m "إضافة قسم المشاريع"  # جيد
   git commit -m "update"               # سيء
   ```

3. **استخدم branches للميزات الجديدة**:
   ```bash
   git checkout -b feature/new-section
   # عمل التغييرات...
   git push origin feature/new-section
   # ثم اعمل Pull Request على GitHub
   ```

4. **راقب الأداء**: استخدم أدوات مثل:
   - Google PageSpeed Insights
   - GTmetrix
   - WebPageTest

## الخطوات التالية

بعد النشر:

1. ✅ اختبر الموقع على الإنترنت
2. ✅ شارك الرابط مع الأصدقاء والعائلة
3. ✅ أضف الموقع إلى سيرتك الذاتية
4. ✅ استمر في تحديث المحتوى
5. ✅ راقب الأداء والأخطاء

## الموارد المفيدة

- [GitHub Docs](https://docs.github.com)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Git Documentation](https://git-scm.com/doc)

---

**موقعك الشخصي الآن متاح على الإنترنت! 🎉**
