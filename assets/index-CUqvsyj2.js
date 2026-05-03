const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Dashboard-wnFD7Zuh.js","assets/i18n-DHnzMtDv.js","assets/EntryItem-CJXhLgk-.js","assets/format-DKCwpWCP.js","assets/CategoryIcon-DOoY_6L-.js","assets/trash-2-CI6CHsKG.js","assets/react-vendor-ByMXOXG8.js","assets/firebase-MQBIVSCz.js","assets/Entries-D6TuWRcG.js","assets/Breakeven-Db7XIW4t.js","assets/PremiumGate-DEt5oj7-.js","assets/Insights-SfVg4Cft.js","assets/Settings-B-Yi8juX.js","assets/ImportCSV-B-0BvpCm.js","assets/Accounts-De-DDpOI.js","assets/BudgiBot-BYzMB_MI.js"])))=>i.map(i=>d[i]);
import{r as l,i as pn,a as gn,u as G}from"./i18n-DHnzMtDv.js";import{r as me}from"./react-vendor-ByMXOXG8.js";import{r as xe,_ as we,C as ke,a as Fe,E as kt,o as We,F as fn,d as Ie,v as yn,i as bn,b as vn,g as St,c as xn,e as wn,f as kn,h as Sn,p as jn,G as jt,j as ee,k,u as se,l as Ue,m as ae,q as Se,n as Cn,w as he,s as He,t as Y,x as Ct,y as En,z as et,A as ge,B as Et,D as Nn,H as In,I as Nt,J as An,K as Re,L as Tn,M as Dn,N as Pn,O as _n}from"./firebase-MQBIVSCz.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();var It={exports:{}},Ce={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Mn=l,Ln=Symbol.for("react.element"),On=Symbol.for("react.fragment"),Rn=Object.prototype.hasOwnProperty,Bn=Mn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,$n={key:!0,ref:!0,__self:!0,__source:!0};function At(e,t,n){var a,s={},r=null,c=null;n!==void 0&&(r=""+n),t.key!==void 0&&(r=""+t.key),t.ref!==void 0&&(c=t.ref);for(a in t)Rn.call(t,a)&&!$n.hasOwnProperty(a)&&(s[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps,t)s[a]===void 0&&(s[a]=t[a]);return{$$typeof:Ln,type:e,key:r,ref:c,props:s,_owner:Bn.current}}Ce.Fragment=On;Ce.jsx=At;Ce.jsxs=At;It.exports=Ce;var o=It.exports,Tt,tt=me;Tt=tt.createRoot,tt.hydrateRoot;const Fn={dashboard:"Home",entries:"Entries",breakeven:"Break-Even",insights:"Insights",import:"Import",settings:"Settings"},Wn=["January","February","March","April","May","June","July","August","September","October","November","December"],Un={housing:"Housing",food:"Groceries",transport:"Transport",kids:"Kids",health:"Health",education:"Education",clothing:"Clothing",coffee:"Coffee",dining:"Dining Out",leisure:"Leisure",sport:"Sport",telecom:"Telecom",travel:"Travel",shopping:"Shopping",insurance:"Insurance",pets:"Pets",savings:"Savings",cosmetics:"Cosmetics & Care",home_maintenance:"Home Maintenance",income:"Income",other:"Other"},Hn={tagline:`Your family's finances,
clear and under control.`,taglineSub:"Track every shekel. Plan together. Spend smarter.",signInGoogle:"Continue with Google",signInManual:"Sign in with username",orDivider:"or",usernameLabel:"Username",usernamePlaceholder:"Choose a username",displayNameLabel:"Full name",displayNamePlaceholder:"Your name (shown in the app)",emailLabel:"Email address",emailPlaceholder:"For account recovery only",passwordLabel:"Password",passwordConfirmLabel:"Confirm password",createAccount:"Create account",signInBtn:"Sign in",switchToCreate:"No account yet? Create one",switchToSignIn:"Already have an account? Sign in",hint:"Your data is stored securely in the cloud — accessible from any device",errorGeneric:"Sign-in error: ",errorDomain:"Domain not authorized in Firebase. Add it under Authentication → Authorized Domains",errorPasswordMatch:"Passwords don't match",errorWeakPassword:"Password must be at least 6 characters",errorUsernameTaken:"This username is already taken",errorUsernameNotFound:"Username not found",errorWrongPassword:"Incorrect password",errorUsernameChars:"2–20 characters: letters, numbers, or underscore",errorDisplayName:"Name must be at least 2 characters",errorEmailFormat:"Please enter a valid email address",strengthVeryWeak:"Very weak",strengthWeak:"Weak",strengthFair:"Fair — add symbols or uppercase",strengthGood:"Good",strengthStrong:"Strong ✓",backToOptions:"All sign-in options",feature1:"Track income & expenses in seconds",feature2:"Shared household — both partners always in sync",feature3:"Break-even calculator & spending insights",footer:"Free · Private · No ads · Built for real families"},zn={welcome:"Welcome to BUDGI",chooseDesc:"Create a new shared home or join an existing one with your partner's invite code",create:"✦ Create new home",creating:"Creating...",or:"— or —",join:"Join existing home",created:"Home created!",createdDesc:"Send the invite code to your partner so they can join",inviteLabel:"Your invite code",inviteHint:'They open the app and choose "Join existing home"',autoLogin:"Login will start automatically",joinTitle:"Join existing home",joinDesc:"Ask your partner for their invite code",joinPlaceholder:"Enter code (e.g. ABC123)",joinBtn:"Join",joining:"Joining...",back:"Back",errorCreate:"Error creating home: ",errorJoin:"Error joining",errorJoinPremium:"Joining a shared home requires an active Premium subscription from the home creator"},Kn={switchUser:"Switch account",signOut:"Sign out"},Vn={balance:"Balance",income:"Income",expenses:"Expenses",incomeUtil:"Income utilization",budgetUtil:"Budget utilization",vsLastMonth:"vs last month",fixed:"Fixed",variable:"Variable",savingsLabel:"Savings",incomeLabel:"Income",savingsGoal:"Savings goal",byCategory:"By category",recent:"Recent",addEntry:"Add entry",overBudget:"Over budget in {{count}} categories",errorAdd:"Error adding: ",donutExpenses:"Expenses",donutByCategory:"by category",suggestedMsg:"{{count}} fixed expenses not entered this month",suggestedAvg:"avg",suggestedAdd:"+ Add",noEntries:"No entries for this month yet",noEntriesHint:"Tap + to add",kikiPromoTitle:"Add expenses on WhatsApp in seconds",kikiPromoSub:"Message Budgi Bot — it records everything automatically",kikiPromoBtn:"Upgrade",trialEndingSoon:"Your trial ends in {{days}} days",trialEndingHint:"Keep access to Budgi Bot, household sharing & all advanced tools",trialUpgradeBtn:"Upgrade now"},Gn={fixed:"Fixed",bimonthly:"Bimonthly",variable:"Variable",sep:"Sep+"},qn={title:"All entries",empty:"No entries for this month",filterAll:"All",filterExpense:"Expenses",filterIncome:"Income",filterSaving:"Savings"},Yn={title:"Fixed expenses & Break-Even",empty:"Add fixed expenses to see the summary",fixedIncome:"Fixed income",monthly:"Monthly",bimonthly:"Bimonthly (monthly avg)",totalIncome:"Total fixed income",totalMonthly:"Total monthly",monthlyAvg:"Monthly avg addition",breakevenPoint:"Break-Even",breakevenSep:"Break-Even (Sep)",fixedSavings:"Fixed savings",septemberMode:"September mode (daycare)",septemberHint:"Add daycare expenses to calculation",septemberSection:"September+ (daycare)",septemberAddition:"September addition",plus10:"Plus 10%",plus20:"Plus 20%",perMonth:"/mo",monthIncome:"Income",monthBalance:"Balance"},Jn={title:"Trends",last6:"Expenses — last 6 months",twoMonthsMin:"Need at least two months to show trends",topCategories:"Top expense categories",monthlyTrend:"Monthly trend"},Zn={title:"Settings",household:"Household",householdName:"Household name",members:"Members",inviteCode:"Invite code",membersCount:"{{count}} members",you:"you",categories:"Categories",addCategory:"Add category",addCategoryPlaceholder:"New category name...",addCategoryBtn:"+ Add",iconHint:"Type an emoji for the icon",deleteCategory:"Delete",noCats:"No custom categories yet",budgets:"Monthly budgets",budgetsTitle:"Monthly budget by category",noLimit:"No limit",saveBudget:"Save budget ✦",savingsGoal:"Savings goal",goalName:"Goal name",goalNamePlaceholder:"e.g. Vacation, car, apartment...",goalTarget:"Target amount",goalSaved:"Already saved",saveGoal:"Save goal ✦",language:"Language",exportData:"Export data",exportCsv:"Export to CSV",exportCsvSub:"Save all data",joinOtherTitle:"Join another household",joinOtherDesc:"Have an invite code? Enter it here to switch to another household.",joinSuccess:"✓ Successfully joined the new household",kiki:"Kiki — WhatsApp bot",kikiDesc:"Send WhatsApp messages and every expense is recorded automatically ✦",kikiExample:'e.g: "coffee 18 shekel"',kikiPhone:"Your WhatsApp number (with country code)",kikiPhoneSaved:"Connected number",kikiPhoneFormat:"Format: +1234567890",kikiApiKey:"API key (required for Kiki)",kikiApiKeySaved:"Household API key set",kikiApiKeyDesc:"Kiki works with Claude AI — free for 3-6 months.",kikiHowTitle:"How to get started with Kiki?",kikiStep1:"Go to the website",kikiStep2:'Click "Sign up" → register with email',kikiStep3:'Click "API Keys" → "Create Key"',kikiStep4:"Copy the key (starts with sk-ant-) and paste below",kikiStepSaveKey:"Save your API key above",kikiStepSavePhone:"Register your phone number above",kikiStepSaveContact:"Save Kiki's number on WhatsApp:",kikiStepJoin:"Send Kiki the code: join method-strike",kikiStepSend:`Send Kiki: "coffee 18 shekel" — that's it ✦`,savePhone:"Save number",saveKey:"Save key",saved:"✓ Saved!",saving:"Saving...",edit:"Edit",save:"Save",cancel:"Cancel",deleteCatTitle:"Delete category",deleteCatDesc:'There are {{count}} entries under "{{label}}". Which category should they be moved to?',deleteCatConfirm:"Delete & transfer",errorPhone:"Invalid number format. Use international format: +1234567890",errorApiKey:"Key must start with sk-ant-",user:"User",profile:"Profile",inviteCodeLocked:"Upgrade to Premium to invite a partner"},Xn={title:"Add entry",editTitle:"Edit entry",name:"Description",namePlaceholderExpense:"e.g: mortgage, electricity, caregiver...",namePlaceholderIncome:"e.g: salary, freelance, bonus...",namePlaceholderSaving:"e.g: emergency fund, pension...",amount:"Amount (₪)",category:"Category",date:"Date",type:"Type",character:"Character",note:"Note",notePlaceholder:"Short note...",expense:"Expense",income:"Income",saving:"Saving",fixedDesc:"📌 Fixed (every month)",bimonthlyDesc:"📆 Bimonthly (tax, electricity...)",variableDesc:"🔄 Variable",sepDesc:"⚠️ September+",fixed:"Fixed",variable:"Variable",save:"Save ✦",saving2:"Saving...",saveChanges:"Save changes ✦",addNew:"Add ✦",cancel:"Cancel",delete:"Delete",addNewCategory:"+ Add new category",categoryNamePlaceholder:"Category name...",recurringHint:"Auto-carried every month — Premium feature",paymentsLabel:"No. of payments:",errorRequired:"Please fill name, amount and date",errorZero:"Amount must be greater than zero",errorSave:"Error saving: "},Qn={nav:"Accounts",title:"Accounts",empty:"No accounts yet",emptyHint:"Add an account to track your real bank balance",add:"Add account",addName:"Account name",addNamePlaceholder:"e.g. Checking, Joint...",addBalance:"Current balance (₪)",balance:"Balance",lastUpdated:"Updated",resetBalance:"Update balance",resetHint:"Set to your actual bank balance — future entries will accumulate from here",total:"Total",delete:"Delete",confirmDelete:"Delete this account?",noAccount:"No account",save:"Save",cancel:"Cancel"},eo={headline:"Welcome to Budgi!",sub:"Let's set up your account",continue:"Get started →"},to={title:"What currency do you use?",sub:"You can change this later in Settings",search:"Search currencies...",confirm:"Continue →",skip:"Skip (₪ Shekel)"},no={step1Title:"Monthly summary",step1:"Here you'll see your income, expenses, and balance for the month",step2Title:"Month navigation",step2:"Use the arrows to navigate between months",step3Title:"Add an entry",step3:"Tap here to add an expense, income, or saving",step4Title:"Navigation",step4:"Browse all sections of the app from here",step5Title:"Daily Reminders 🔔",step5:"Never forget to log — enable a daily reminder. Set your preferred time in Settings → Notifications.",next:"Next →",skip:"Skip",finish:"Done ✓"},oo={title:"Daily Reminders",subtitle:"Get a nudge to log your expenses",enable:"Send me a daily reminder",timeLabel:"Reminder time",save:"Save",saving:"Saving...",saved:"Saved!",permissionDenied:"Notification permission blocked. Enable it in your browser settings.",unsupported:"Your browser doesn't support notifications.",iosTitle:"To receive notifications on iPhone",iosStep1:"Tap the Share button",iosStep2:'Choose "Add to Home Screen"',iosStep3:"Open the app from your Home Screen",iosNote:"Notifications only work when the app is installed on your Home Screen"},ao={loading:"Loading...",errorDelete:"Error deleting: ",autoAdded:"Auto-added",confirmDelete:"Delete this entry?",yes:"Yes",no:"No"},so={nav:Fn,months:Wn,categories:Un,login:Hn,household:zn,header:Kn,dashboard:Vn,entryItem:Gn,entries:qn,breakeven:Yn,insights:Jn,settings:Zn,addEntry:Xn,import:{title:"Import CSV",desc:"Import transactions from your bank",selectFile:"Select file",import:"Import",success:"Imported {{count}} entries"},accounts:Qn,welcome:eo,currency:to,tour:no,notifications:oo,misc:ao},ro={dashboard:"ראשי",entries:"פעולות",breakeven:"תחשיב",insights:"מגמות",import:"ייבוא",settings:"הגדרות"},io=["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"],co={housing:"דיור",food:"מזון וסופר",transport:"תחבורה",kids:"ילדים",health:"בריאות",education:"חינוך",clothing:"ביגוד",coffee:"קפה",dining:"מסעדות",leisure:"פנאי ובילויים",sport:"ספורט",telecom:"תקשורת",travel:"נסיעות",shopping:"קניות",insurance:"ביטוח",pets:"חיות מחמד",savings:"חיסכון",cosmetics:"קוסמטיקה וטיפוח",home_maintenance:"תחזוקת בית",income:"הכנסה",other:"אחר"},lo={tagline:"הכסף שלכם, סוף סוף מסודר.",taglineSub:"עוקבים אחרי כל שקל, מתכננים ביחד, מוציאים בחכמה.",signInGoogle:"המשך עם Google",signInManual:"כניסה עם שם משתמש",orDivider:"או",usernameLabel:"שם משתמש",usernamePlaceholder:"בחרי שם משתמש",displayNameLabel:"שם מלא",displayNamePlaceholder:"השם שיוצג באפליקציה",emailLabel:"אימייל",emailPlaceholder:"לשחזור חשבון בלבד",passwordLabel:"סיסמה",passwordConfirmLabel:"אימות סיסמה",createAccount:"יצירת חשבון",signInBtn:"כניסה",switchToCreate:"אין לך חשבון עדיין? צרי אחד",switchToSignIn:"כבר יש לך חשבון? כניסה",hint:"הנתונים שלך מאובטחים בענן — נגישים מכל מכשיר",errorGeneric:"שגיאת כניסה: ",errorDomain:"הדומיין לא מורשה ב-Firebase. יש להוסיף אותו ב-Authentication → Authorized Domains",errorPasswordMatch:"הסיסמאות אינן תואמות",errorWeakPassword:"הסיסמה חייבת להכיל לפחות 6 תווים",errorUsernameTaken:"שם המשתמש הזה תפוס",errorUsernameNotFound:"שם המשתמש לא נמצא",errorWrongPassword:"סיסמה שגויה",errorUsernameChars:"2–20 תווים: אותיות, מספרים או קו תחתון",errorDisplayName:"השם חייב להכיל לפחות 2 תווים",errorEmailFormat:"נא להזין כתובת אימייל תקינה",strengthVeryWeak:"חלשה מאוד",strengthWeak:"חלשה",strengthFair:"בינונית — הוסיפי סימנים או אותיות גדולות",strengthGood:"טובה",strengthStrong:"חזקה ✓",backToOptions:"כל אפשרויות הכניסה",feature1:"מעקב הכנסות והוצאות בשניות",feature2:"בית משותף — שני בני הזוג תמיד מסונכרנים",feature3:"מחשבון נקודת איזון ותובנות הוצאה",footer:"חינמי · פרטי · ללא פרסומות · נבנה למשפחות אמיתיות"},uo={welcome:"ברוכים הבאים ל-BUDGI",chooseDesc:"צרי בית משותף חדש או הצטרפי לבית קיים עם קוד ההזמנה של בן/בת הזוג",create:"✦ צרי בית חדש",creating:"יוצרת...",or:"— או —",join:"הצטרפי לבית קיים",created:"הבית נוצר!",createdDesc:"שלחי את קוד ההזמנה לבן/בת הזוג כדי שיצטרפו",inviteLabel:"קוד ההזמנה שלך",inviteHint:'הם יכנסו לאפליקציה ויבחרו "הצטרפי לבית קיים"',autoLogin:"הכניסה לאפליקציה תתחיל אוטומטית",joinTitle:"הצטרפי לבית קיים",joinDesc:"בקשי מבן/בת הזוג את קוד ההזמנה שלהם",joinPlaceholder:"הכניסי קוד (לדוגמא: ABC123)",joinBtn:"הצטרפי",joining:"מצטרפת...",back:"חזרה",errorCreate:"שגיאה ביצירת הבית: ",errorJoin:"שגיאה בהצטרפות",errorJoinPremium:"צירוף שותף/ה לבית משותף דורש מנוי פרמיום פעיל אצל יוצר הבית"},ho={switchUser:"החלף משתמש",signOut:"יציאה מהחשבון"},mo={balance:"יתרה",income:"הכנסות",expenses:"הוצאות",incomeUtil:"ניצול הכנסה",budgetUtil:"ניצול תקציב",vsLastMonth:"מהחודש שעבר",fixed:"קבועות",variable:"משתנות",savingsLabel:"חיסכונות",incomeLabel:"הכנסות",savingsGoal:"יעד חיסכון",byCategory:"לפי קטגוריה",recent:"אחרונות",addEntry:"הוסף פעולה",overBudget:"חריגה מתקציב ב-{{count}} קטגוריות",errorAdd:"שגיאה בהוספה: ",donutExpenses:"הוצאות",donutByCategory:"לפי קטגוריה",suggestedMsg:"יש {{count}} הוצאות קבועות שלא הוזנו החודש",suggestedAvg:"ממוצע",suggestedAdd:"+ הוסיפי",noEntries:"עוד אין פעולות לחודש זה",noEntriesHint:"לחצי + להוסיף",kikiPromoTitle:"הוסיפי הוצאות בוואטסאפ תוך שניות",kikiPromoSub:"שלחי הודעה ל-Budgi Bot — הוא יירשום הכל אוטומטית",kikiPromoBtn:"שדרג",trialEndingSoon:"הניסיון שלך מסתיים בעוד {{days}} ימים",trialEndingHint:"שמור גישה ל-Budgi Bot, בית משותף וכל הכלים המתקדמים",trialUpgradeBtn:"שדרג עכשיו"},po={fixed:"קבועה",bimonthly:"דו-חודשית",variable:"משתנה",sep:"ספטמ׳+"},go={title:"כל הפעולות",empty:"אין פעולות לחודש זה",filterAll:"הכל",filterExpense:"הוצאות",filterIncome:"הכנסות",filterSaving:"חיסכון"},fo={title:"הוצאות קבועות ו-Break-Even",empty:"הוסיפי הוצאות קבועות כדי לראות את הסיכום",fixedIncome:"הכנסות קבועות",monthly:"חודשיות",bimonthly:"דו-חודשיות (ממוצע חודשי)",totalIncome:'סה"כ הכנסות קבועות',totalMonthly:'סה"כ חודשיות',monthlyAvg:"תוספת ממוצעת חודשית",breakevenPoint:"Break-Even",breakevenSep:"Break-Even (ספטמבר)",fixedSavings:"חיסכונות קבועים",septemberMode:"מצב ספטמבר (מעון)",septemberHint:"הוסיפי הוצאות מעון לתחשיב",septemberSection:"ספטמבר+ (מעון)",septemberAddition:"תוספת ספטמבר",plus10:"פלוס 10%",plus20:"פלוס 20%",perMonth:"/חודש",monthIncome:"הכנסה",monthBalance:"מצב"},yo={title:"מגמות",last6:"הוצאות — 6 חודשים אחרונים",twoMonthsMin:"צריך לפחות שני חודשים כדי להציג מגמות",topCategories:"קטגוריות הוצאה מובילות",monthlyTrend:"מגמה חודשית"},bo={title:"הגדרות",household:"הבית שלנו",householdName:"שם הבית",members:"חברי הבית",inviteCode:"קוד הזמנה לשיתוף",membersCount:"{{count}} משתמשים",you:"את",categories:"קטגוריות",addCategory:"הוסיפי קטגוריה",addCategoryPlaceholder:"שם קטגוריה חדשה...",addCategoryBtn:"+ הוסיפי",iconHint:"הקלידי אמוג׳י לאייקון",deleteCategory:"מחקי",noCats:"אין עדיין קטגוריות מותאמות",budgets:"תקציבים חודשיים",budgetsTitle:"תקציב חודשי לפי קטגוריה",noLimit:"ללא מגבלה",saveBudget:"שמרי תקציב ✦",savingsGoal:"יעד חיסכון",goalName:"שם היעד",goalNamePlaceholder:"למשל: חופשה, רכב, דירה...",goalTarget:"סכום יעד (₪)",goalSaved:"כבר חסכתי (₪)",saveGoal:"שמרי יעד ✦",language:"שפה",exportData:"ייצוא נתונים",exportCsv:"ייצוא ל-CSV",exportCsvSub:"שמירת כל הנתונים",joinOtherTitle:"הצטרפות לבית אחר",joinOtherDesc:"יש לך קוד הזמנה? הכנס כאן כדי לעבור לבית אחר.",joinSuccess:"✓ הצטרפת בהצלחה לבית החדש",kiki:"קיקי — בוט WhatsApp",kikiDesc:"שלחי הודעות בוואטסאפ וכל הוצאה תירשם אוטומטית ✦",kikiExample:'לדוגמה: "קפה 18 שקל"',kikiPhone:"מספר הטלפון שלך (עם קידומת מדינה)",kikiPhoneSaved:"מספר מקושר",kikiPhoneFormat:"פורמט: +972501234567",kikiApiKey:"מפתח API (חובה לשימוש בקיקי)",kikiApiKeySaved:"מפתח מוגדר לבית",kikiApiKeyDesc:"קיקי עובדת עם Claude AI — חינמי לחלוטין ל-3-6 חודשים.",kikiHowTitle:"איך מתחילים עם קיקי?",kikiStep1:"כנסי לאתר",kikiStep2:'לחצי "Sign up" → הירשמי עם מייל',kikiStep3:'לחצי "API Keys" → "Create Key"',kikiStep4:"העתיקי את המפתח (מתחיל ב-sk-ant-) והדביקי למטה",kikiStepSaveKey:"שמרי מפתח API למעלה",kikiStepSavePhone:"רשמי את מספר הטלפון שלך למעלה",kikiStepSaveContact:"שמרי את מספר קיקי בוואטסאפ:",kikiStepJoin:"שלחי לקיקי את הקוד: join method-strike",kikiStepSend:'שלחי לקיקי: "קפה 18 שקל" — וזהו ✦',savePhone:"שמרי מספר",saveKey:"שמרי מפתח",saved:"✓ נשמר!",saving:"שומרת...",edit:"ערכי",save:"שמרי",cancel:"ביטול",deleteCatTitle:"מחיקת קטגוריה",deleteCatDesc:'יש {{count}} פעולות תחת "{{label}}". לאיזו קטגוריה להעביר אותן?',deleteCatConfirm:"מחקי והעבירי",errorPhone:"פורמט מספר לא תקין. השתמשי בפורמט בינלאומי: +972501234567",errorApiKey:"המפתח חייב להתחיל ב-sk-ant-",user:"משתמש",profile:"פרופיל",inviteCodeLocked:"שדרג לפרמיום כדי להזמין שותף/ה"},vo={title:"הוספת פעולה",editTitle:"עריכת פעולה",name:"תיאור",namePlaceholderExpense:"למשל: משכנתא, חשמל, מטפלת...",namePlaceholderIncome:"למשל: משכורת, פרילנס, בונוס...",namePlaceholderSaving:"למשל: קרן חירום, קופת גמל...",amount:"סכום (₪)",category:"קטגוריה",date:"תאריך",type:"סוג",character:"אופי",note:"הערה",notePlaceholder:"הערה קצרה...",expense:"הוצאה",income:"הכנסה",saving:"חיסכון",fixedDesc:"📌 קבועה (כל חודש)",bimonthlyDesc:"📆 דו-חודשית (ארנונה, חשמל, מים...)",variableDesc:"🔄 משתנה",sepDesc:"⚠️ ספטמבר+",fixed:"קבועה",variable:"משתנה",save:"שמרי ✦",saving2:"שומרת...",saveChanges:"שמרי שינויים ✦",addNew:"הוסיפי ✦",cancel:"ביטול",delete:"מחקי",addNewCategory:"+ הוסיפי קטגוריה חדשה",categoryNamePlaceholder:"שם הקטגוריה...",recurringHint:"מועבר אוטומטית בכל חודש — בגירסת פרמיום",paymentsLabel:"מס׳ תשלומים:",errorRequired:"יש למלא שם, סכום ותאריך",errorZero:"סכום חייב להיות גדול מאפס",errorSave:"שגיאה בשמירת הפעולה: "},xo={nav:"חשבונות",title:"חשבונות בנק",empty:"עוד אין חשבונות",emptyHint:"הוסיפי חשבון כדי לעקוב אחרי היתרה האמיתית שלך בבנק",add:"הוסיפי חשבון",addName:"שם החשבון",addNamePlaceholder:"למשל: הפועלים, חשבון משותף...",addBalance:"יתרה נוכחית (₪)",balance:"יתרה",lastUpdated:"עודכן",resetBalance:"עדכני יתרה",resetHint:"הגדירי את היתרה האמיתית מהבנק — פעולות עתידיות יצטברו מכאן",total:'סה"כ',delete:"מחקי",confirmDelete:"למחוק חשבון זה?",noAccount:"ללא חשבון",save:"שמרי",cancel:"ביטול"},wo={headline:"ברוכים הבאים ל-Budgi!",sub:"בואו נגדיר את החשבון שלכם",continue:"בואו נתחיל ←"},ko={title:"באיזה מטבע אתם עובדים?",sub:"ניתן לשנות בהמשך בהגדרות",search:"חיפוש מטבע...",confirm:"המשך ←",skip:"דלג (₪ שקל)"},So={step1Title:"סיכום החודש",step1:"כאן תראו את סיכום ההכנסות, ההוצאות והיתרה החודשית",step2Title:"ניווט חודשי",step2:"לחצו על החצים כדי לנוע בין חודשים",step3Title:"הוספת פעולה",step3:"לחצו כאן להוספת הוצאה, הכנסה או חיסכון",step4Title:"ניווט בין מסכים",step4:"גלשו בין כל חלקי האפליקציה מכאן",step5Title:"תזכורות יומיות 🔔",step5:"כדי לא לשכוח לתעד — הפעל תזכורת יומית. תוכל להגדיר את השעה בהגדרות ← תזכורות.",next:"הבא ←",skip:"דלג",finish:"סיום ✓"},jo={title:"תזכורות יומיות",subtitle:"קבל תזכורת לתעד את ההוצאות שלך",enable:"שלח לי תזכורת כל יום",timeLabel:"שעת תזכורת",save:"שמור",saving:"שומר...",saved:"נשמר!",permissionDenied:"הרשאת התראות נחסמה. יש לאפשר אותה בהגדרות הדפדפן.",unsupported:"הדפדפן שלך אינו תומך בהתראות.",iosTitle:"כדי לקבל התראות באייפון",iosStep1:"לחץ על כפתור השיתוף",iosStep2:'בחר "הוסף למסך הבית"',iosStep3:"פתח את האפליקציה ממסך הבית",iosNote:"התראות עובדות רק כשהאפליקציה מותקנת במסך הבית"},Co={loading:"טוען...",errorDelete:"שגיאה במחיקה: ",autoAdded:"הוזן אוטומטית",confirmDelete:"למחוק פעולה זו?",yes:"כן",no:"לא"},Eo={nav:ro,months:io,categories:co,login:lo,household:uo,header:ho,dashboard:mo,entryItem:po,entries:go,breakeven:fo,insights:yo,settings:bo,addEntry:vo,import:{title:"ייבוא CSV",desc:"ייבאי עסקאות מהבנק שלך",selectFile:"בחרי קובץ",import:"ייבאי",success:"יובאו {{count}} פעולות"},accounts:xo,welcome:wo,currency:ko,tour:So,notifications:jo,misc:Co},No=localStorage.getItem("budgi-lang");pn.use(gn).init({resources:{en:{translation:so},he:{translation:Eo}},lng:No||"en",fallbackLng:"en",interpolation:{escapeValue:!1}});const Io="modulepreload",Ao=function(e){return"/kaspit/"+e},nt={},re=function(t,n,a){let s=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),d=(c==null?void 0:c.nonce)||(c==null?void 0:c.getAttribute("nonce"));s=Promise.allSettled(n.map(h=>{if(h=Ao(h),h in nt)return;nt[h]=!0;const i=h.endsWith(".css"),u=i?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${u}`))return;const p=document.createElement("link");if(p.rel=i?"stylesheet":Io,i||(p.as="script"),p.crossOrigin="",p.href=h,d&&p.setAttribute("nonce",d),document.head.appendChild(p),i)return new Promise((x,y)=>{p.addEventListener("load",x),p.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${h}`)))})}))}function r(c){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=c,window.dispatchEvent(d),!d.defaultPrevented)throw c}return s.then(c=>{for(const d of c||[])d.status==="rejected"&&r(d.reason);return t().catch(r)})},Dt="@firebase/installations",ze="0.6.9";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pt=1e4,_t=`w:${ze}`,Mt="FIS_v2",To="https://firebaseinstallations.googleapis.com/v1",Do=60*60*1e3,Po="installations",_o="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mo={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},de=new kt(Po,_o,Mo);function Lt(e){return e instanceof fn&&e.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ot({projectId:e}){return`${To}/projects/${e}/installations`}function Rt(e){return{token:e.token,requestStatus:2,expiresIn:Oo(e.expiresIn),creationTime:Date.now()}}async function Bt(e,t){const a=(await t.json()).error;return de.create("request-failed",{requestName:e,serverCode:a.code,serverMessage:a.message,serverStatus:a.status})}function $t({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function Lo(e,{refreshToken:t}){const n=$t(e);return n.append("Authorization",Ro(t)),n}async function Ft(e){const t=await e();return t.status>=500&&t.status<600?e():t}function Oo(e){return Number(e.replace("s","000"))}function Ro(e){return`${Mt} ${e}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bo({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const a=Ot(e),s=$t(e),r=t.getImmediate({optional:!0});if(r){const i=await r.getHeartbeatsHeader();i&&s.append("x-firebase-client",i)}const c={fid:n,authVersion:Mt,appId:e.appId,sdkVersion:_t},d={method:"POST",headers:s,body:JSON.stringify(c)},h=await Ft(()=>fetch(a,d));if(h.ok){const i=await h.json();return{fid:i.fid||n,registrationStatus:2,refreshToken:i.refreshToken,authToken:Rt(i.authToken)}}else throw await Bt("Create Installation",h)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wt(e){return new Promise(t=>{setTimeout(t,e)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $o(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fo=/^[cdef][\w-]{21}$/,Be="";function Wo(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const n=Uo(e);return Fo.test(n)?n:Be}catch{return Be}}function Uo(e){return $o(e).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ee(e){return`${e.appName}!${e.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ut=new Map;function Ht(e,t){const n=Ee(e);zt(n,t),Ho(n,t)}function zt(e,t){const n=Ut.get(e);if(n)for(const a of n)a(t)}function Ho(e,t){const n=zo();n&&n.postMessage({key:e,fid:t}),Ko()}let le=null;function zo(){return!le&&"BroadcastChannel"in self&&(le=new BroadcastChannel("[Firebase] FID Change"),le.onmessage=e=>{zt(e.data.key,e.data.fid)}),le}function Ko(){Ut.size===0&&le&&(le.close(),le=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vo="firebase-installations-database",Go=1,ue="firebase-installations-store";let Ae=null;function Ke(){return Ae||(Ae=We(Vo,Go,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(ue)}}})),Ae}async function je(e,t){const n=Ee(e),s=(await Ke()).transaction(ue,"readwrite"),r=s.objectStore(ue),c=await r.get(n);return await r.put(t,n),await s.done,(!c||c.fid!==t.fid)&&Ht(e,t.fid),t}async function Kt(e){const t=Ee(e),a=(await Ke()).transaction(ue,"readwrite");await a.objectStore(ue).delete(t),await a.done}async function Ne(e,t){const n=Ee(e),s=(await Ke()).transaction(ue,"readwrite"),r=s.objectStore(ue),c=await r.get(n),d=t(c);return d===void 0?await r.delete(n):await r.put(d,n),await s.done,d&&(!c||c.fid!==d.fid)&&Ht(e,d.fid),d}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ve(e){let t;const n=await Ne(e.appConfig,a=>{const s=qo(a),r=Yo(e,s);return t=r.registrationPromise,r.installationEntry});return n.fid===Be?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function qo(e){const t=e||{fid:Wo(),registrationStatus:0};return Vt(t)}function Yo(e,t){if(t.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(de.create("app-offline"));return{installationEntry:t,registrationPromise:s}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},a=Jo(e,n);return{installationEntry:n,registrationPromise:a}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:Zo(e)}:{installationEntry:t}}async function Jo(e,t){try{const n=await Bo(e,t);return je(e.appConfig,n)}catch(n){throw Lt(n)&&n.customData.serverCode===409?await Kt(e.appConfig):await je(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function Zo(e){let t=await ot(e.appConfig);for(;t.registrationStatus===1;)await Wt(100),t=await ot(e.appConfig);if(t.registrationStatus===0){const{installationEntry:n,registrationPromise:a}=await Ve(e);return a||n}return t}function ot(e){return Ne(e,t=>{if(!t)throw de.create("installation-not-found");return Vt(t)})}function Vt(e){return Xo(e)?{fid:e.fid,registrationStatus:0}:e}function Xo(e){return e.registrationStatus===1&&e.registrationTime+Pt<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qo({appConfig:e,heartbeatServiceProvider:t},n){const a=ea(e,n),s=Lo(e,n),r=t.getImmediate({optional:!0});if(r){const i=await r.getHeartbeatsHeader();i&&s.append("x-firebase-client",i)}const c={installation:{sdkVersion:_t,appId:e.appId}},d={method:"POST",headers:s,body:JSON.stringify(c)},h=await Ft(()=>fetch(a,d));if(h.ok){const i=await h.json();return Rt(i)}else throw await Bt("Generate Auth Token",h)}function ea(e,{fid:t}){return`${Ot(e)}/${t}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ge(e,t=!1){let n;const a=await Ne(e.appConfig,r=>{if(!Gt(r))throw de.create("not-registered");const c=r.authToken;if(!t&&oa(c))return r;if(c.requestStatus===1)return n=ta(e,t),r;{if(!navigator.onLine)throw de.create("app-offline");const d=sa(r);return n=na(e,d),d}});return n?await n:a.authToken}async function ta(e,t){let n=await at(e.appConfig);for(;n.authToken.requestStatus===1;)await Wt(100),n=await at(e.appConfig);const a=n.authToken;return a.requestStatus===0?Ge(e,t):a}function at(e){return Ne(e,t=>{if(!Gt(t))throw de.create("not-registered");const n=t.authToken;return ra(n)?Object.assign(Object.assign({},t),{authToken:{requestStatus:0}}):t})}async function na(e,t){try{const n=await Qo(e,t),a=Object.assign(Object.assign({},t),{authToken:n});return await je(e.appConfig,a),n}catch(n){if(Lt(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Kt(e.appConfig);else{const a=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await je(e.appConfig,a)}throw n}}function Gt(e){return e!==void 0&&e.registrationStatus===2}function oa(e){return e.requestStatus===2&&!aa(e)}function aa(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+Do}function sa(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}function ra(e){return e.requestStatus===1&&e.requestTime+Pt<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ia(e){const t=e,{installationEntry:n,registrationPromise:a}=await Ve(t);return a?a.catch(console.error):Ge(t).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ca(e,t=!1){const n=e;return await la(n),(await Ge(n,t)).token}async function la(e){const{registrationPromise:t}=await Ve(e);t&&await t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function da(e){if(!e||!e.options)throw Te("App Configuration");if(!e.name)throw Te("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw Te(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function Te(e){return de.create("missing-app-config-values",{valueName:e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qt="installations",ua="installations-internal",ha=e=>{const t=e.getProvider("app").getImmediate(),n=da(t),a=Fe(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:a,_delete:()=>Promise.resolve()}},ma=e=>{const t=e.getProvider("app").getImmediate(),n=Fe(t,qt).getImmediate();return{getId:()=>ia(n),getToken:s=>ca(n,s)}};function pa(){we(new ke(qt,ha,"PUBLIC")),we(new ke(ua,ma,"PRIVATE"))}pa();xe(Dt,ze);xe(Dt,ze,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ga="/firebase-messaging-sw.js",fa="/firebase-cloud-messaging-push-scope",Yt="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",ya="https://fcmregistrations.googleapis.com/v1",Jt="google.c.a.c_id",ba="google.c.a.c_l",va="google.c.a.ts",xa="google.c.a.e";var st;(function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(st||(st={}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */var fe;(function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"})(fe||(fe={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function te(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function wa(e){const t="=".repeat((4-e.length%4)%4),n=(e+t).replace(/\-/g,"+").replace(/_/g,"/"),a=atob(n),s=new Uint8Array(a.length);for(let r=0;r<a.length;++r)s[r]=a.charCodeAt(r);return s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const De="fcm_token_details_db",ka=5,rt="fcm_token_object_Store";async function Sa(e){if("databases"in indexedDB&&!(await indexedDB.databases()).map(r=>r.name).includes(De))return null;let t=null;return(await We(De,ka,{upgrade:async(a,s,r,c)=>{var d;if(s<2||!a.objectStoreNames.contains(rt))return;const h=c.objectStore(rt),i=await h.index("fcmSenderId").get(e);if(await h.clear(),!!i){if(s===2){const u=i;if(!u.auth||!u.p256dh||!u.endpoint)return;t={token:u.fcmToken,createTime:(d=u.createTime)!==null&&d!==void 0?d:Date.now(),subscriptionOptions:{auth:u.auth,p256dh:u.p256dh,endpoint:u.endpoint,swScope:u.swScope,vapidKey:typeof u.vapidKey=="string"?u.vapidKey:te(u.vapidKey)}}}else if(s===3){const u=i;t={token:u.fcmToken,createTime:u.createTime,subscriptionOptions:{auth:te(u.auth),p256dh:te(u.p256dh),endpoint:u.endpoint,swScope:u.swScope,vapidKey:te(u.vapidKey)}}}else if(s===4){const u=i;t={token:u.fcmToken,createTime:u.createTime,subscriptionOptions:{auth:te(u.auth),p256dh:te(u.p256dh),endpoint:u.endpoint,swScope:u.swScope,vapidKey:te(u.vapidKey)}}}}}})).close(),await Ie(De),await Ie("fcm_vapid_details_db"),await Ie("undefined"),ja(t)?t:null}function ja(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return typeof e.createTime=="number"&&e.createTime>0&&typeof e.token=="string"&&e.token.length>0&&typeof t.auth=="string"&&t.auth.length>0&&typeof t.p256dh=="string"&&t.p256dh.length>0&&typeof t.endpoint=="string"&&t.endpoint.length>0&&typeof t.swScope=="string"&&t.swScope.length>0&&typeof t.vapidKey=="string"&&t.vapidKey.length>0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ca="firebase-messaging-database",Ea=1,ye="firebase-messaging-store";let Pe=null;function Zt(){return Pe||(Pe=We(Ca,Ea,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(ye)}}})),Pe}async function Na(e){const t=Xt(e),a=await(await Zt()).transaction(ye).objectStore(ye).get(t);if(a)return a;{const s=await Sa(e.appConfig.senderId);if(s)return await qe(e,s),s}}async function qe(e,t){const n=Xt(e),s=(await Zt()).transaction(ye,"readwrite");return await s.objectStore(ye).put(t,n),await s.done,t}function Xt({appConfig:e}){return e.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ia={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},O=new kt("messaging","Messaging",Ia);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Aa(e,t){const n=await Je(e),a=Qt(t),s={method:"POST",headers:n,body:JSON.stringify(a)};let r;try{r=await(await fetch(Ye(e.appConfig),s)).json()}catch(c){throw O.create("token-subscribe-failed",{errorInfo:c==null?void 0:c.toString()})}if(r.error){const c=r.error.message;throw O.create("token-subscribe-failed",{errorInfo:c})}if(!r.token)throw O.create("token-subscribe-no-token");return r.token}async function Ta(e,t){const n=await Je(e),a=Qt(t.subscriptionOptions),s={method:"PATCH",headers:n,body:JSON.stringify(a)};let r;try{r=await(await fetch(`${Ye(e.appConfig)}/${t.token}`,s)).json()}catch(c){throw O.create("token-update-failed",{errorInfo:c==null?void 0:c.toString()})}if(r.error){const c=r.error.message;throw O.create("token-update-failed",{errorInfo:c})}if(!r.token)throw O.create("token-update-no-token");return r.token}async function Da(e,t){const a={method:"DELETE",headers:await Je(e)};try{const r=await(await fetch(`${Ye(e.appConfig)}/${t}`,a)).json();if(r.error){const c=r.error.message;throw O.create("token-unsubscribe-failed",{errorInfo:c})}}catch(s){throw O.create("token-unsubscribe-failed",{errorInfo:s==null?void 0:s.toString()})}}function Ye({projectId:e}){return`${ya}/projects/${e}/registrations`}async function Je({appConfig:e,installations:t}){const n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function Qt({p256dh:e,auth:t,endpoint:n,vapidKey:a}){const s={web:{endpoint:n,auth:t,p256dh:e}};return a!==Yt&&(s.web.applicationPubKey=a),s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pa=7*24*60*60*1e3;async function _a(e){const t=await La(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:te(t.getKey("auth")),p256dh:te(t.getKey("p256dh"))},a=await Na(e.firebaseDependencies);if(a){if(Oa(a.subscriptionOptions,n))return Date.now()>=a.createTime+Pa?Ma(e,{token:a.token,createTime:Date.now(),subscriptionOptions:n}):a.token;try{await Da(e.firebaseDependencies,a.token)}catch(s){console.warn(s)}return it(e.firebaseDependencies,n)}else return it(e.firebaseDependencies,n)}async function Ma(e,t){try{const n=await Ta(e.firebaseDependencies,t),a=Object.assign(Object.assign({},t),{token:n,createTime:Date.now()});return await qe(e.firebaseDependencies,a),n}catch(n){throw n}}async function it(e,t){const a={token:await Aa(e,t),createTime:Date.now(),subscriptionOptions:t};return await qe(e,a),a.token}async function La(e,t){const n=await e.pushManager.getSubscription();return n||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:wa(t)})}function Oa(e,t){const n=t.vapidKey===e.vapidKey,a=t.endpoint===e.endpoint,s=t.auth===e.auth,r=t.p256dh===e.p256dh;return n&&a&&s&&r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ct(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return Ra(t,e),Ba(t,e),$a(t,e),t}function Ra(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const a=t.notification.body;a&&(e.notification.body=a);const s=t.notification.image;s&&(e.notification.image=s);const r=t.notification.icon;r&&(e.notification.icon=r)}function Ba(e,t){t.data&&(e.data=t.data)}function $a(e,t){var n,a,s,r,c;if(!t.fcmOptions&&!(!((n=t.notification)===null||n===void 0)&&n.click_action))return;e.fcmOptions={};const d=(s=(a=t.fcmOptions)===null||a===void 0?void 0:a.link)!==null&&s!==void 0?s:(r=t.notification)===null||r===void 0?void 0:r.click_action;d&&(e.fcmOptions.link=d);const h=(c=t.fcmOptions)===null||c===void 0?void 0:c.analytics_label;h&&(e.fcmOptions.analyticsLabel=h)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fa(e){return typeof e=="object"&&!!e&&Jt in e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wa(e){if(!e||!e.options)throw _e("App Configuration Object");if(!e.name)throw _e("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const a of t)if(!n[a])throw _e(a);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function _e(e){return O.create("missing-app-config-values",{valueName:e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ua{constructor(t,n,a){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const s=Wa(t);this.firebaseDependencies={app:t,appConfig:s,installations:n,analyticsProvider:a}}_delete(){return Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ha(e){try{e.swRegistration=await navigator.serviceWorker.register(ga,{scope:fa}),e.swRegistration.update().catch(()=>{})}catch(t){throw O.create("failed-service-worker-registration",{browserErrorMessage:t==null?void 0:t.message})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function za(e,t){if(!t&&!e.swRegistration&&await Ha(e),!(!t&&e.swRegistration)){if(!(t instanceof ServiceWorkerRegistration))throw O.create("invalid-sw-registration");e.swRegistration=t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ka(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=Yt)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function en(e,t){if(!navigator)throw O.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw O.create("permission-blocked");return await Ka(e,t==null?void 0:t.vapidKey),await za(e,t==null?void 0:t.serviceWorkerRegistration),_a(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Va(e,t,n){const a=Ga(t);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(a,{message_id:n[Jt],message_name:n[ba],message_time:n[va],message_device_time:Math.floor(Date.now()/1e3)})}function Ga(e){switch(e){case fe.NOTIFICATION_CLICKED:return"notification_open";case fe.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qa(e,t){const n=t.data;if(!n.isFirebaseMessaging)return;e.onMessageHandler&&n.messageType===fe.PUSH_RECEIVED&&(typeof e.onMessageHandler=="function"?e.onMessageHandler(ct(n)):e.onMessageHandler.next(ct(n)));const a=n.data;Fa(a)&&a[xa]==="1"&&await Va(e,n.messageType,a)}const lt="@firebase/messaging",dt="0.12.12";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ya=e=>{const t=new Ua(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",n=>qa(t,n)),t},Ja=e=>{const t=e.getProvider("messaging").getImmediate();return{getToken:a=>en(t,a)}};function Za(){we(new ke("messaging",Ya,"PUBLIC")),we(new ke("messaging-internal",Ja,"PRIVATE")),xe(lt,dt),xe(lt,dt,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tn(){try{await yn()}catch{return!1}return typeof window<"u"&&bn()&&vn()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xa(e=xn()){return tn().then(t=>{if(!t)throw O.create("unsupported-browser")},t=>{throw O.create("indexed-db-unsupported")}),Fe(St(e),"messaging").getImmediate()}async function Ar(e,t){return e=St(e),en(e,t)}Za();const Qa={apiKey:"AIzaSyBrAZBMOWmvy0afvp_l2EEbVusz08ziMQ0",authDomain:"kaspit-d01e9.firebaseapp.com",projectId:"kaspit-d01e9",storageBucket:"kaspit-d01e9.firebasestorage.app",messagingSenderId:"45946797475",appId:"1:45946797475:web:9bf0003a39f530d805ee16"},Ze=wn(Qa),W=kn(Ze),v=Sn(Ze,{localCache:jn()}),ut=new jt,Tr=tn().then(e=>e?Xa(Ze):null);async function es(e){const t=k(v,"users",e.uid),n=await ee(t);return n.exists()?n.data():(await Y(t,{displayName:e.displayName,email:e.email,householdId:null,createdAt:new Date().toISOString()}),{householdId:null})}async function ts(e){return(await ee(k(v,"usernames",e.toLowerCase()))).exists()}async function ns(e,t){await Y(k(v,"usernames",e.toLowerCase()),{uid:t})}async function os(e){const t=await ee(k(v,"usernames",e.toLowerCase()));return t.exists()?t.data().email:null}async function as(e){const t=await ee(k(v,"users",e));return t.exists()?t.data():{}}async function ss(e,t){await se(k(v,"users",e),{email:t})}async function nn(e,t){await Y(k(v,"users",e),{householdId:t},{merge:!0})}async function Dr(e,t){await se(k(v,"users",e),{pendingWhatsappPhone:t,whatsappNumber:""})}async function Pr(e){await se(k(v,"users",e),{whatsappNumber:"",pendingWhatsappPhone:""})}async function _r(e,{enabled:t,time:n,token:a}){await se(k(v,"users",e),{reminderEnabled:t,reminderTime:n||null,fcmToken:a||null})}async function Mr(e){const t=await ee(k(v,"users",e));if(!t.exists())return{enabled:!1,time:"20:00"};const n=t.data();return{enabled:n.reminderEnabled||!1,time:n.reminderTime||"20:00"}}function rs(){const e="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";return Array.from({length:6},()=>e[Math.floor(Math.random()*e.length)]).join("")}async function is(e){var a;const t=rs(),n=await Ue(ae(v,"households"),{name:`הבית של ${((a=e.displayName)==null?void 0:a.split(" ")[0])||"המשפחה"}`,members:[{uid:e.uid,displayName:e.displayName||""}],memberUids:[e.uid],inviteCode:t,createdAt:new Date().toISOString()});return await nn(e.uid,n.id),{householdId:n.id,inviteCode:t}}async function cs(e,t){const n=Se(ae(v,"households"),he("inviteCode","==",t.trim().toUpperCase()),Cn(1)),a=await He(n);if(a.empty)throw new Error("קוד הזמנה לא נמצא");const s=a.docs[0],r=s.data().memberUids||[];if(r.length>=1&&!r.includes(e.uid)){const c=r[0],d=await ee(k(v,"subscriptions",c)),h=d.exists()?d.data():null;if(!((h==null?void 0:h.status)==="active"||(h==null?void 0:h.status)==="trial"&&new Date(h.trialEndsAt)>new Date))throw new Error("REQUIRES_PREMIUM")}if(!r.includes(e.uid)){const c=s.data().members||[];await se(k(v,"households",s.id),{members:[...c,{uid:e.uid,displayName:e.displayName||""}],memberUids:[...r,e.uid]})}return await nn(e.uid,s.id),s.id}async function Lr(e){const t=await ee(k(v,"households",e));if(!t.exists())return null;const n={id:t.id,...t.data()};if(!n.memberUids){const a=(n.members||[]).map(s=>typeof s=="string"?s:s.uid);await se(k(v,"households",e),{memberUids:a}),n.memberUids=a}return n}function Or(e){return Promise.resolve(e.map(t=>typeof t=="string"?{uid:t,displayName:t}:t))}async function ls(e,t){await Promise.all([Y(k(v,"households",e),{customCategories:t},{merge:!0}),Xe(e,{customCategories:t})])}async function Rr(e,t){await Promise.all([Y(k(v,"households",e),{budgets:t},{merge:!0}),Xe(e,{budgets:t})])}async function ht(e,t){await Y(k(v,"households",e),{currency:t},{merge:!0})}async function Br(e,t){await Promise.all([Y(k(v,"households",e),{savingsGoal:t},{merge:!0}),Xe(e,{savingsGoal:t})])}async function Xe(e,t){await Y(k(v,"households",e,"settings","main"),t,{merge:!0})}async function Qe(e,t){const[n,a]=t.split("-").map(Number),s=`${t}-01`,r=a===12?n+1:n,c=a===12?1:a+1,d=`${r}-${String(c).padStart(2,"0")}-01`,i=(await He(Se(ae(v,"households",e,"entries"),he("date",">=",s),he("date","<",d)))).docs.map(b=>b.data()),u=i.filter(b=>b.type==="income").reduce((b,f)=>b+f.amount,0),p=i.filter(b=>b.type!=="income").reduce((b,f)=>b+f.amount,0),x=i.filter(b=>b.type==="saving").reduce((b,f)=>b+f.amount,0),y={};i.filter(b=>b.type!=="income").forEach(b=>{y[b.category]=(y[b.category]||0)+b.amount}),await Y(k(v,"households",e,"monthlySummaries",t),{month:t,totalIncome:u,totalExpenses:p,totalSavings:x,byCategory:y,entryCount:i.length,updatedAt:new Date().toISOString()})}async function $r(e,t){return(await Ue(ae(v,"households",e,"accounts"),t)).id}async function Fr(e,t,n){await se(k(v,"households",e,"accounts",t),n)}async function Wr(e,t){await Ct(k(v,"households",e,"accounts",t))}async function on(e,t,n){var c;const s=((c=(await ee(k(v,"households",e))).data())==null?void 0:c.memberUids)||[n.uid];await Ue(ae(v,"households",e,"entries"),{...t,householdId:e,memberUids:s,addedBy:n.displayName||"unknown",addedByUid:n.uid,createdAt:new Date().toISOString()});const r=t.date.slice(0,7);Qe(e,r).catch(d=>console.error("summary update error:",d))}async function ds(e,t,n){if(await se(k(v,"households",e,"entries",t),n),n.date){const a=n.date.slice(0,7);Qe(e,a).catch(s=>console.error("summary update error:",s))}}async function us(e,t){var s;const a=(s=(await ee(k(v,"households",e,"entries",t))).data())==null?void 0:s.date;await Ct(k(v,"households",e,"entries",t)),a&&Qe(e,a.slice(0,7)).catch(r=>console.error("summary update error:",r))}function hs(){const[e,t]=l.useState(null),[n,a]=l.useState(null),[s,r]=l.useState(!0);return l.useEffect(()=>En(W,async d=>{if(d){t(d);try{const h=await es(d);h.householdId&&a(h.householdId)}catch{}}else t(null),a(null);r(!1)}),[]),{user:e,householdId:n,setHouseholdId:a,loading:s}}function mt(){const e=new Date,t=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-01`,n=new Date(e);return n.setMonth(n.getMonth()-6),{thisMonthStart:t,historyStart:n.toISOString().slice(0,10)}}function ms(e){const[t,n]=l.useState([]),[a,s]=l.useState([]);return l.useEffect(()=>{if(!e){n([]);return}const{thisMonthStart:r}=mt(),c=Se(ae(v,"households",e,"entries"),he("date",">=",r),et("date","desc"));return ge(c,d=>n(d.docs.map(h=>({id:h.id,...h.data()}))),d=>console.error("entries listener error:",d))},[e]),l.useEffect(()=>{if(!e){s([]);return}const{thisMonthStart:r,historyStart:c}=mt(),d=Se(ae(v,"households",e,"entries"),he("date",">=",c),he("date","<",r),et("date","desc"));He(d).then(h=>s(h.docs.map(i=>({id:i.id,...i.data()})))).catch(h=>console.error("history fetch error:",h))},[e]),[...t,...a]}function ps(e){const[t,n]=l.useState({}),[a,s]=l.useState(null),[r,c]=l.useState([]),[d,h]=l.useState([]),[i,u]=l.useState(null);return l.useEffect(()=>{if(!e){h([]);return}return ge(k(v,"households",e),p=>{var y;const x=p.data()||{};if(!x.memberUids&&((y=x.members)==null?void 0:y.length)>0){const b=x.members.map(f=>typeof f=="string"?f:f.uid);Y(k(v,"households",e),{memberUids:b},{merge:!0}).catch(console.error),h(b)}else h(x.memberUids||[]);x.currency&&u(x.currency)},p=>console.error("household listener error:",p))},[e]),l.useEffect(()=>{if(e)return ge(k(v,"households",e,"settings","main"),p=>{if(p.exists()){const x=p.data();n(x.budgets||{}),s(x.savingsGoal||null),c(x.customCategories||[])}else ee(k(v,"households",e)).then(x=>{const y=x.data()||{};n(y.budgets||{}),s(y.savingsGoal||null),c(y.customCategories||[])}).catch(console.error)},p=>console.error("settings listener error:",p))},[e]),{budgets:t,savingsGoal:a,customCategories:r,memberUids:d,currency:i}}function gs(e){const[t,n]=l.useState([]);return l.useEffect(()=>{if(!e){n([]);return}return ge(ae(v,"households",e,"accounts"),a=>n(a.docs.map(s=>({id:s.id,...s.data()}))),a=>console.error("accounts listener error:",a))},[e]),t}function fs(e){const[t,n]=(e||"").split("-").map(Number);return{y:t,m:n}}function ys(e,t,n,a){return(n-e)*12+(a-t)}function bs(e){const t={};return e.forEach(n=>{if(n.fixed!=="fixed"&&n.fixed!=="bimonthly")return;const a=t[n.name];(!a||n.date>a.lastDate)&&(t[n.name]={name:n.name,category:n.category,fixed:n.fixed,type:n.type,amount:n.amount,lastDate:n.date,recurringMonths:n.recurringMonths||null,recurringUntil:n.recurringUntil||null})}),Object.values(t)}function vs(e,t,n,a,s,r){const c=l.useRef(new Set);l.useEffect(()=>{if(!a||!s||e.length===0)return;const d=`${n}-${t}`;if(c.current.has(d))return;c.current.add(d);const h=bs(e),i=e.filter(p=>{const[x,y]=(p.date||"").split("-").map(Number);return y-1===t&&x===n}),u=`${n}-${String(t+1).padStart(2,"0")}-01`;h.forEach(async p=>{if(!i.some(y=>y.name===p.name)){if(p.fixed==="bimonthly"){const{y,m:b}=fs(p.lastDate);if(ys(y,b-1,n,t)<2)return}if(!(p.recurringUntil&&`${n}-${String(t+1).padStart(2,"0")}`>p.recurringUntil))try{await on(a,{name:p.name,amount:p.amount,category:p.category,date:u,fixed:p.fixed,type:p.type,note:"הועבר אוטומטית",recurringMonths:p.recurringMonths,recurringUntil:p.recurringUntil},s)}catch(y){console.error("auto-recurring:",y)}}})},[t,n,a])}function xs(e){const[t,n]=l.useState(void 0);l.useEffect(()=>{if(!(e!=null&&e.uid)){n(null);return}return ge(k(v,"subscriptions",e.uid),async d=>{if(!d.exists()){try{const h=new Date(Date.now()+5184e6).toISOString();await Y(k(v,"subscriptions",e.uid),{uid:e.uid,plan:"premium",status:"trial",trialEndsAt:h,createdAt:new Date().toISOString()})}catch(h){console.error("trial create error:",h),n(null)}return}n(d.data())},d=>{console.error("subscription listener error:",d),n(null)})},[e==null?void 0:e.uid]);const a=typeof window<"u"&&localStorage.getItem("budgi-force-free")==="1",s=a?!1:t===void 0?!0:(t==null?void 0:t.status)==="active"||(t==null?void 0:t.status)==="trial"&&new Date(t.trialEndsAt)>new Date,r=a?3:(t==null?void 0:t.status)==="trial"?Math.max(0,Math.ceil((new Date(t.trialEndsAt)-Date.now())/864e5)):null,c=a?"trial":(t==null?void 0:t.status)??null;return{isPremium:s,status:c,trialDaysLeft:r,subscription:t}}const $e=["housing","food","transport","kids","health","education","clothing","coffee","dining","leisure","sport","telecom","travel","shopping","insurance","pets","savings","cosmetics","home_maintenance","income","other"];function ws(e){return $e.map(t=>({value:t,label:e(`categories.${t}`)}))}function ks(e){return e("months",{returnObjects:!0})}/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const an=(...e)=>e.filter((t,n,a)=>!!t&&t.trim()!==""&&a.indexOf(t)===n).join(" ").trim();/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ss=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const js=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,n,a)=>a?a.toUpperCase():n.toLowerCase());/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pt=e=>{const t=js(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Me={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cs=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},Es=l.createContext({}),Ns=()=>l.useContext(Es),Is=l.forwardRef(({color:e,size:t,strokeWidth:n,absoluteStrokeWidth:a,className:s="",children:r,iconNode:c,...d},h)=>{const{size:i=24,strokeWidth:u=2,absoluteStrokeWidth:p=!1,color:x="currentColor",className:y=""}=Ns()??{},b=a??p?Number(n??u)*24/Number(t??i):n??u;return l.createElement("svg",{ref:h,...Me,width:t??i??Me.width,height:t??i??Me.height,stroke:e??x,strokeWidth:b,className:an("lucide",y,s),...!r&&!Cs(d)&&{"aria-hidden":"true"},...d},[...c.map(([f,T])=>l.createElement(f,T)),...Array.isArray(r)?r:[r]])});/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=(e,t)=>{const n=l.forwardRef(({className:a,...s},r)=>l.createElement(Is,{ref:r,iconNode:t,className:an(`lucide-${Ss(pt(e))}`,`lucide-${e}`,a),...s}));return n.displayName=pt(e),n};/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const As=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],Ts=V("chevron-up",As);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ds=[["path",{d:"M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",key:"1vdc57"}],["path",{d:"M5 21h14",key:"11awu3"}]],Ps=V("crown",Ds);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _s=[["path",{d:"M10 18v-7",key:"wt116b"}],["path",{d:"M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z",key:"1m329m"}],["path",{d:"M14 18v-7",key:"vav6t3"}],["path",{d:"M18 18v-7",key:"aexdmj"}],["path",{d:"M3 22h18",key:"8prr45"}],["path",{d:"M6 18v-7",key:"1ivflk"}]],Ms=V("landmark",_s);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ls=[["path",{d:"m5 8 6 6",key:"1wu5hv"}],["path",{d:"m4 14 6-6 2-3",key:"1k1g8d"}],["path",{d:"M2 5h12",key:"or177f"}],["path",{d:"M7 2h1",key:"1t2jsx"}],["path",{d:"m22 22-5-10-5 10",key:"don7ne"}],["path",{d:"M14 18h6",key:"1m8k6r"}]],Os=V("languages",Ls);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rs=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],sn=V("layout-dashboard",Rs);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bs=[["path",{d:"M11 5h10",key:"1cz7ny"}],["path",{d:"M11 12h10",key:"1438ji"}],["path",{d:"M11 19h10",key:"11t30w"}],["path",{d:"M4 4h1v5",key:"10yrso"}],["path",{d:"M4 9h2",key:"r1h2o0"}],["path",{d:"M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02",key:"xtkcd5"}]],rn=V("list-ordered",Bs);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $s=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],Fs=V("log-out",$s);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ws=[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]],cn=V("message-circle",Ws);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Us=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],Hs=V("refresh-cw",Us);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zs=[["path",{d:"M12 3v18",key:"108xh3"}],["path",{d:"m19 8 3 8a5 5 0 0 1-6 0zV7",key:"zcdpyk"}],["path",{d:"M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1",key:"1yorad"}],["path",{d:"m5 8 3 8a5 5 0 0 1-6 0zV7",key:"eua70x"}],["path",{d:"M7 21h10",key:"1b0cd5"}]],ln=V("scale",zs);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ks=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],dn=V("settings",Ks);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vs=[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]],un=V("trending-up",Vs);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gs=[["path",{d:"M11.5 15H7a4 4 0 0 0-4 4v2",key:"15lzij"}],["path",{d:"M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",key:"1817ys"}],["circle",{cx:"10",cy:"7",r:"4",key:"e45bow"}]],qs=V("user-pen",Gs),Ys=["feature1","feature2","feature3"],Js=/^[a-zA-Z0-9_\u0590-\u05FF]{2,20}$/,Zs=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function hn(e){let t=0;return e.length>=8&&t++,e.length>=12&&t++,/[A-Z]/.test(e)&&t++,/[0-9]/.test(e)&&t++,/[^a-zA-Z0-9\u0590-\u05FF]/.test(e)&&t++,t}function Xs({password:e}){const{t}=G();if(!e)return null;const n=hn(e),a=[t("login.strengthVeryWeak"),t("login.strengthWeak"),t("login.strengthFair"),t("login.strengthGood"),t("login.strengthStrong")],s=["#c0392b","#e67e22","#f1c40f","#27ae60","#2D6A4F"];return o.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[o.jsx("div",{style:{display:"flex",gap:3},children:[1,2,3,4,5].map(r=>o.jsx("div",{style:{flex:1,height:4,borderRadius:2,background:n>=r?s[Math.min(n,5)-1]:"var(--border)",transition:"background 0.2s"}},r))}),o.jsx("div",{style:{fontSize:11,color:n>=3?"var(--text2)":"#c0392b",textAlign:"start"},children:a[Math.min(n,4)]})]})}function pe({msg:e}){return e?o.jsx("div",{style:{fontSize:11,color:"#c0392b",marginTop:-6,textAlign:"start"},children:e}):null}function Qs(){return o.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",style:{flexShrink:0},children:[o.jsx("path",{fill:"#4285F4",d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"}),o.jsx("path",{fill:"#34A853",d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"}),o.jsx("path",{fill:"#FBBC05",d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"}),o.jsx("path",{fill:"#EA4335",d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"})]})}function er({onNewUser:e}){const{t,i18n:n}=G(),[a,s]=l.useState(""),[r,c]=l.useState(""),[d,h]=l.useState(!1),[i,u]=l.useState(!1),[p,x]=l.useState(!1),[y,b]=l.useState(""),[f,T]=l.useState(""),[R,D]=l.useState(""),[I,C]=l.useState(""),[E,P]=l.useState(""),[N,_]=l.useState({}),M=w=>_(H=>({...H,[w]:!0})),B=n.language==="he";function $(){const w=B?"en":"he";n.changeLanguage(w),localStorage.setItem("budgi-lang",w),document.body.dir=w==="he"?"rtl":"ltr"}const j={username:Js.test(y.trim())?"":t("login.errorUsernameChars"),displayName:f.trim().length<2?t("login.errorDisplayName"):"",email:Zs.test(R.trim())?"":t("login.errorEmailFormat"),password:hn(I)<2?t("login.errorWeakPassword"):"",confirm:I!==E?t("login.errorPasswordMatch"):""},U=i?!j.username&&!j.displayName&&!j.email&&!j.password&&!j.confirm:!j.username&&I.length>=1;async function F(){s(""),c("google");try{await Et(W,ut)}catch(w){if(w.code==="auth/popup-blocked"||w.code==="auth/popup-closed-by-user")try{await Nn(W,ut)}catch(H){s(t("login.errorGeneric")+H.message)}else w.code==="auth/unauthorized-domain"?s(t("login.errorDomain")):s(t("login.errorGeneric")+w.message)}finally{c("")}}async function ie(w){if(w.preventDefault(),_(i?{username:!0,displayName:!0,email:!0,password:!0,confirm:!0}:{username:!0,password:!0}),!!U){s(""),c("manual");try{const A=y.trim().toLowerCase();if(i){if(await ts(A)){s(t("login.errorUsernameTaken"));return}const z=`${A}@budgi.internal`;e==null||e();const Z=await In(W,z,I);await Nt(Z.user,{displayName:f.trim()}),await ns(A,Z.user.uid)}else{if(!await os(A)){s(t("login.errorUsernameNotFound"));return}const z=`${A}@budgi.internal`;await An(W,z,I)}}catch(A){A.code==="auth/wrong-password"||A.code==="auth/invalid-credential"?s(t("login.errorWrongPassword")):s(t("login.errorGeneric")+A.message)}finally{c("")}}}function J(w){u(w),h(!0),s(""),b(""),T(""),D(""),C(""),P(""),_({})}return o.jsxs("div",{className:"login-screen",dir:B?"rtl":"ltr",children:[o.jsx("button",{className:"login-lang-btn",onClick:$,children:B?"EN":"עב"}),o.jsxs("div",{className:"login-hero",children:[o.jsxs("svg",{width:"72",height:"56",viewBox:"0 0 72 56",fill:"none",style:{marginBottom:4},children:[o.jsx("rect",{x:"4",y:"20",width:"24",height:"30",rx:"4",fill:"#F4EBD0",stroke:"#D6C9A8",strokeWidth:"1.2"}),o.jsx("rect",{x:"32",y:"10",width:"24",height:"40",rx:"4",fill:"#F4EBD0",stroke:"#D6C9A8",strokeWidth:"1.2"}),o.jsx("rect",{x:"4",y:"28",width:"24",height:"4",rx:"2",fill:"#2D6A4F",opacity:"0.7"}),o.jsx("rect",{x:"32",y:"18",width:"24",height:"4",rx:"2",fill:"#2D6A4F",opacity:"0.9"}),o.jsx("rect",{x:"32",y:"26",width:"14",height:"4",rx:"2",fill:"#2D6A4F",opacity:"0.5"}),o.jsx("circle",{cx:"60",cy:"14",r:"10",fill:"#2D6A4F",opacity:"0.12"}),o.jsx("path",{d:"M54 14 L58 18 L66 10",stroke:"#2D6A4F",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",opacity:"0.8"})]}),o.jsxs("div",{className:"login-wordmark",dir:"ltr",children:[o.jsx("span",{className:"login-wordmark-b",children:"B"}),o.jsx("span",{className:"login-wordmark-rest",children:"udgi"})]}),o.jsx("div",{className:"login-tagline",children:t("login.tagline")})]}),o.jsxs("div",{className:"login-card",children:[d?o.jsxs("form",{onSubmit:ie,noValidate:!0,style:{display:"flex",flexDirection:"column",gap:8,width:"100%"},children:[o.jsx("div",{className:"login-form-title",children:t(i?"login.createAccount":"login.signInManual")}),o.jsx("input",{className:`form-input${N.username&&j.username?" input-error":""}`,placeholder:t("login.usernameLabel"),value:y,onChange:w=>b(w.target.value),onBlur:()=>M("username"),autoFocus:!0,autoCapitalize:"none",autoCorrect:"off",dir:"ltr"}),N.username&&o.jsx(pe,{msg:j.username}),i&&o.jsxs(o.Fragment,{children:[o.jsx("input",{className:`form-input${N.displayName&&j.displayName?" input-error":""}`,placeholder:t("login.displayNamePlaceholder"),value:f,onChange:w=>T(w.target.value),onBlur:()=>M("displayName")}),N.displayName&&o.jsx(pe,{msg:j.displayName}),o.jsx("input",{className:`form-input${N.email&&j.email?" input-error":""}`,type:"email",placeholder:t("login.emailPlaceholder"),value:R,onChange:w=>D(w.target.value),onBlur:()=>M("email"),dir:"ltr"}),N.email&&o.jsx(pe,{msg:j.email})]}),o.jsxs("div",{style:{position:"relative"},children:[o.jsx("input",{className:`form-input${N.password&&j.password?" input-error":""}`,type:p?"text":"password",placeholder:t("login.passwordLabel"),value:I,onChange:w=>C(w.target.value),onBlur:()=>M("password"),dir:"ltr",style:{paddingInlineEnd:44}}),o.jsx("button",{type:"button",onClick:()=>x(w=>!w),style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"var(--text3)",fontSize:13,padding:4},tabIndex:-1,children:p?"🙈":"👁"})]}),i&&o.jsx(Xs,{password:I}),N.password&&!i&&o.jsx(pe,{msg:j.password}),i&&o.jsxs(o.Fragment,{children:[o.jsx("div",{style:{position:"relative"},children:o.jsx("input",{className:`form-input${N.confirm&&j.confirm?" input-error":""}`,type:p?"text":"password",placeholder:t("login.passwordConfirmLabel"),value:E,onChange:w=>P(w.target.value),onBlur:()=>M("confirm"),dir:"ltr",style:{paddingInlineEnd:44}})}),N.confirm&&o.jsx(pe,{msg:j.confirm})]}),o.jsx("button",{className:"login-provider-btn login-provider-manual",type:"submit",disabled:!!r,style:{marginTop:6},children:r==="manual"?"...":t(i?"login.createAccount":"login.signInBtn")}),o.jsx("button",{type:"button",className:"login-switch-link",onClick:()=>J(!i),children:t(i?"login.switchToSignIn":"login.switchToCreate")}),o.jsxs("button",{type:"button",className:"login-switch-link",onClick:()=>{h(!1),s("")},children:["← ",t("login.backToOptions")]})]}):o.jsxs(o.Fragment,{children:[o.jsxs("button",{className:"login-provider-btn",onClick:F,disabled:!!r,children:[o.jsx(Qs,{})," ",r==="google"?"...":t("login.signInGoogle")]}),o.jsx("div",{className:"login-or",children:o.jsx("span",{children:t("login.orDivider")})}),o.jsx("button",{className:"login-provider-btn login-provider-manual",onClick:()=>J(!1),disabled:!!r,children:t("login.signInManual")}),o.jsx("button",{className:"login-provider-btn login-provider-create",onClick:()=>J(!0),disabled:!!r,children:t("login.createAccount")})]}),a&&o.jsx("div",{className:"login-error",children:a}),o.jsx("div",{className:"login-hint",children:t("login.hint")})]}),!d&&o.jsx("div",{className:"login-features",children:Ys.map(w=>o.jsxs("div",{className:"login-feature-row",children:[o.jsx("span",{className:"login-feature-check",children:"✓"}),o.jsx("span",{children:t(`login.${w}`)})]},w))}),o.jsx("div",{className:"login-footer",children:t("login.footer")})]})}function gt(){const{i18n:e}=G(),t=e.language==="he";function n(){const a=t?"en":"he";e.changeLanguage(a),localStorage.setItem("budgi-lang",a),document.body.dir=a==="he"?"rtl":"ltr"}return o.jsx("button",{className:"login-lang-btn",onClick:n,children:t?"EN":"עב"})}function tr({user:e,onComplete:t}){const{t:n}=G(),[a,s]=l.useState("choose"),[r,c]=l.useState(""),[d,h]=l.useState(""),[i,u]=l.useState(""),[p,x]=l.useState(!1);async function y(){x(!0),u("");try{const{householdId:f,inviteCode:T}=await is(e);c(T),s("created"),t(f)}catch(f){u(n("household.errorCreate")+f.message)}finally{x(!1)}}async function b(){if(d.trim()){x(!0),u("");try{const f=await cs(e,d);t(f)}catch(f){u(f.message==="REQUIRES_PREMIUM"?n("household.errorJoinPremium"):f.message||n("household.errorJoin"))}finally{x(!1)}}}if(a==="choose")return o.jsxs("div",{className:"household-screen",children:[o.jsx(gt,{}),o.jsx("div",{style:{fontSize:48},children:"🏠"}),o.jsx("h2",{children:n("household.welcome")}),o.jsx("p",{children:n("household.chooseDesc")}),o.jsxs("div",{className:"household-actions",children:[o.jsx("button",{className:"btn-primary",onClick:y,disabled:p,children:n(p?"household.creating":"household.create")}),o.jsx("div",{className:"divider",children:n("household.or")}),o.jsx("button",{className:"btn-secondary",onClick:()=>s("join"),children:n("household.join")})]}),i&&o.jsx("div",{className:"login-error",children:i}),o.jsx("button",{onClick:()=>Re(W),style:{marginTop:24,background:"none",border:"none",color:"var(--text3)",fontSize:13,cursor:"pointer",textDecoration:"underline"},children:n("header.signOut")})]});if(a==="created")return o.jsxs("div",{className:"household-screen",children:[o.jsx("div",{style:{fontSize:48},children:"🎉"}),o.jsx("h2",{children:n("household.created")}),o.jsx("p",{children:n("household.createdDesc")}),o.jsxs("div",{className:"invite-code-display",children:[o.jsx("p",{children:n("household.inviteLabel")}),o.jsx("div",{className:"code",children:r}),o.jsx("p",{children:n("household.inviteHint")})]}),o.jsx("p",{style:{fontSize:13,color:"var(--text2)",textAlign:"center"},children:n("household.autoLogin")})]});if(a==="join")return o.jsxs("div",{className:"household-screen",children:[o.jsx(gt,{}),o.jsx("div",{style:{fontSize:48},children:"🔑"}),o.jsx("h2",{children:n("household.joinTitle")}),o.jsx("p",{children:n("household.joinDesc")}),o.jsxs("div",{className:"join-form",children:[o.jsx("input",{className:"form-input",placeholder:n("household.joinPlaceholder"),value:d,onChange:f=>h(f.target.value.toUpperCase()),maxLength:6,style:{textAlign:"center",letterSpacing:4,fontSize:20}}),i&&o.jsx("div",{className:"login-error",children:i}),o.jsx("button",{className:"btn-primary",onClick:b,disabled:p||!d.trim(),children:n(p?"household.joining":"household.joinBtn")}),o.jsx("button",{className:"btn-secondary",onClick:()=>{s("choose"),u("")},children:n("household.back")})]})]})}function nr({onContinue:e}){const{t}=G(),n=l.useRef(e);return n.current=e,l.useEffect(()=>{const a=setTimeout(()=>n.current(),5e3);return()=>clearTimeout(a)},[]),o.jsx("div",{className:"welcome-screen",onClick:()=>n.current(),children:o.jsxs("div",{className:"welcome-content",children:[o.jsxs("svg",{width:"80",height:"80",viewBox:"0 0 80 80",fill:"none",className:"welcome-check",children:[o.jsx("circle",{cx:"40",cy:"40",r:"38",stroke:"#2D6A4F",strokeWidth:"3",fill:"#F4EBD0"}),o.jsx("path",{d:"M22 40L34 52L58 28",stroke:"#2D6A4F",strokeWidth:"4",strokeLinecap:"round",strokeLinejoin:"round"})]}),o.jsxs("div",{className:"welcome-wordmark",dir:"ltr",children:[o.jsx("span",{style:{fontWeight:700,color:"var(--accent)"},children:"B"}),o.jsx("span",{style:{color:"var(--text1)"},children:"udgi"})]}),o.jsx("h1",{className:"welcome-headline",children:t("welcome.headline")}),o.jsx("p",{className:"welcome-sub",children:t("welcome.sub")}),o.jsx("button",{className:"welcome-btn",onClick:a=>{a.stopPropagation(),n.current()},children:t("welcome.continue")}),o.jsx("p",{className:"welcome-hint",children:"לחצו בכל מקום להמשך"})]})})}const or=[{code:"ILS",symbol:"₪",flag:"🇮🇱",name:"שקל ישראלי",nameEn:"Israeli Shekel"},{code:"USD",symbol:"$",flag:"🇺🇸",name:"דולר אמריקאי",nameEn:"US Dollar"},{code:"EUR",symbol:"€",flag:"🇪🇺",name:"אירו",nameEn:"Euro"},{code:"GBP",symbol:"£",flag:"🇬🇧",name:"לירה שטרלינג",nameEn:"British Pound"},{code:"JPY",symbol:"¥",flag:"🇯🇵",name:"ין יפני",nameEn:"Japanese Yen"},{code:"CAD",symbol:"$",flag:"🇨🇦",name:"דולר קנדי",nameEn:"Canadian Dollar"},{code:"AUD",symbol:"$",flag:"🇦🇺",name:"דולר אוסטרלי",nameEn:"Australian Dollar"},{code:"CHF",symbol:"Fr",flag:"🇨🇭",name:"פרנק שוויצרי",nameEn:"Swiss Franc"},{code:"CNY",symbol:"¥",flag:"🇨🇳",name:"יואן סיני",nameEn:"Chinese Yuan"},{code:"INR",symbol:"₹",flag:"🇮🇳",name:"רופי הודי",nameEn:"Indian Rupee"},{code:"MXN",symbol:"$",flag:"🇲🇽",name:"פסו מקסיקני",nameEn:"Mexican Peso"},{code:"BRL",symbol:"R$",flag:"🇧🇷",name:"ריאל ברזילאי",nameEn:"Brazilian Real"},{code:"KRW",symbol:"₩",flag:"🇰🇷",name:"וון קוריאני",nameEn:"Korean Won"},{code:"SGD",symbol:"$",flag:"🇸🇬",name:"דולר סינגפורי",nameEn:"Singapore Dollar"},{code:"HKD",symbol:"$",flag:"🇭🇰",name:"דולר הונג קונג",nameEn:"Hong Kong Dollar"},{code:"NOK",symbol:"kr",flag:"🇳🇴",name:"כתר נורווגי",nameEn:"Norwegian Krone"},{code:"SEK",symbol:"kr",flag:"🇸🇪",name:"כתר שוודי",nameEn:"Swedish Krona"},{code:"DKK",symbol:"kr",flag:"🇩🇰",name:"כתר דני",nameEn:"Danish Krone"},{code:"PLN",symbol:"zł",flag:"🇵🇱",name:"זלוטי פולני",nameEn:"Polish Złoty"},{code:"TRY",symbol:"₺",flag:"🇹🇷",name:"לירה טורקית",nameEn:"Turkish Lira"},{code:"AED",symbol:"د.إ",flag:"🇦🇪",name:"דירהם אמירתי",nameEn:"UAE Dirham"}];function ft({onSelect:e}){const{t,i18n:n}=G(),[a,s]=l.useState(""),[r,c]=l.useState("ILS"),d=n.language==="he",h=or.filter(i=>{const u=a.toLowerCase();return i.code.toLowerCase().includes(u)||i.nameEn.toLowerCase().includes(u)||i.name.includes(u)||i.symbol.includes(u)});return o.jsx("div",{className:"currency-picker-screen",children:o.jsxs("div",{className:"currency-picker-card",children:[o.jsxs("div",{className:"currency-picker-header",children:[o.jsx("h2",{children:t("currency.title")}),o.jsx("p",{children:t("currency.sub")})]}),o.jsx("input",{className:"form-input currency-search",placeholder:t("currency.search"),value:a,onChange:i=>s(i.target.value),autoFocus:!0,dir:"auto"}),o.jsx("div",{className:"currency-list",children:h.map(i=>o.jsxs("button",{className:`currency-item${r===i.code?" selected":""}`,onClick:()=>c(i.code),children:[o.jsx("span",{className:"currency-flag",children:i.flag}),o.jsx("span",{className:"currency-name",children:d?i.name:i.nameEn}),o.jsxs("span",{className:"currency-code",dir:"ltr",children:[i.symbol," ",i.code]})]},i.code))}),o.jsxs("div",{className:"currency-actions",children:[o.jsx("button",{className:"btn-primary",onClick:()=>e(r),children:t("currency.confirm")}),o.jsx("button",{className:"btn-secondary",onClick:()=>e("ILS"),children:t("currency.skip")})]})]})})}const be=[{target:"summary-cards",titleKey:"tour.step1Title",msgKey:"tour.step1",placement:"below"},{target:"month-nav",titleKey:"tour.step2Title",msgKey:"tour.step2",placement:"below"},{target:"fab",titleKey:"tour.step3Title",msgKey:"tour.step3",placement:"above"},{target:"nav",titleKey:"tour.step4Title",msgKey:"tour.step4",placement:"above"},{target:null,titleKey:"tour.step5Title",msgKey:"tour.step5",placement:null}],Le=240,yt=130,bt=16,vt=68,ve=8;function ar(e){const t=document.querySelector(`[data-tour="${e}"]`);return t?t.getBoundingClientRect():null}function sr({onDone:e}){const{t}=G(),[n,a]=l.useState(0),[s,r]=l.useState(null),c=be[n],d=l.useCallback(()=>r(ar(c.target)),[c.target]);l.useEffect(()=>(d(),window.addEventListener("resize",d),()=>window.removeEventListener("resize",d)),[d]);function h(){localStorage.setItem("budgi-tour-done","1"),e()}function i(){n<be.length-1?a(E=>E+1):h()}if(c.target===null){const E=/iphone|ipad|ipod/i.test(navigator.userAgent),P=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone;return me.createPortal(o.jsx("div",{className:"tour-overlay",style:{display:"flex",alignItems:"center",justifyContent:"center",padding:24},onClick:h,children:o.jsxs("div",{className:"tour-tooltip",style:{position:"relative",left:"auto",top:"auto",transform:"none",width:"100%",maxWidth:320},onClick:N=>N.stopPropagation(),children:[o.jsx("div",{style:{fontSize:28,textAlign:"center",marginBottom:8},children:"🔔"}),o.jsx("div",{className:"tour-tooltip-title",style:{textAlign:"center"},children:t(c.titleKey)}),o.jsx("div",{className:"tour-tooltip-msg",children:t(c.msgKey)}),E&&!P&&o.jsxs("div",{style:{background:"#fffbeb",border:"1px solid #fcd34d",borderRadius:8,padding:"10px 12px",marginTop:10,fontSize:11,color:"#92400e"},children:[o.jsx("div",{style:{fontWeight:700,marginBottom:4},children:t("notifications.iosTitle")}),o.jsxs("ol",{style:{margin:0,paddingInlineStart:16,lineHeight:1.9},children:[o.jsxs("li",{children:[t("notifications.iosStep1")," ",o.jsx("span",{style:{fontSize:13},children:"⎋"})]}),o.jsx("li",{children:t("notifications.iosStep2")}),o.jsx("li",{children:t("notifications.iosStep3")})]})]}),o.jsxs("div",{className:"tour-tooltip-footer",children:[o.jsx("span",{}),o.jsxs("span",{className:"tour-counter",children:[n+1,"/",be.length]}),o.jsx("button",{className:"tour-next",onClick:h,children:t("tour.finish")})]})]})}),document.body)}if(!s)return null;const u=c.placement==="above",p={left:s.left-ve,top:s.top-ve,width:s.width+ve*2,height:s.height+ve*2},x=s.left+s.width/2,y=Math.min(Math.max(x-Le/2,bt),window.innerWidth-Le-bt),b=p.top+p.height,f=u?p.top-vt-yt:b+vt,R=y+Le/2,D=u?f+yt+4:f-4,I=x,C=u?p.top-4:b+4;return me.createPortal(o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"tour-overlay",onClick:h}),o.jsx("div",{className:"tour-spotlight",style:{left:p.left,top:p.top,width:p.width,height:p.height},onClick:E=>E.stopPropagation()}),o.jsx(rr,{tailX:R,tailY:D,tipX:I,tipY:C,isAbove:u}),o.jsxs("div",{className:"tour-tooltip",style:{left:y,top:f,transform:"none"},onClick:E=>E.stopPropagation(),children:[o.jsx("div",{className:"tour-tooltip-title",children:t(c.titleKey)}),o.jsx("div",{className:"tour-tooltip-msg",children:t(c.msgKey)}),o.jsxs("div",{className:"tour-tooltip-footer",children:[o.jsx("button",{className:"tour-skip",onClick:h,children:t("tour.skip")}),o.jsxs("span",{className:"tour-counter",children:[n+1,"/",be.length]}),o.jsx("button",{className:"tour-next",onClick:i,children:t("tour.next")})]})]})]}),document.body)}function rr({tailX:e,tailY:t,tipX:n,tipY:a,isAbove:s}){const r=(t+a)/2,c=(n-e)*.5+(s?-20:20),d=e+c*.6,h=s?r+10:r-10,i=n-c*.3,u=s?r-10:r+10,p=`M ${e} ${t} C ${d} ${h}, ${i} ${u}, ${n} ${a}`;return o.jsxs("svg",{style:{position:"fixed",inset:0,width:"100vw",height:"100vh",pointerEvents:"none",zIndex:10001,overflow:"visible"},children:[o.jsx("defs",{children:o.jsx("marker",{id:"ca",markerWidth:"10",markerHeight:"10",refX:"9",refY:"5",orient:"auto",children:o.jsx("path",{d:"M 0 0 L 10 5 L 0 10 Z",fill:"#F4D03F",stroke:"#1C1917",strokeWidth:"1",strokeLinejoin:"round"})})}),o.jsx("path",{d:p,stroke:"#1C1917",strokeWidth:"7",fill:"none",strokeLinecap:"round"}),o.jsx("path",{d:p,stroke:"#F4D03F",strokeWidth:"4.5",fill:"none",strokeLinecap:"round",markerEnd:"url(#ca)"})]})}function xt({fullscreen:e=!1}){return e?o.jsx("div",{className:"loader-overlay",children:o.jsx(wt,{})}):o.jsx("div",{className:"loader-inline",children:o.jsx(wt,{small:!0})})}function wt({small:e}){const t=e?22:34,n=e?36:56;return o.jsxs("div",{className:"loader-mark",style:{width:n,height:n},children:[o.jsxs("svg",{className:"loader-ring",viewBox:`0 0 ${n} ${n}`,width:n,height:n,style:{position:"absolute",inset:0},children:[o.jsx("circle",{cx:n/2,cy:n/2,r:n/2-2.5,fill:"none",stroke:"var(--border)",strokeWidth:"2.5"}),o.jsx("circle",{className:"loader-arc",cx:n/2,cy:n/2,r:n/2-2.5,fill:"none",stroke:"var(--accent)",strokeWidth:"2.5",strokeLinecap:"round",strokeDasharray:Math.PI*(n-5),strokeDashoffset:Math.PI*(n-5)*.75})]}),o.jsx("span",{className:"loader-letter",style:{fontSize:t,lineHeight:`${n}px`},children:"B"})]})}function ir(){const[e,t]=l.useState(!1);return l.useEffect(()=>{function n(){t(window.scrollY>300)}return window.addEventListener("scroll",n,{passive:!0}),()=>window.removeEventListener("scroll",n)},[]),e?me.createPortal(o.jsx("button",{className:"scroll-top-btn",onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),"aria-label":"Back to top",children:o.jsx(Ts,{size:18,strokeWidth:2.5})}),document.body):null}function cr({user:e,currentMonth:t,currentYear:n,onMonthChange:a,isPremium:s,subStatus:r,trialDaysLeft:c,onNavigate:d}){var ne,ce,oe;const{t:h,i18n:i}=G(),u=i.language==="he"?"he":"en";function p(){const g=i.language==="he"?"en":"he";i.changeLanguage(g),localStorage.setItem("budgi-lang",g)}const[x,y]=l.useState(!1),[b,f]=l.useState(!1),[T,R]=l.useState(""),[D,I]=l.useState(""),[C,E]=l.useState(""),[P,N]=l.useState(""),[_,M]=l.useState(!1),[B,$]=l.useState(""),[j,U]=l.useState(!1),F=((ce=(ne=e==null?void 0:e.providerData)==null?void 0:ne[0])==null?void 0:ce.providerId)==="google.com";async function ie(){if(y(!1),R((e==null?void 0:e.displayName)||""),E(""),N(""),$(""),!F&&(e!=null&&e.uid)){const g=await as(e.uid);I((g==null?void 0:g.email)||"")}f(!0)}async function J(){M(!0),$("");try{if(T.trim()&&T.trim()!==e.displayName&&await Nt(W.currentUser,{displayName:T.trim()}),!F&&D.trim()){if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(D.trim()))throw new Error(u==="he"?"כתובת מייל לא תקינה":"Invalid email address");await ss(e.uid,D.trim())}if(!F&&P){if(P.length<6)throw new Error(u==="he"?"סיסמה חייבת להכיל לפחות 6 תווים":"Password must be at least 6 characters");if(!C)throw new Error(u==="he"?"יש להזין סיסמה נוכחית לאימות":"Current password required to change password");const g=Tn.credential(W.currentUser.email,C);await Dn(W.currentUser,g),await Pn(W.currentUser,P),E(""),N("")}f(!1),U(!0),setTimeout(()=>U(!1),2500)}catch(g){const K=g.code==="auth/wrong-password"||g.code==="auth/invalid-credential"?u==="he"?"סיסמה נוכחית שגויה":"Incorrect current password":g.message;$(K)}finally{M(!1)}}const w=ks(h),H=l.useMemo(()=>{const g=[],K=new Date,X=K.getFullYear()-3,m=K.getFullYear()+1;for(let L=m;L>=X;L--){const S=L===m?K.getMonth()+1:11;for(let Q=S;Q>=0;Q--)g.push({month:Q,year:L,label:`${w[Q]} ${L}`})}return g},[w]),A=l.useRef(null),q=`${n}-${t}`;l.useEffect(()=>{function g(K){A.current&&!A.current.contains(K.target)&&y(!1)}return document.addEventListener("mousedown",g),()=>document.removeEventListener("mousedown",g)},[]);async function z(){y(!1),await Re(W);const g=new jt;g.setCustomParameters({prompt:"select_account"});try{await Et(W,g)}catch{}}function Z(g){const[K,X]=g.target.value.split("-").map(Number);a(X,K)}return o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"app-header",children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14},children:[o.jsxs("div",{className:"app-logo",dir:"ltr",style:{gap:0,cursor:"pointer"},onClick:()=>d("dashboard"),children:[o.jsx("span",{style:{fontWeight:700,color:"var(--accent)"},children:"B"}),o.jsx("span",{style:{fontWeight:400,color:"var(--text)"},children:"udgi"})]}),r==="active"&&o.jsx("button",{onClick:()=>d("settings"),className:"header-sub-badge",style:{alignItems:"center",gap:5,background:"var(--accent)",color:"#fff",border:"none",borderRadius:20,padding:"5px 14px",fontSize:14,fontWeight:700,fontFamily:"Heebo,sans-serif",cursor:"pointer",letterSpacing:.3},children:"✦ Pro"}),r==="trial"&&o.jsxs("button",{onClick:()=>d("settings"),className:"header-sub-badge",style:{alignItems:"center",gap:5,background:c<=7?"#fff1f2":"#fffbeb",color:c<=7?"var(--expense)":"#92400e",border:`1.5px solid ${c<=7?"#fca5a5":"#fcd34d"}`,borderRadius:20,padding:"5px 14px",fontSize:14,fontWeight:700,fontFamily:"Heebo,sans-serif",cursor:"pointer",whiteSpace:"nowrap"},children:[c<=7?"⚠ ":"⏳ ",i.language==="he"?`ניסיון · ${c} ימים`:`Trial · ${c}d`]})]}),o.jsxs("div",{className:"header-right",children:[o.jsxs("button",{onClick:p,title:i.language==="he"?"Switch to English":"עברית",className:"header-lang-btn",style:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--radius-pill)",padding:"6px 10px",cursor:"pointer",alignItems:"center",gap:4,fontSize:11,fontWeight:600,color:"var(--text2)",boxShadow:"var(--shadow-xs)",transition:"border-color var(--d) var(--ease)"},children:[o.jsx(Os,{size:13}),i.language==="he"?"EN":"עב"]}),o.jsx("select",{className:"month-selector","data-tour":"month-nav",value:q,onChange:Z,children:H.map(g=>o.jsx("option",{value:`${g.year}-${g.month}`,children:g.label},`${g.year}-${g.month}`))}),o.jsxs("div",{ref:A,style:{position:"relative"},children:[o.jsx("button",{className:"avatar",onClick:()=>y(g=>!g),children:((oe=e==null?void 0:e.displayName)==null?void 0:oe.charAt(0))||"?"}),x&&o.jsxs("div",{style:{position:"absolute",top:40,insetInlineEnd:0,background:"var(--surface)",border:"0.5px solid var(--border)",borderRadius:"var(--radius)",minWidth:180,zIndex:300,overflow:"hidden"},children:[o.jsxs("div",{style:{padding:"12px 14px",borderBottom:"1px solid var(--border)"},children:[o.jsx("div",{style:{fontSize:13,fontWeight:700},children:e==null?void 0:e.displayName}),o.jsx("div",{style:{fontSize:11,color:"var(--text3)",marginTop:2},children:e==null?void 0:e.email})]}),o.jsxs("button",{onClick:ie,style:{width:"100%",padding:"11px 14px",background:"none",border:"none",borderBottom:"0.5px solid var(--border)",color:"var(--text2)",fontSize:13,fontWeight:500,cursor:"pointer",textAlign:"right",fontFamily:"DM Sans,Heebo,sans-serif",display:"flex",alignItems:"center",gap:8},children:[o.jsx(qs,{size:14})," ",u==="he"?"עדכון פרטים":"Edit profile"]}),o.jsxs("button",{onClick:z,style:{width:"100%",padding:"11px 14px",background:"none",border:"none",borderBottom:"0.5px solid var(--border)",color:"var(--text2)",fontSize:13,fontWeight:500,cursor:"pointer",textAlign:"right",fontFamily:"DM Sans,Heebo,sans-serif",display:"flex",alignItems:"center",gap:8},children:[o.jsx(Hs,{size:14})," ",h("header.switchUser")]}),o.jsxs("button",{onClick:()=>{y(!1),Re(W)},style:{width:"100%",padding:"11px 14px",background:"none",border:"none",color:"var(--expense)",fontSize:13,fontWeight:500,cursor:"pointer",textAlign:"right",fontFamily:"DM Sans,Heebo,sans-serif",display:"flex",alignItems:"center",gap:8},children:[o.jsx(Fs,{size:14})," ",h("header.signOut")]})]})]})]})]}),b&&o.jsx("div",{className:"modal-overlay open",style:{alignItems:"center",padding:16},onClick:g=>g.target===g.currentTarget&&f(!1),children:o.jsxs("div",{className:"modal",style:{borderRadius:12,maxWidth:400,width:"100%"},children:[o.jsxs("div",{className:"modal-title",children:[u==="he"?"עדכון פרטים":"Edit profile",o.jsx("button",{className:"modal-close",onClick:()=>f(!1),children:"✕"})]}),o.jsxs("div",{className:"modal-body",style:{display:"flex",flexDirection:"column",gap:14,paddingTop:16},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,marginBottom:4},children:[o.jsx("div",{style:{width:48,height:48,borderRadius:"50%",background:"var(--accent)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:700,color:"#fff",flexShrink:0},children:((e==null?void 0:e.displayName)||"?").charAt(0).toUpperCase()}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:14,fontWeight:600},children:e==null?void 0:e.displayName}),o.jsx("div",{style:{fontSize:12,color:"var(--text3)"},children:e==null?void 0:e.email})]})]}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:12,color:"var(--text3)",marginBottom:4},children:u==="he"?"שם תצוגה":"Display name"}),o.jsx("input",{className:"form-input",value:T,onChange:g=>R(g.target.value)})]}),F?o.jsx("div",{style:{fontSize:12,color:"var(--text3)",background:"var(--surface2)",borderRadius:8,padding:"10px 12px"},children:u==="he"?"🔒 חשבון Google — המייל מנוהל דרך Google":"🔒 Google account — email managed by Google"}):o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:12,color:"var(--text3)",marginBottom:4},children:u==="he"?"מייל לשחזור חשבון":"Recovery email"}),o.jsx("input",{className:"form-input",type:"email",value:D,onChange:g=>I(g.target.value),placeholder:"email@example.com",inputMode:"email",autoComplete:"email"})]}),!F&&o.jsxs(o.Fragment,{children:[o.jsx("div",{style:{height:1,background:"var(--border)"}}),o.jsx("div",{style:{fontSize:13,fontWeight:600,color:"var(--text2)"},children:u==="he"?"שינוי סיסמה":"Change password"}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:12,color:"var(--text3)",marginBottom:4},children:u==="he"?"סיסמה נוכחית (נדרש לשינוי סיסמה)":"Current password (required to change password)"}),o.jsx("input",{className:"form-input",type:"password",value:C,onChange:g=>E(g.target.value),placeholder:"••••••",autoComplete:"current-password"})]}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:12,color:"var(--text3)",marginBottom:4},children:u==="he"?"סיסמה חדשה (אופציונלי)":"New password (optional)"}),o.jsx("input",{className:"form-input",type:"password",value:P,onChange:g=>N(g.target.value),placeholder:"••••••",autoComplete:"new-password"})]})]}),B&&o.jsx("div",{style:{fontSize:13,color:"var(--expense)",fontWeight:500},children:B})]}),o.jsxs("div",{className:"modal-footer",children:[o.jsx("button",{onClick:()=>f(!1),style:{flex:1,height:44,background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:"var(--radius)",fontSize:14,cursor:"pointer",fontFamily:"Heebo,sans-serif",color:"var(--text2)"},children:u==="he"?"ביטול":"Cancel"}),o.jsx("button",{onClick:J,disabled:_,style:{flex:2,height:44,background:"var(--accent)",border:"none",borderRadius:"var(--radius)",fontSize:15,fontWeight:700,fontFamily:"Heebo,sans-serif",color:"#fff",cursor:_?"wait":"pointer",opacity:_?.7:1},children:_?u==="he"?"שומר...":"Saving...":u==="he"?"שמור שינויים":"Save changes"})]})]})}),j&&o.jsx("div",{style:{position:"fixed",inset:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,pointerEvents:"none"},children:o.jsxs("div",{style:{background:"var(--accent)",color:"#fff",borderRadius:14,padding:"16px 28px",fontSize:16,fontFamily:"Heebo,sans-serif",fontWeight:700,boxShadow:"0 8px 32px rgba(0,0,0,0.18)",display:"flex",alignItems:"center",gap:10,animation:"fadeInScale .2s ease"},children:[o.jsx("span",{style:{fontSize:20},children:"✓"}),u==="he"?"הפרטים עודכנו בהצלחה":"Details updated successfully"]})})]})}function lr({activePage:e,onNavigate:t,isPremium:n,subStatus:a}){const{t:s}=G(),r=[{id:"dashboard",Icon:sn,label:s("nav.dashboard")},{id:"entries",Icon:rn,label:s("nav.entries")},{id:"breakeven",Icon:ln,label:s("nav.breakeven")},{id:"insights",Icon:un,label:s("nav.insights")},{id:"bot",Icon:cn,label:"Bot"},{id:"settings",Icon:dn,label:s("nav.settings")}];return o.jsx("nav",{className:"bottom-nav","data-tour":"nav",children:r.map(({id:c,Icon:d,label:h})=>o.jsxs("button",{className:`nav-item${e===c?" active":""}`,onClick:()=>t(c),children:[o.jsxs("span",{style:{position:"relative",display:"inline-flex"},children:[o.jsx(d,{size:20,strokeWidth:1.8}),c==="settings"&&!n&&a!=="active"&&o.jsx(Ps,{size:10,strokeWidth:2,color:"#f59e0b",style:{position:"absolute",top:-4,right:-6}})]}),o.jsx("span",{className:"nav-label",children:h})]},c))})}const dr=["income","other"],ur=["savings","other"],Oe=()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`};function hr(e,t){const[n,a]=e.split("-").map(Number),s=n*12+(a-1)+(t-1);return`${Math.floor(s/12)}-${String(s%12+1).padStart(2,"0")}`}function mr(e){return e==="income"?"income":e==="saving"?"savings":"housing"}function pr(e,t){return t==="income"?e.filter(n=>dr.includes(n.value)||!$e.includes(n.value)):t==="saving"?e.filter(n=>ur.includes(n.value)||!$e.includes(n.value)):e.filter(n=>!["income","savings"].includes(n.value))}function gr({open:e,onClose:t,householdId:n,user:a,entry:s,allCategories:r=[],customCategories:c=[],accounts:d=[],onDelete:h}){const{t:i}=G(),u=!!s,[p,x]=l.useState("expense"),[y,b]=l.useState(""),[f,T]=l.useState(""),[R,D]=l.useState("housing"),[I,C]=l.useState(Oe()),[E,P]=l.useState("variable"),[N,_]=l.useState(""),[M,B]=l.useState(""),[$,j]=l.useState(""),[U,F]=l.useState(!1),[ie,J]=l.useState(!1),[w,H]=l.useState(""),[A,q]=l.useState(""),z=[{value:"fixed",label:i("addEntry.fixedDesc")},{value:"bimonthly",label:i("addEntry.bimonthlyDesc"),expenseOnly:!0},{value:"variable",label:i("addEntry.variableDesc")},{value:"sep",label:i("addEntry.sepDesc"),expenseOnly:!0}].filter(m=>!m.expenseOnly||p==="expense"),Z={expense:i("addEntry.namePlaceholderExpense"),income:i("addEntry.namePlaceholderIncome"),saving:i("addEntry.namePlaceholderSaving")};l.useEffect(()=>{var m,L;s?(x(s.type||"expense"),b(s.name||""),T(((m=s.amount)==null?void 0:m.toString())||""),D(s.category||"housing"),C(s.date||Oe()),P(s.fixed||"variable"),_(s.note||""),B(s.accountId||""),j(((L=s.recurringMonths)==null?void 0:L.toString())||"")):oe()},[s,e]);function ne(m){x(m),D(mr(m))}async function ce(){if(!w.trim())return;const m="custom_"+w.trim().replace(/\s+/g,"_")+"_"+Date.now(),L={value:m,label:w.trim(),icon:A.trim()||"🏷️"};await ls(n,[...c,L]),D(m),H(""),q(""),J(!1)}function oe(){b(""),T(""),_(""),x("expense"),C(Oe()),D("housing"),P("variable"),B(""),j("")}const g=pr(r,p);async function K(){if(!y.trim()||!f||!I){alert(i("addEntry.errorRequired"));return}if(parseFloat(f)<=0){alert(i("addEntry.errorZero"));return}F(!0);try{const m=$?parseInt($):null,L={name:y.trim(),amount:parseFloat(f),category:R,date:I,fixed:E,type:p,note:N.trim(),accountId:M||null,recurringMonths:m,recurringUntil:m&&m>1?hr(I,m):null};u?await ds(n,s.id,L):await on(n,L,a),X()}catch(m){alert(i("addEntry.errorSave")+m.message)}finally{F(!1)}}function X(){oe(),t()}return o.jsx("div",{className:`modal-overlay${e?" open":""}`,onClick:m=>m.target===m.currentTarget&&X(),children:o.jsxs("div",{className:"modal",children:[o.jsxs("div",{className:"modal-title",children:[i(u?"addEntry.editTitle":"addEntry.title"),o.jsx("button",{className:"modal-close",onClick:X,children:"✕"})]}),o.jsxs("div",{className:"modal-body",children:[o.jsx("div",{className:"form-group",children:o.jsx("div",{className:"type-toggle",children:["expense","income","saving"].map(m=>o.jsx("button",{className:`type-btn${p===m?` active ${m}`:""}`,onClick:()=>ne(m),children:i(m==="expense"?"addEntry.expense":m==="income"?"addEntry.income":"addEntry.saving")},m))})}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:i("addEntry.name")}),o.jsx("input",{className:"form-input",placeholder:Z[p],value:y,onChange:m=>b(m.target.value)})]}),o.jsxs("div",{style:{display:"flex",gap:8},children:[o.jsxs("div",{className:"form-group",style:{flex:1},children:[o.jsx("label",{className:"form-label",children:i("addEntry.amount")}),o.jsx("input",{className:"form-input",type:"number",inputMode:"decimal",placeholder:"0",value:f,onChange:m=>T(m.target.value),style:{fontFamily:"DM Mono,monospace"}})]}),o.jsxs("div",{className:"form-group",style:{flex:1},children:[o.jsx("label",{className:"form-label",children:i("addEntry.date")}),o.jsx("input",{className:"form-input",type:"date",value:I,onChange:m=>C(m.target.value)})]})]}),o.jsxs("div",{style:{display:"flex",gap:8},children:[o.jsxs("div",{className:"form-group",style:{flex:1.6},children:[o.jsx("label",{className:"form-label",children:i("addEntry.category")}),o.jsx("select",{className:"form-input",value:R,onChange:m=>D(m.target.value),children:g.map(m=>o.jsxs("option",{value:m.value,children:[m.icon," ",m.label]},m.value))})]}),o.jsxs("div",{className:"form-group",style:{flex:1},children:[o.jsx("label",{className:"form-label",children:i("addEntry.character")}),o.jsx("select",{className:"form-input",value:E,onChange:m=>P(m.target.value),children:z.map(m=>o.jsx("option",{value:m.value,children:m.label},m.value))}),(E==="fixed"||E==="bimonthly")&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{style:{fontSize:10,color:"var(--accent)",marginTop:4,lineHeight:1.4},children:["✦ ",i("addEntry.recurringHint")]}),o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5,marginTop:5},children:[o.jsx("span",{style:{fontSize:10,color:"var(--text2)",whiteSpace:"nowrap"},children:i("addEntry.paymentsLabel")}),o.jsx("input",{type:"number",min:"1",max:"36",className:"form-input",style:{width:52,padding:"4px 6px",fontSize:12,textAlign:"center",fontFamily:"DM Mono,monospace"},placeholder:"∞",value:$,onChange:m=>j(m.target.value)})]})]})]})]}),ie?o.jsxs("div",{style:{display:"flex",gap:6,marginTop:-4,marginBottom:10},children:[o.jsx("input",{className:"form-input",placeholder:"😀",value:A,onChange:m=>q(m.target.value),style:{width:46,textAlign:"center",fontSize:18,padding:"8px 4px"},maxLength:2}),o.jsx("input",{className:"form-input",placeholder:i("addEntry.categoryNamePlaceholder"),value:w,onChange:m=>H(m.target.value),onKeyDown:m=>m.key==="Enter"&&ce(),style:{flex:1},autoFocus:!0}),o.jsx("button",{type:"button",onClick:ce,style:{background:"var(--accent)",border:"none",color:"#fff",borderRadius:8,padding:"0 12px",cursor:"pointer",fontSize:13},children:"✓"}),o.jsx("button",{type:"button",onClick:()=>J(!1),style:{background:"var(--surface3)",border:"none",color:"var(--text2)",borderRadius:8,padding:"0 10px",cursor:"pointer",fontSize:13},children:"✕"})]}):o.jsx("button",{type:"button",onClick:()=>J(!0),style:{marginTop:-4,marginBottom:10,background:"none",border:"none",color:"var(--accent)",fontSize:12,cursor:"pointer",padding:0,display:"block"},children:i("addEntry.addNewCategory")}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:i("addEntry.note")}),o.jsx("input",{className:"form-input",placeholder:i("addEntry.notePlaceholder"),value:N,onChange:m=>_(m.target.value)})]}),d.length>0&&o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:i("accounts.nav")}),o.jsxs("select",{className:"form-input",value:M,onChange:m=>B(m.target.value),children:[o.jsx("option",{value:"",children:i("accounts.noAccount")}),d.map(m=>o.jsx("option",{value:m.id,children:m.name},m.id))]})]})]}),o.jsxs("div",{className:"modal-footer",children:[u&&h&&o.jsx("button",{onClick:()=>{X(),h(s.id)},style:{flex:"0 0 auto",padding:"0 20px",height:44,background:"var(--expense)",color:"#fff",border:"none",borderRadius:"var(--radius)",fontSize:14,fontWeight:600,fontFamily:"DM Sans,Heebo,sans-serif",cursor:"pointer"},children:i("addEntry.delete")}),o.jsx("button",{onClick:K,disabled:U,style:{flex:1,height:44,background:U?"var(--surface3)":"var(--accent)",color:U?"var(--text3)":"#fff",border:"none",borderRadius:"var(--radius)",fontSize:15,fontWeight:600,fontFamily:"DM Sans,Heebo,sans-serif",cursor:U?"wait":"pointer",opacity:U?.6:1},children:i(U?"addEntry.saving2":u?"addEntry.saveChanges":"addEntry.addNew")})]})]})})}function fr({open:e,message:t,onConfirm:n,onCancel:a}){const{t:s}=G();return e?o.jsx("div",{onClick:a,style:{position:"fixed",inset:0,zIndex:400,background:"rgba(28,25,23,0.55)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"0 16px"},children:o.jsxs("div",{onClick:r=>r.stopPropagation(),style:{background:"var(--surface)",borderRadius:16,padding:"28px 24px 24px",width:"100%",maxWidth:360,boxShadow:"0 20px 50px rgba(0,0,0,0.2)",textAlign:"center"},children:[o.jsx("p",{style:{fontSize:16,fontWeight:600,color:"var(--text)",marginBottom:6},children:s("misc.confirmDelete")}),o.jsx("p",{style:{fontSize:13,color:"var(--text3)",marginBottom:24},children:t}),o.jsxs("div",{style:{display:"flex",gap:10},children:[o.jsx("button",{onClick:a,style:{flex:1,padding:"12px 0",borderRadius:10,border:"1px solid var(--border)",background:"var(--surface)",color:"var(--text2)",fontSize:15,fontFamily:"DM Sans,Heebo,sans-serif",cursor:"pointer",fontWeight:500},children:s("misc.no")}),o.jsx("button",{onClick:n,style:{flex:1,padding:"12px 0",borderRadius:10,border:"none",background:"var(--expense)",color:"#fff",fontSize:15,fontFamily:"DM Sans,Heebo,sans-serif",cursor:"pointer",fontWeight:600},children:s("misc.yes")})]})]})}):null}const yr=l.lazy(()=>re(()=>import("./Dashboard-wnFD7Zuh.js"),__vite__mapDeps([0,1,2,3,4,5,6,7]))),br=l.lazy(()=>re(()=>import("./Entries-D6TuWRcG.js"),__vite__mapDeps([8,2,3,4,1,5,6,7]))),vr=l.lazy(()=>re(()=>import("./Breakeven-Db7XIW4t.js"),__vite__mapDeps([9,1,4,3,10,6,7]))),xr=l.lazy(()=>re(()=>import("./Insights-SfVg4Cft.js"),__vite__mapDeps([11,4,3,10,1,6,7]))),wr=l.lazy(()=>re(()=>import("./Settings-B-Yi8juX.js"),__vite__mapDeps([12,1,3,6,7]))),kr=l.lazy(()=>re(()=>import("./ImportCSV-B-0BvpCm.js"),__vite__mapDeps([13,1,3,10,6,7]))),Sr=l.lazy(()=>re(()=>import("./Accounts-De-DDpOI.js"),__vite__mapDeps([14,1,3,10,5,6,7]))),jr=l.lazy(()=>re(()=>import("./BudgiBot-BYzMB_MI.js"),__vite__mapDeps([15,1,7,6])));function Cr(){const{t:e,i18n:t}=G(),{user:n,householdId:a,setHouseholdId:s,loading:r}=hs(),c=ms(a),{budgets:d,savingsGoal:h,customCategories:i,memberUids:u,currency:p}=ps(a),x=gs(a),{isPremium:y,status:b,trialDaysLeft:f,subscription:T}=xs(n),R=y||localStorage.getItem("budgi-beta")==="1",D=ws(e),I=[...D,...i.filter(S=>!D.some(Q=>Q.value===S.value))],[C,E]=l.useState("dashboard"),[P,N]=l.useState(!1),[_,M]=l.useState(null),[B,$]=l.useState(null),[j,U]=l.useState(new Date().getMonth()),[F,ie]=l.useState(new Date().getFullYear()),[J,w]=l.useState(!1),[H,A]=l.useState(!1),[q,z]=l.useState(!1),[Z,ne]=l.useState(()=>localStorage.getItem("budgi-currency")||"ILS"),[ce,oe]=l.useState(()=>localStorage.getItem("budgi-tour-done")==="1");l.useEffect(()=>{_n(W).catch(S=>console.error("Redirect error:",S))},[]),l.useEffect(()=>{p&&(ne(p),localStorage.setItem("budgi-currency",p),localStorage.setItem("budgi-currency-chosen","1"))},[p]),l.useEffect(()=>{const S=localStorage.getItem("budgi-currency-chosen")==="1";a&&!S&&!q&&!H&&z(!0)},[a,q,H]);async function g(S){ne(S),localStorage.setItem("budgi-currency",S),localStorage.setItem("budgi-currency-chosen","1"),a&&await ht(a,S),z(!1)}l.useEffect(()=>{const S=t.language==="he"?"rtl":"ltr";document.documentElement.setAttribute("lang",t.language),document.body.setAttribute("dir",S)},[t.language]);async function K(){try{await us(a,B)}catch(S){alert(e("misc.errorDelete")+S.message)}finally{$(null)}}if(vs(c,j,F,a,n),r)return o.jsx(xt,{fullscreen:!0});if(!n)return o.jsx(er,{onNewUser:()=>{w(!0),A(!0)}});if(H)return o.jsx(nr,{onContinue:()=>{A(!1),a||z(!0)}});if(q&&!a)return o.jsx(ft,{onSelect:S=>{ne(S),localStorage.setItem("budgi-currency",S),localStorage.setItem("budgi-currency-chosen","1"),z(!1)}});if(!a)return o.jsx(tr,{user:n,onComplete:S=>{s(S),Z!=="ILS"&&ht(S,Z)}});if(q)return o.jsx(ft,{onSelect:g});function X(){localStorage.removeItem("budgi-tour-done"),localStorage.removeItem("budgi-currency-chosen"),oe(!1),A(!0),z(!1),E("dashboard")}const m={entries:c,currentMonth:j,currentYear:F,householdId:a,user:n,memberUids:u,allCategories:I,customCategories:i,budgets:d,savingsGoal:h,accounts:x,isPremium:R,subStatus:b,trialDaysLeft:f,subscription:T,currency:Z,onEdit:M,onDelete:$,onNavigate:E,onJoinHousehold:s,onResetOnboarding:X},L=[{key:"dashboard",Icon:sn,label:e("nav.dashboard")},{key:"entries",Icon:rn,label:e("nav.entries")},{key:"breakeven",Icon:ln,label:e("nav.breakeven")},{key:"insights",Icon:un,label:e("nav.insights")},{key:"bot",Icon:cn,label:"Budgi Bot"},{key:"accounts",Icon:Ms,label:e("accounts.nav")},{key:"settings",Icon:dn,label:e("nav.settings")}];return o.jsxs(o.Fragment,{children:[o.jsxs("nav",{className:"desktop-sidebar",children:[o.jsx("div",{className:"desktop-sidebar-title",dir:"ltr",children:o.jsxs("span",{children:[o.jsx("span",{style:{fontWeight:700,color:"var(--accent)"},children:"B"}),"udgi"]})}),L.map(({key:S,Icon:Q,label:mn})=>o.jsxs("button",{className:`desktop-sidebar-item${C===S?" active":""}`,onClick:()=>E(S),style:{background:"none",border:"none",fontFamily:"DM Sans,Heebo,sans-serif",width:"100%",textAlign:"right"},children:[o.jsx(Q,{size:16,strokeWidth:1.8})," ",mn]},S)),o.jsx("div",{style:{marginTop:"auto",paddingTop:16,borderTop:"0.5px solid var(--border)",fontSize:13,color:"var(--text3)"},children:n==null?void 0:n.displayName})]}),o.jsxs("div",{className:"app-shell",children:[o.jsx(cr,{user:n,currentMonth:j,currentYear:F,onMonthChange:(S,Q)=>{U(S),ie(Q)},isPremium:R,subStatus:b,trialDaysLeft:f,onNavigate:E}),o.jsxs(l.Suspense,{fallback:o.jsx(xt,{}),children:[C==="dashboard"&&o.jsx(yr,{...m}),C==="entries"&&o.jsx(br,{...m}),C==="breakeven"&&o.jsx(vr,{...m}),C==="insights"&&o.jsx(xr,{...m}),C==="bot"&&o.jsx(jr,{user:n}),C==="import"&&o.jsx(kr,{...m}),C==="accounts"&&o.jsx(Sr,{...m}),C==="settings"&&o.jsx(wr,{...m})]}),o.jsx(lr,{activePage:C,onNavigate:E,isPremium:R,subStatus:b})]}),o.jsx(ir,{}),!(P||_||B)&&["dashboard","entries"].includes(C)&&me.createPortal(o.jsx("button",{className:"fab","data-tour":"fab",onClick:()=>N(!0),children:e("dashboard.addEntry")}),document.body),!ce&&a&&C==="dashboard"&&o.jsx(sr,{onDone:()=>oe(!0)}),me.createPortal(o.jsxs(o.Fragment,{children:[o.jsx(gr,{open:P||!!_,onClose:()=>{N(!1),M(null)},householdId:a,user:n,entry:_,allCategories:I,customCategories:i,accounts:x,onDelete:S=>{M(null),N(!1),$(S)}}),o.jsx(fr,{open:!!B,message:e("misc.confirmDelete"),onConfirm:K,onCancel:()=>$(null)})]}),document.body)]})}Tt(document.getElementById("root")).render(o.jsx(l.StrictMode,{children:o.jsx(Cr,{})}));export{Ps as C,xt as L,cn as M,un as T,on as a,Ar as b,V as c,Lr as d,Or as e,Mr as f,ks as g,cs as h,ls as i,o as j,Rr as k,Br as l,Tr as m,Ms as n,$r as o,Fr as p,Wr as q,v as r,_r as s,Dr as t,ds as u,Pr as v};
