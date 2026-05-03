const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Dashboard-B8fjWCoj.js","assets/i18n-DHnzMtDv.js","assets/EntryItem-CXI714aA.js","assets/CategoryIcon-CGDhA-nm.js","assets/trash-2-N0-AOsvs.js","assets/react-vendor-ByMXOXG8.js","assets/firebase-MQBIVSCz.js","assets/Entries-CBn8fikh.js","assets/Breakeven-Dtw0HzTc.js","assets/PremiumGate-DxzJ2ojG.js","assets/Insights-KSKMA1Ft.js","assets/Settings-DJzm_n6p.js","assets/ImportCSV-Brjup08H.js","assets/Accounts-CmkrgbCr.js","assets/BudgiBot-BH_gnnG_.js"])))=>i.map(i=>d[i]);
import{r as l,i as xn,a as wn,u as H}from"./i18n-DHnzMtDv.js";import{r as pe}from"./react-vendor-ByMXOXG8.js";import{r as je,_ as Ce,C as Ne,a as Ke,E as Et,o as Ge,F as Sn,d as Me,v as kn,i as jn,b as Cn,g as It,c as Nn,e as En,f as In,h as An,p as Tn,G as At,j as X,k as S,u as ae,l as Ve,m as oe,q as Ee,n as Dn,w as ge,s as qe,t as K,x as Tt,y as Pn,z as st,A as ve,B as Dt,D as Mn,H as _n,I as Pt,J as Ln,K as We,L as On,M as Rn,N as $n,O as Bn}from"./firebase-MQBIVSCz.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();var Mt={exports:{}},Ae={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fn=l,Un=Symbol.for("react.element"),Wn=Symbol.for("react.fragment"),zn=Object.prototype.hasOwnProperty,Hn=Fn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Kn={key:!0,ref:!0,__self:!0,__source:!0};function _t(e,t,n){var a,s={},r=null,i=null;n!==void 0&&(r=""+n),t.key!==void 0&&(r=""+t.key),t.ref!==void 0&&(i=t.ref);for(a in t)zn.call(t,a)&&!Kn.hasOwnProperty(a)&&(s[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps,t)s[a]===void 0&&(s[a]=t[a]);return{$$typeof:Un,type:e,key:r,ref:i,props:s,_owner:Hn.current}}Ae.Fragment=Wn;Ae.jsx=_t;Ae.jsxs=_t;Mt.exports=Ae;var o=Mt.exports,Lt,rt=pe;Lt=rt.createRoot,rt.hydrateRoot;const Gn={dashboard:"Home",entries:"Entries",breakeven:"Break-Even",insights:"Insights",import:"Import",settings:"Settings"},Vn=["January","February","March","April","May","June","July","August","September","October","November","December"],qn={housing:"Housing",food:"Groceries",transport:"Transport",kids:"Kids",health:"Health",education:"Education",clothing:"Clothing",coffee:"Coffee",dining:"Dining Out",leisure:"Leisure",sport:"Sport",telecom:"Telecom",travel:"Travel",shopping:"Shopping",insurance:"Insurance",pets:"Pets",savings:"Savings",cosmetics:"Cosmetics & Care",home_maintenance:"Home Maintenance",income:"Income",other:"Other"},Yn={tagline:`Your family's finances,
clear and under control.`,taglineSub:"Track every shekel. Plan together. Spend smarter.",signInGoogle:"Continue with Google",signInManual:"Sign in with username",orDivider:"or",usernameLabel:"Username",usernamePlaceholder:"Choose a username",displayNameLabel:"Full name",displayNamePlaceholder:"Your name (shown in the app)",emailLabel:"Email address",emailPlaceholder:"For account recovery only",passwordLabel:"Password",passwordConfirmLabel:"Confirm password",createAccount:"Create account",signInBtn:"Sign in",switchToCreate:"No account yet? Create one",switchToSignIn:"Already have an account? Sign in",hint:"Your data is stored securely in the cloud — accessible from any device",errorGeneric:"Sign-in error: ",errorDomain:"Domain not authorized in Firebase. Add it under Authentication → Authorized Domains",errorPasswordMatch:"Passwords don't match",errorWeakPassword:"Password must be at least 6 characters",errorUsernameTaken:"This username is already taken",errorUsernameNotFound:"Username not found",errorWrongPassword:"Incorrect password",errorUsernameChars:"2–20 characters: letters, numbers, or underscore",errorDisplayName:"Name must be at least 2 characters",errorEmailFormat:"Please enter a valid email address",strengthVeryWeak:"Very weak",strengthWeak:"Weak",strengthFair:"Fair — add symbols or uppercase",strengthGood:"Good",strengthStrong:"Strong ✓",backToOptions:"All sign-in options",feature1:"Track income & expenses in seconds",feature2:"Shared household — both partners always in sync",feature3:"Break-even calculator & spending insights",footer:"Free · Private · No ads · Built for real families"},Jn={welcome:"Welcome to BUDGI",chooseDesc:"Create a new shared home or join an existing one with your partner's invite code",create:"✦ Create new home",creating:"Creating...",or:"— or —",join:"Join existing home",created:"Home created!",createdDesc:"Send the invite code to your partner so they can join",inviteLabel:"Your invite code",inviteHint:'They open the app and choose "Join existing home"',autoLogin:"Login will start automatically",joinTitle:"Join existing home",joinDesc:"Ask your partner for their invite code",joinPlaceholder:"Enter code (e.g. ABC123)",joinBtn:"Join",joining:"Joining...",back:"Back",errorCreate:"Error creating home: ",errorJoin:"Error joining",errorJoinPremium:"Joining a shared home requires an active Premium subscription from the home creator"},Zn={switchUser:"Switch account",signOut:"Sign out"},Xn={balance:"Balance",income:"Income",expenses:"Expenses",incomeUtil:"Income utilization",budgetUtil:"Budget utilization",vsLastMonth:"vs last month",fixed:"Fixed",variable:"Variable",savingsLabel:"Savings",incomeLabel:"Income",savingsGoal:"Savings goal",byCategory:"By category",recent:"Recent",addEntry:"Add entry",overBudget:"Over budget in {{count}} categories",errorAdd:"Error adding: ",donutExpenses:"Expenses",donutByCategory:"by category",suggestedMsg:"{{count}} fixed expenses not entered this month",suggestedAvg:"avg",suggestedAdd:"+ Add",noEntries:"No entries for this month yet",noEntriesHint:"Tap + to add",kikiPromoTitle:"Add expenses on WhatsApp in seconds",kikiPromoSub:"Message Budgi Bot — it records everything automatically",kikiPromoBtn:"Upgrade",trialEndingSoon:"Your trial ends in {{days}} days",trialEndingHint:"Keep access to Budgi Bot, household sharing & all advanced tools",trialUpgradeBtn:"Upgrade now"},Qn={fixed:"Fixed",bimonthly:"Bimonthly",variable:"Variable",sep:"Sep+"},eo={title:"All entries",empty:"No entries for this month",filterAll:"All",filterExpense:"Expenses",filterIncome:"Income",filterSaving:"Savings"},to={title:"Fixed expenses & Break-Even",empty:"Add fixed expenses to see the summary",fixedIncome:"Fixed income",monthly:"Monthly",bimonthly:"Bimonthly (monthly avg)",totalIncome:"Total fixed income",totalMonthly:"Total monthly",monthlyAvg:"Monthly avg addition",breakevenPoint:"Break-Even",breakevenSep:"Break-Even (Sep)",fixedSavings:"Fixed savings",septemberMode:"September mode (daycare)",septemberHint:"Add daycare expenses to calculation",septemberSection:"September+ (daycare)",septemberAddition:"September addition",plus10:"Plus 10%",plus20:"Plus 20%",perMonth:"/mo",monthIncome:"Income",monthBalance:"Balance"},no={title:"Trends",last6:"Expenses — last 6 months",twoMonthsMin:"Need at least two months to show trends",topCategories:"Top expense categories",monthlyTrend:"Monthly trend"},oo={title:"Settings",household:"Household",householdName:"Household name",members:"Members",inviteCode:"Invite code",membersCount:"{{count}} members",you:"you",categories:"Categories",addCategory:"Add category",addCategoryPlaceholder:"New category name...",addCategoryBtn:"+ Add",iconHint:"Type an emoji for the icon",deleteCategory:"Delete",noCats:"No custom categories yet",budgets:"Monthly budgets",budgetsTitle:"Monthly budget by category",noLimit:"No limit",saveBudget:"Save budget ✦",savingsGoal:"Savings goal",goalName:"Goal name",goalNamePlaceholder:"e.g. Vacation, car, apartment...",goalTarget:"Target amount",goalSaved:"Already saved",saveGoal:"Save goal ✦",language:"Language",exportData:"Export data",exportCsv:"Export to CSV",exportCsvSub:"Save all data",joinOtherTitle:"Join another household",joinOtherDesc:"Have an invite code? Enter it here to switch to another household.",joinSuccess:"✓ Successfully joined the new household",kiki:"Kiki — WhatsApp bot",kikiDesc:"Send WhatsApp messages and every expense is recorded automatically ✦",kikiExample:'e.g: "coffee 18 shekel"',kikiPhone:"Your WhatsApp number (with country code)",kikiPhoneSaved:"Connected number",kikiPhoneFormat:"Format: +1234567890",kikiApiKey:"API key (required for Kiki)",kikiApiKeySaved:"Household API key set",kikiApiKeyDesc:"Kiki works with Claude AI — free for 3-6 months.",kikiHowTitle:"How to get started with Kiki?",kikiStep1:"Go to the website",kikiStep2:'Click "Sign up" → register with email',kikiStep3:'Click "API Keys" → "Create Key"',kikiStep4:"Copy the key (starts with sk-ant-) and paste below",kikiStepSaveKey:"Save your API key above",kikiStepSavePhone:"Register your phone number above",kikiStepSaveContact:"Save Kiki's number on WhatsApp:",kikiStepJoin:"Send Kiki the code: join method-strike",kikiStepSend:`Send Kiki: "coffee 18 shekel" — that's it ✦`,savePhone:"Save number",saveKey:"Save key",saved:"✓ Saved!",saving:"Saving...",edit:"Edit",save:"Save",cancel:"Cancel",deleteCatTitle:"Delete category",deleteCatDesc:'There are {{count}} entries under "{{label}}". Which category should they be moved to?',deleteCatConfirm:"Delete & transfer",errorPhone:"Invalid number format. Use international format: +1234567890",errorApiKey:"Key must start with sk-ant-",user:"User",profile:"Profile",inviteCodeLocked:"Upgrade to Premium to invite a partner"},ao={title:"Add entry",editTitle:"Edit entry",name:"Description",namePlaceholderExpense:"e.g: mortgage, electricity, caregiver...",namePlaceholderIncome:"e.g: salary, freelance, bonus...",namePlaceholderSaving:"e.g: emergency fund, pension...",amount:"Amount (₪)",category:"Category",date:"Date",type:"Type",character:"Character",note:"Note",notePlaceholder:"Short note...",expense:"Expense",income:"Income",saving:"Saving",fixedDesc:"📌 Fixed (every month)",bimonthlyDesc:"📆 Bimonthly (tax, electricity...)",variableDesc:"🔄 Variable",sepDesc:"⚠️ September+",fixed:"Fixed",variable:"Variable",save:"Save ✦",saving2:"Saving...",saveChanges:"Save changes ✦",addNew:"Add ✦",cancel:"Cancel",delete:"Delete",addNewCategory:"+ Add new category",categoryNamePlaceholder:"Category name...",recurringHint:"Auto-carried every month — Premium feature",paymentsLabel:"No. of payments:",errorRequired:"Please fill name, amount and date",errorZero:"Amount must be greater than zero",errorSave:"Error saving: "},so={nav:"Accounts",title:"Accounts",empty:"No accounts yet",emptyHint:"Add an account to track your real bank balance",add:"Add account",addName:"Account name",addNamePlaceholder:"e.g. Checking, Joint...",addBalance:"Current balance (₪)",balance:"Balance",lastUpdated:"Updated",resetBalance:"Update balance",resetHint:"Set to your actual bank balance — future entries will accumulate from here",total:"Total",delete:"Delete",confirmDelete:"Delete this account?",noAccount:"No account",save:"Save",cancel:"Cancel"},ro={headline:"Welcome to Budgi!",sub:"Let's set up your account",continue:"Get started →"},io={title:"What currency do you use?",sub:"You can change this later in Settings",search:"Search currencies...",confirm:"Continue →",skip:"Skip (₪ Shekel)"},co={step1Title:"Monthly summary",step1:"Here you'll see your income, expenses, and balance for the month",step2Title:"Month navigation",step2:"Use the arrows to navigate between months",step3Title:"Add an entry",step3:"Tap here to add an expense, income, or saving",step4Title:"Navigation",step4:"Browse all sections of the app from here",step5Title:"Daily Reminders 🔔",step5:"Never forget to log — enable a daily reminder. Set your preferred time in Settings → Notifications.",next:"Next →",skip:"Skip",finish:"Done ✓"},lo={title:"Daily Reminders",subtitle:"Get a nudge to log your expenses",enable:"Send me a daily reminder",timeLabel:"Reminder time",save:"Save",saving:"Saving...",saved:"Saved!",permissionDenied:"Notification permission blocked. Enable it in your browser settings.",unsupported:"Your browser doesn't support notifications.",iosTitle:"To receive notifications on iPhone",iosStep1:"Tap the Share button",iosStep2:'Choose "Add to Home Screen"',iosStep3:"Open the app from your Home Screen",iosNote:"Notifications only work when the app is installed on your Home Screen"},uo={loading:"Loading...",errorDelete:"Error deleting: ",autoAdded:"Auto-added",confirmDelete:"Delete this entry?",yes:"Yes",no:"No"},ho={nav:Gn,months:Vn,categories:qn,login:Yn,household:Jn,header:Zn,dashboard:Xn,entryItem:Qn,entries:eo,breakeven:to,insights:no,settings:oo,addEntry:ao,import:{title:"Import CSV",desc:"Import transactions from your bank",selectFile:"Select file",import:"Import",success:"Imported {{count}} entries"},accounts:so,welcome:ro,currency:io,tour:co,notifications:lo,misc:uo},mo={dashboard:"ראשי",entries:"פעולות",breakeven:"תחשיב",insights:"מגמות",import:"ייבוא",settings:"הגדרות"},go=["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"],po={housing:"דיור",food:"מזון וסופר",transport:"תחבורה",kids:"ילדים",health:"בריאות",education:"חינוך",clothing:"ביגוד",coffee:"קפה",dining:"מסעדות",leisure:"פנאי ובילויים",sport:"ספורט",telecom:"תקשורת",travel:"נסיעות",shopping:"קניות",insurance:"ביטוח",pets:"חיות מחמד",savings:"חיסכון",cosmetics:"קוסמטיקה וטיפוח",home_maintenance:"תחזוקת בית",income:"הכנסה",other:"אחר"},fo={tagline:"הכסף שלכם, סוף סוף מסודר.",taglineSub:"עוקבים אחרי כל שקל, מתכננים ביחד, מוציאים בחכמה.",signInGoogle:"המשך עם Google",signInManual:"כניסה עם שם משתמש",orDivider:"או",usernameLabel:"שם משתמש",usernamePlaceholder:"בחרי שם משתמש",displayNameLabel:"שם מלא",displayNamePlaceholder:"השם שיוצג באפליקציה",emailLabel:"אימייל",emailPlaceholder:"לשחזור חשבון בלבד",passwordLabel:"סיסמה",passwordConfirmLabel:"אימות סיסמה",createAccount:"יצירת חשבון",signInBtn:"כניסה",switchToCreate:"אין לך חשבון עדיין? צרי אחד",switchToSignIn:"כבר יש לך חשבון? כניסה",hint:"הנתונים שלך מאובטחים בענן — נגישים מכל מכשיר",errorGeneric:"שגיאת כניסה: ",errorDomain:"הדומיין לא מורשה ב-Firebase. יש להוסיף אותו ב-Authentication → Authorized Domains",errorPasswordMatch:"הסיסמאות אינן תואמות",errorWeakPassword:"הסיסמה חייבת להכיל לפחות 6 תווים",errorUsernameTaken:"שם המשתמש הזה תפוס",errorUsernameNotFound:"שם המשתמש לא נמצא",errorWrongPassword:"סיסמה שגויה",errorUsernameChars:"2–20 תווים: אותיות, מספרים או קו תחתון",errorDisplayName:"השם חייב להכיל לפחות 2 תווים",errorEmailFormat:"נא להזין כתובת אימייל תקינה",strengthVeryWeak:"חלשה מאוד",strengthWeak:"חלשה",strengthFair:"בינונית — הוסיפי סימנים או אותיות גדולות",strengthGood:"טובה",strengthStrong:"חזקה ✓",backToOptions:"כל אפשרויות הכניסה",feature1:"מעקב הכנסות והוצאות בשניות",feature2:"בית משותף — שני בני הזוג תמיד מסונכרנים",feature3:"מחשבון נקודת איזון ותובנות הוצאה",footer:"חינמי · פרטי · ללא פרסומות · נבנה למשפחות אמיתיות"},yo={welcome:"ברוכים הבאים ל-BUDGI",chooseDesc:"צרי בית משותף חדש או הצטרפי לבית קיים עם קוד ההזמנה של בן/בת הזוג",create:"✦ צרי בית חדש",creating:"יוצרת...",or:"— או —",join:"הצטרפי לבית קיים",created:"הבית נוצר!",createdDesc:"שלחי את קוד ההזמנה לבן/בת הזוג כדי שיצטרפו",inviteLabel:"קוד ההזמנה שלך",inviteHint:'הם יכנסו לאפליקציה ויבחרו "הצטרפי לבית קיים"',autoLogin:"הכניסה לאפליקציה תתחיל אוטומטית",joinTitle:"הצטרפי לבית קיים",joinDesc:"בקשי מבן/בת הזוג את קוד ההזמנה שלהם",joinPlaceholder:"הכניסי קוד (לדוגמא: ABC123)",joinBtn:"הצטרפי",joining:"מצטרפת...",back:"חזרה",errorCreate:"שגיאה ביצירת הבית: ",errorJoin:"שגיאה בהצטרפות",errorJoinPremium:"צירוף שותף/ה לבית משותף דורש מנוי פרמיום פעיל אצל יוצר הבית"},bo={switchUser:"החלף משתמש",signOut:"יציאה מהחשבון"},vo={balance:"יתרה",income:"הכנסות",expenses:"הוצאות",incomeUtil:"ניצול הכנסה",budgetUtil:"ניצול תקציב",vsLastMonth:"מהחודש שעבר",fixed:"קבועות",variable:"משתנות",savingsLabel:"חיסכונות",incomeLabel:"הכנסות",savingsGoal:"יעד חיסכון",byCategory:"לפי קטגוריה",recent:"אחרונות",addEntry:"הוסף פעולה",overBudget:"חריגה מתקציב ב-{{count}} קטגוריות",errorAdd:"שגיאה בהוספה: ",donutExpenses:"הוצאות",donutByCategory:"לפי קטגוריה",suggestedMsg:"יש {{count}} הוצאות קבועות שלא הוזנו החודש",suggestedAvg:"ממוצע",suggestedAdd:"+ הוסיפי",noEntries:"עוד אין פעולות לחודש זה",noEntriesHint:"לחצי + להוסיף",kikiPromoTitle:"הוסיפי הוצאות בוואטסאפ תוך שניות",kikiPromoSub:"שלחי הודעה ל-Budgi Bot — הוא יירשום הכל אוטומטית",kikiPromoBtn:"שדרג",trialEndingSoon:"הניסיון שלך מסתיים בעוד {{days}} ימים",trialEndingHint:"שמור גישה ל-Budgi Bot, בית משותף וכל הכלים המתקדמים",trialUpgradeBtn:"שדרג עכשיו"},xo={fixed:"קבועה",bimonthly:"דו-חודשית",variable:"משתנה",sep:"ספטמ׳+"},wo={title:"כל הפעולות",empty:"אין פעולות לחודש זה",filterAll:"הכל",filterExpense:"הוצאות",filterIncome:"הכנסות",filterSaving:"חיסכון"},So={title:"הוצאות קבועות ו-Break-Even",empty:"הוסיפי הוצאות קבועות כדי לראות את הסיכום",fixedIncome:"הכנסות קבועות",monthly:"חודשיות",bimonthly:"דו-חודשיות (ממוצע חודשי)",totalIncome:'סה"כ הכנסות קבועות',totalMonthly:'סה"כ חודשיות',monthlyAvg:"תוספת ממוצעת חודשית",breakevenPoint:"Break-Even",breakevenSep:"Break-Even (ספטמבר)",fixedSavings:"חיסכונות קבועים",septemberMode:"מצב ספטמבר (מעון)",septemberHint:"הוסיפי הוצאות מעון לתחשיב",septemberSection:"ספטמבר+ (מעון)",septemberAddition:"תוספת ספטמבר",plus10:"פלוס 10%",plus20:"פלוס 20%",perMonth:"/חודש",monthIncome:"הכנסה",monthBalance:"מצב"},ko={title:"מגמות",last6:"הוצאות — 6 חודשים אחרונים",twoMonthsMin:"צריך לפחות שני חודשים כדי להציג מגמות",topCategories:"קטגוריות הוצאה מובילות",monthlyTrend:"מגמה חודשית"},jo={title:"הגדרות",household:"הבית שלנו",householdName:"שם הבית",members:"חברי הבית",inviteCode:"קוד הזמנה לשיתוף",membersCount:"{{count}} משתמשים",you:"את",categories:"קטגוריות",addCategory:"הוסיפי קטגוריה",addCategoryPlaceholder:"שם קטגוריה חדשה...",addCategoryBtn:"+ הוסיפי",iconHint:"הקלידי אמוג׳י לאייקון",deleteCategory:"מחקי",noCats:"אין עדיין קטגוריות מותאמות",budgets:"תקציבים חודשיים",budgetsTitle:"תקציב חודשי לפי קטגוריה",noLimit:"ללא מגבלה",saveBudget:"שמרי תקציב ✦",savingsGoal:"יעד חיסכון",goalName:"שם היעד",goalNamePlaceholder:"למשל: חופשה, רכב, דירה...",goalTarget:"סכום יעד (₪)",goalSaved:"כבר חסכתי (₪)",saveGoal:"שמרי יעד ✦",language:"שפה",exportData:"ייצוא נתונים",exportCsv:"ייצוא ל-CSV",exportCsvSub:"שמירת כל הנתונים",joinOtherTitle:"הצטרפות לבית אחר",joinOtherDesc:"יש לך קוד הזמנה? הכנס כאן כדי לעבור לבית אחר.",joinSuccess:"✓ הצטרפת בהצלחה לבית החדש",kiki:"קיקי — בוט WhatsApp",kikiDesc:"שלחי הודעות בוואטסאפ וכל הוצאה תירשם אוטומטית ✦",kikiExample:'לדוגמה: "קפה 18 שקל"',kikiPhone:"מספר הטלפון שלך (עם קידומת מדינה)",kikiPhoneSaved:"מספר מקושר",kikiPhoneFormat:"פורמט: +972501234567",kikiApiKey:"מפתח API (חובה לשימוש בקיקי)",kikiApiKeySaved:"מפתח מוגדר לבית",kikiApiKeyDesc:"קיקי עובדת עם Claude AI — חינמי לחלוטין ל-3-6 חודשים.",kikiHowTitle:"איך מתחילים עם קיקי?",kikiStep1:"כנסי לאתר",kikiStep2:'לחצי "Sign up" → הירשמי עם מייל',kikiStep3:'לחצי "API Keys" → "Create Key"',kikiStep4:"העתיקי את המפתח (מתחיל ב-sk-ant-) והדביקי למטה",kikiStepSaveKey:"שמרי מפתח API למעלה",kikiStepSavePhone:"רשמי את מספר הטלפון שלך למעלה",kikiStepSaveContact:"שמרי את מספר קיקי בוואטסאפ:",kikiStepJoin:"שלחי לקיקי את הקוד: join method-strike",kikiStepSend:'שלחי לקיקי: "קפה 18 שקל" — וזהו ✦',savePhone:"שמרי מספר",saveKey:"שמרי מפתח",saved:"✓ נשמר!",saving:"שומרת...",edit:"ערכי",save:"שמרי",cancel:"ביטול",deleteCatTitle:"מחיקת קטגוריה",deleteCatDesc:'יש {{count}} פעולות תחת "{{label}}". לאיזו קטגוריה להעביר אותן?',deleteCatConfirm:"מחקי והעבירי",errorPhone:"פורמט מספר לא תקין. השתמשי בפורמט בינלאומי: +972501234567",errorApiKey:"המפתח חייב להתחיל ב-sk-ant-",user:"משתמש",profile:"פרופיל",inviteCodeLocked:"שדרג לפרמיום כדי להזמין שותף/ה"},Co={title:"הוספת פעולה",editTitle:"עריכת פעולה",name:"תיאור",namePlaceholderExpense:"למשל: משכנתא, חשמל, מטפלת...",namePlaceholderIncome:"למשל: משכורת, פרילנס, בונוס...",namePlaceholderSaving:"למשל: קרן חירום, קופת גמל...",amount:"סכום (₪)",category:"קטגוריה",date:"תאריך",type:"סוג",character:"אופי",note:"הערה",notePlaceholder:"הערה קצרה...",expense:"הוצאה",income:"הכנסה",saving:"חיסכון",fixedDesc:"📌 קבועה (כל חודש)",bimonthlyDesc:"📆 דו-חודשית (ארנונה, חשמל, מים...)",variableDesc:"🔄 משתנה",sepDesc:"⚠️ ספטמבר+",fixed:"קבועה",variable:"משתנה",save:"שמרי ✦",saving2:"שומרת...",saveChanges:"שמרי שינויים ✦",addNew:"הוסיפי ✦",cancel:"ביטול",delete:"מחקי",addNewCategory:"+ הוסיפי קטגוריה חדשה",categoryNamePlaceholder:"שם הקטגוריה...",recurringHint:"מועבר אוטומטית בכל חודש — בגירסת פרמיום",paymentsLabel:"מס׳ תשלומים:",errorRequired:"יש למלא שם, סכום ותאריך",errorZero:"סכום חייב להיות גדול מאפס",errorSave:"שגיאה בשמירת הפעולה: "},No={nav:"חשבונות",title:"חשבונות בנק",empty:"עוד אין חשבונות",emptyHint:"הוסיפי חשבון כדי לעקוב אחרי היתרה האמיתית שלך בבנק",add:"הוסיפי חשבון",addName:"שם החשבון",addNamePlaceholder:"למשל: הפועלים, חשבון משותף...",addBalance:"יתרה נוכחית (₪)",balance:"יתרה",lastUpdated:"עודכן",resetBalance:"עדכני יתרה",resetHint:"הגדירי את היתרה האמיתית מהבנק — פעולות עתידיות יצטברו מכאן",total:'סה"כ',delete:"מחקי",confirmDelete:"למחוק חשבון זה?",noAccount:"ללא חשבון",save:"שמרי",cancel:"ביטול"},Eo={headline:"ברוכים הבאים ל-Budgi!",sub:"בואו נגדיר את החשבון שלכם",continue:"בואו נתחיל ←"},Io={title:"באיזה מטבע אתם עובדים?",sub:"ניתן לשנות בהמשך בהגדרות",search:"חיפוש מטבע...",confirm:"המשך ←",skip:"דלג (₪ שקל)"},Ao={step1Title:"סיכום החודש",step1:"כאן תראו את סיכום ההכנסות, ההוצאות והיתרה החודשית",step2Title:"ניווט חודשי",step2:"לחצו על החצים כדי לנוע בין חודשים",step3Title:"הוספת פעולה",step3:"לחצו כאן להוספת הוצאה, הכנסה או חיסכון",step4Title:"ניווט בין מסכים",step4:"גלשו בין כל חלקי האפליקציה מכאן",step5Title:"תזכורות יומיות 🔔",step5:"כדי לא לשכוח לתעד — הפעל תזכורת יומית. תוכל להגדיר את השעה בהגדרות ← תזכורות.",next:"הבא ←",skip:"דלג",finish:"סיום ✓"},To={title:"תזכורות יומיות",subtitle:"קבל תזכורת לתעד את ההוצאות שלך",enable:"שלח לי תזכורת כל יום",timeLabel:"שעת תזכורת",save:"שמור",saving:"שומר...",saved:"נשמר!",permissionDenied:"הרשאת התראות נחסמה. יש לאפשר אותה בהגדרות הדפדפן.",unsupported:"הדפדפן שלך אינו תומך בהתראות.",iosTitle:"כדי לקבל התראות באייפון",iosStep1:"לחץ על כפתור השיתוף",iosStep2:'בחר "הוסף למסך הבית"',iosStep3:"פתח את האפליקציה ממסך הבית",iosNote:"התראות עובדות רק כשהאפליקציה מותקנת במסך הבית"},Do={loading:"טוען...",errorDelete:"שגיאה במחיקה: ",autoAdded:"הוזן אוטומטית",confirmDelete:"למחוק פעולה זו?",yes:"כן",no:"לא"},Po={nav:mo,months:go,categories:po,login:fo,household:yo,header:bo,dashboard:vo,entryItem:xo,entries:wo,breakeven:So,insights:ko,settings:jo,addEntry:Co,import:{title:"ייבוא CSV",desc:"ייבאי עסקאות מהבנק שלך",selectFile:"בחרי קובץ",import:"ייבאי",success:"יובאו {{count}} פעולות"},accounts:No,welcome:Eo,currency:Io,tour:Ao,notifications:To,misc:Do},Mo=localStorage.getItem("budgi-lang");xn.use(wn).init({resources:{en:{translation:ho},he:{translation:Po}},lng:Mo||"he",fallbackLng:"he",interpolation:{escapeValue:!1}});const _o="modulepreload",Lo=function(e){return"/kaspit/"+e},it={},se=function(t,n,a){let s=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),d=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));s=Promise.allSettled(n.map(u=>{if(u=Lo(u),u in it)return;it[u]=!0;const c=u.endsWith(".css"),h=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${h}`))return;const p=document.createElement("link");if(p.rel=c?"stylesheet":_o,c||(p.as="script"),p.crossOrigin="",p.href=u,d&&p.setAttribute("nonce",d),document.head.appendChild(p),c)return new Promise((x,v)=>{p.addEventListener("load",x),p.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(i){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=i,window.dispatchEvent(d),!d.defaultPrevented)throw i}return s.then(i=>{for(const d of i||[])d.status==="rejected"&&r(d.reason);return t().catch(r)})},Ot="@firebase/installations",Ye="0.6.9";/**
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
 */const Rt=1e4,$t=`w:${Ye}`,Bt="FIS_v2",Oo="https://firebaseinstallations.googleapis.com/v1",Ro=60*60*1e3,$o="installations",Bo="Installations";/**
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
 */const Fo={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},ue=new Et($o,Bo,Fo);function Ft(e){return e instanceof Sn&&e.code.includes("request-failed")}/**
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
 */function Ut({projectId:e}){return`${Oo}/projects/${e}/installations`}function Wt(e){return{token:e.token,requestStatus:2,expiresIn:Wo(e.expiresIn),creationTime:Date.now()}}async function zt(e,t){const a=(await t.json()).error;return ue.create("request-failed",{requestName:e,serverCode:a.code,serverMessage:a.message,serverStatus:a.status})}function Ht({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function Uo(e,{refreshToken:t}){const n=Ht(e);return n.append("Authorization",zo(t)),n}async function Kt(e){const t=await e();return t.status>=500&&t.status<600?e():t}function Wo(e){return Number(e.replace("s","000"))}function zo(e){return`${Bt} ${e}`}/**
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
 */async function Ho({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const a=Ut(e),s=Ht(e),r=t.getImmediate({optional:!0});if(r){const c=await r.getHeartbeatsHeader();c&&s.append("x-firebase-client",c)}const i={fid:n,authVersion:Bt,appId:e.appId,sdkVersion:$t},d={method:"POST",headers:s,body:JSON.stringify(i)},u=await Kt(()=>fetch(a,d));if(u.ok){const c=await u.json();return{fid:c.fid||n,registrationStatus:2,refreshToken:c.refreshToken,authToken:Wt(c.authToken)}}else throw await zt("Create Installation",u)}/**
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
 */function Gt(e){return new Promise(t=>{setTimeout(t,e)})}/**
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
 */function Ko(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const Go=/^[cdef][\w-]{21}$/,ze="";function Vo(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const n=qo(e);return Go.test(n)?n:ze}catch{return ze}}function qo(e){return Ko(e).substr(0,22)}/**
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
 */function Te(e){return`${e.appName}!${e.appId}`}/**
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
 */const Vt=new Map;function qt(e,t){const n=Te(e);Yt(n,t),Yo(n,t)}function Yt(e,t){const n=Vt.get(e);if(n)for(const a of n)a(t)}function Yo(e,t){const n=Jo();n&&n.postMessage({key:e,fid:t}),Zo()}let de=null;function Jo(){return!de&&"BroadcastChannel"in self&&(de=new BroadcastChannel("[Firebase] FID Change"),de.onmessage=e=>{Yt(e.data.key,e.data.fid)}),de}function Zo(){Vt.size===0&&de&&(de.close(),de=null)}/**
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
 */const Xo="firebase-installations-database",Qo=1,he="firebase-installations-store";let _e=null;function Je(){return _e||(_e=Ge(Xo,Qo,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(he)}}})),_e}async function Ie(e,t){const n=Te(e),s=(await Je()).transaction(he,"readwrite"),r=s.objectStore(he),i=await r.get(n);return await r.put(t,n),await s.done,(!i||i.fid!==t.fid)&&qt(e,t.fid),t}async function Jt(e){const t=Te(e),a=(await Je()).transaction(he,"readwrite");await a.objectStore(he).delete(t),await a.done}async function De(e,t){const n=Te(e),s=(await Je()).transaction(he,"readwrite"),r=s.objectStore(he),i=await r.get(n),d=t(i);return d===void 0?await r.delete(n):await r.put(d,n),await s.done,d&&(!i||i.fid!==d.fid)&&qt(e,d.fid),d}/**
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
 */async function Ze(e){let t;const n=await De(e.appConfig,a=>{const s=ea(a),r=ta(e,s);return t=r.registrationPromise,r.installationEntry});return n.fid===ze?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function ea(e){const t=e||{fid:Vo(),registrationStatus:0};return Zt(t)}function ta(e,t){if(t.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(ue.create("app-offline"));return{installationEntry:t,registrationPromise:s}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},a=na(e,n);return{installationEntry:n,registrationPromise:a}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:oa(e)}:{installationEntry:t}}async function na(e,t){try{const n=await Ho(e,t);return Ie(e.appConfig,n)}catch(n){throw Ft(n)&&n.customData.serverCode===409?await Jt(e.appConfig):await Ie(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function oa(e){let t=await ct(e.appConfig);for(;t.registrationStatus===1;)await Gt(100),t=await ct(e.appConfig);if(t.registrationStatus===0){const{installationEntry:n,registrationPromise:a}=await Ze(e);return a||n}return t}function ct(e){return De(e,t=>{if(!t)throw ue.create("installation-not-found");return Zt(t)})}function Zt(e){return aa(e)?{fid:e.fid,registrationStatus:0}:e}function aa(e){return e.registrationStatus===1&&e.registrationTime+Rt<Date.now()}/**
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
 */async function sa({appConfig:e,heartbeatServiceProvider:t},n){const a=ra(e,n),s=Uo(e,n),r=t.getImmediate({optional:!0});if(r){const c=await r.getHeartbeatsHeader();c&&s.append("x-firebase-client",c)}const i={installation:{sdkVersion:$t,appId:e.appId}},d={method:"POST",headers:s,body:JSON.stringify(i)},u=await Kt(()=>fetch(a,d));if(u.ok){const c=await u.json();return Wt(c)}else throw await zt("Generate Auth Token",u)}function ra(e,{fid:t}){return`${Ut(e)}/${t}/authTokens:generate`}/**
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
 */async function Xe(e,t=!1){let n;const a=await De(e.appConfig,r=>{if(!Xt(r))throw ue.create("not-registered");const i=r.authToken;if(!t&&la(i))return r;if(i.requestStatus===1)return n=ia(e,t),r;{if(!navigator.onLine)throw ue.create("app-offline");const d=ua(r);return n=ca(e,d),d}});return n?await n:a.authToken}async function ia(e,t){let n=await lt(e.appConfig);for(;n.authToken.requestStatus===1;)await Gt(100),n=await lt(e.appConfig);const a=n.authToken;return a.requestStatus===0?Xe(e,t):a}function lt(e){return De(e,t=>{if(!Xt(t))throw ue.create("not-registered");const n=t.authToken;return ha(n)?Object.assign(Object.assign({},t),{authToken:{requestStatus:0}}):t})}async function ca(e,t){try{const n=await sa(e,t),a=Object.assign(Object.assign({},t),{authToken:n});return await Ie(e.appConfig,a),n}catch(n){if(Ft(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Jt(e.appConfig);else{const a=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await Ie(e.appConfig,a)}throw n}}function Xt(e){return e!==void 0&&e.registrationStatus===2}function la(e){return e.requestStatus===2&&!da(e)}function da(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+Ro}function ua(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}function ha(e){return e.requestStatus===1&&e.requestTime+Rt<Date.now()}/**
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
 */async function ma(e){const t=e,{installationEntry:n,registrationPromise:a}=await Ze(t);return a?a.catch(console.error):Xe(t).catch(console.error),n.fid}/**
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
 */async function ga(e,t=!1){const n=e;return await pa(n),(await Xe(n,t)).token}async function pa(e){const{registrationPromise:t}=await Ze(e);t&&await t}/**
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
 */function fa(e){if(!e||!e.options)throw Le("App Configuration");if(!e.name)throw Le("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw Le(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function Le(e){return ue.create("missing-app-config-values",{valueName:e})}/**
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
 */const Qt="installations",ya="installations-internal",ba=e=>{const t=e.getProvider("app").getImmediate(),n=fa(t),a=Ke(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:a,_delete:()=>Promise.resolve()}},va=e=>{const t=e.getProvider("app").getImmediate(),n=Ke(t,Qt).getImmediate();return{getId:()=>ma(n),getToken:s=>ga(n,s)}};function xa(){Ce(new Ne(Qt,ba,"PUBLIC")),Ce(new Ne(ya,va,"PRIVATE"))}xa();je(Ot,Ye);je(Ot,Ye,"esm2017");/**
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
 */const wa="/firebase-messaging-sw.js",Sa="/firebase-cloud-messaging-push-scope",en="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",ka="https://fcmregistrations.googleapis.com/v1",tn="google.c.a.c_id",ja="google.c.a.c_l",Ca="google.c.a.ts",Na="google.c.a.e";var dt;(function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(dt||(dt={}));/**
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
 */var xe;(function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"})(xe||(xe={}));/**
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
 */function ne(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function Ea(e){const t="=".repeat((4-e.length%4)%4),n=(e+t).replace(/\-/g,"+").replace(/_/g,"/"),a=atob(n),s=new Uint8Array(a.length);for(let r=0;r<a.length;++r)s[r]=a.charCodeAt(r);return s}/**
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
 */const Oe="fcm_token_details_db",Ia=5,ut="fcm_token_object_Store";async function Aa(e){if("databases"in indexedDB&&!(await indexedDB.databases()).map(r=>r.name).includes(Oe))return null;let t=null;return(await Ge(Oe,Ia,{upgrade:async(a,s,r,i)=>{var d;if(s<2||!a.objectStoreNames.contains(ut))return;const u=i.objectStore(ut),c=await u.index("fcmSenderId").get(e);if(await u.clear(),!!c){if(s===2){const h=c;if(!h.auth||!h.p256dh||!h.endpoint)return;t={token:h.fcmToken,createTime:(d=h.createTime)!==null&&d!==void 0?d:Date.now(),subscriptionOptions:{auth:h.auth,p256dh:h.p256dh,endpoint:h.endpoint,swScope:h.swScope,vapidKey:typeof h.vapidKey=="string"?h.vapidKey:ne(h.vapidKey)}}}else if(s===3){const h=c;t={token:h.fcmToken,createTime:h.createTime,subscriptionOptions:{auth:ne(h.auth),p256dh:ne(h.p256dh),endpoint:h.endpoint,swScope:h.swScope,vapidKey:ne(h.vapidKey)}}}else if(s===4){const h=c;t={token:h.fcmToken,createTime:h.createTime,subscriptionOptions:{auth:ne(h.auth),p256dh:ne(h.p256dh),endpoint:h.endpoint,swScope:h.swScope,vapidKey:ne(h.vapidKey)}}}}}})).close(),await Me(Oe),await Me("fcm_vapid_details_db"),await Me("undefined"),Ta(t)?t:null}function Ta(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return typeof e.createTime=="number"&&e.createTime>0&&typeof e.token=="string"&&e.token.length>0&&typeof t.auth=="string"&&t.auth.length>0&&typeof t.p256dh=="string"&&t.p256dh.length>0&&typeof t.endpoint=="string"&&t.endpoint.length>0&&typeof t.swScope=="string"&&t.swScope.length>0&&typeof t.vapidKey=="string"&&t.vapidKey.length>0}/**
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
 */const Da="firebase-messaging-database",Pa=1,we="firebase-messaging-store";let Re=null;function nn(){return Re||(Re=Ge(Da,Pa,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(we)}}})),Re}async function Ma(e){const t=on(e),a=await(await nn()).transaction(we).objectStore(we).get(t);if(a)return a;{const s=await Aa(e.appConfig.senderId);if(s)return await Qe(e,s),s}}async function Qe(e,t){const n=on(e),s=(await nn()).transaction(we,"readwrite");return await s.objectStore(we).put(t,n),await s.done,t}function on({appConfig:e}){return e.appId}/**
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
 */const _a={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},R=new Et("messaging","Messaging",_a);/**
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
 */async function La(e,t){const n=await tt(e),a=an(t),s={method:"POST",headers:n,body:JSON.stringify(a)};let r;try{r=await(await fetch(et(e.appConfig),s)).json()}catch(i){throw R.create("token-subscribe-failed",{errorInfo:i==null?void 0:i.toString()})}if(r.error){const i=r.error.message;throw R.create("token-subscribe-failed",{errorInfo:i})}if(!r.token)throw R.create("token-subscribe-no-token");return r.token}async function Oa(e,t){const n=await tt(e),a=an(t.subscriptionOptions),s={method:"PATCH",headers:n,body:JSON.stringify(a)};let r;try{r=await(await fetch(`${et(e.appConfig)}/${t.token}`,s)).json()}catch(i){throw R.create("token-update-failed",{errorInfo:i==null?void 0:i.toString()})}if(r.error){const i=r.error.message;throw R.create("token-update-failed",{errorInfo:i})}if(!r.token)throw R.create("token-update-no-token");return r.token}async function Ra(e,t){const a={method:"DELETE",headers:await tt(e)};try{const r=await(await fetch(`${et(e.appConfig)}/${t}`,a)).json();if(r.error){const i=r.error.message;throw R.create("token-unsubscribe-failed",{errorInfo:i})}}catch(s){throw R.create("token-unsubscribe-failed",{errorInfo:s==null?void 0:s.toString()})}}function et({projectId:e}){return`${ka}/projects/${e}/registrations`}async function tt({appConfig:e,installations:t}){const n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function an({p256dh:e,auth:t,endpoint:n,vapidKey:a}){const s={web:{endpoint:n,auth:t,p256dh:e}};return a!==en&&(s.web.applicationPubKey=a),s}/**
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
 */const $a=7*24*60*60*1e3;async function Ba(e){const t=await Ua(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:ne(t.getKey("auth")),p256dh:ne(t.getKey("p256dh"))},a=await Ma(e.firebaseDependencies);if(a){if(Wa(a.subscriptionOptions,n))return Date.now()>=a.createTime+$a?Fa(e,{token:a.token,createTime:Date.now(),subscriptionOptions:n}):a.token;try{await Ra(e.firebaseDependencies,a.token)}catch(s){console.warn(s)}return ht(e.firebaseDependencies,n)}else return ht(e.firebaseDependencies,n)}async function Fa(e,t){try{const n=await Oa(e.firebaseDependencies,t),a=Object.assign(Object.assign({},t),{token:n,createTime:Date.now()});return await Qe(e.firebaseDependencies,a),n}catch(n){throw n}}async function ht(e,t){const a={token:await La(e,t),createTime:Date.now(),subscriptionOptions:t};return await Qe(e,a),a.token}async function Ua(e,t){const n=await e.pushManager.getSubscription();return n||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Ea(t)})}function Wa(e,t){const n=t.vapidKey===e.vapidKey,a=t.endpoint===e.endpoint,s=t.auth===e.auth,r=t.p256dh===e.p256dh;return n&&a&&s&&r}/**
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
 */function mt(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return za(t,e),Ha(t,e),Ka(t,e),t}function za(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const a=t.notification.body;a&&(e.notification.body=a);const s=t.notification.image;s&&(e.notification.image=s);const r=t.notification.icon;r&&(e.notification.icon=r)}function Ha(e,t){t.data&&(e.data=t.data)}function Ka(e,t){var n,a,s,r,i;if(!t.fcmOptions&&!(!((n=t.notification)===null||n===void 0)&&n.click_action))return;e.fcmOptions={};const d=(s=(a=t.fcmOptions)===null||a===void 0?void 0:a.link)!==null&&s!==void 0?s:(r=t.notification)===null||r===void 0?void 0:r.click_action;d&&(e.fcmOptions.link=d);const u=(i=t.fcmOptions)===null||i===void 0?void 0:i.analytics_label;u&&(e.fcmOptions.analyticsLabel=u)}/**
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
 */function Ga(e){return typeof e=="object"&&!!e&&tn in e}/**
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
 */function Va(e){if(!e||!e.options)throw $e("App Configuration Object");if(!e.name)throw $e("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const a of t)if(!n[a])throw $e(a);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function $e(e){return R.create("missing-app-config-values",{valueName:e})}/**
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
 */class qa{constructor(t,n,a){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const s=Va(t);this.firebaseDependencies={app:t,appConfig:s,installations:n,analyticsProvider:a}}_delete(){return Promise.resolve()}}/**
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
 */async function Ya(e){try{e.swRegistration=await navigator.serviceWorker.register(wa,{scope:Sa}),e.swRegistration.update().catch(()=>{})}catch(t){throw R.create("failed-service-worker-registration",{browserErrorMessage:t==null?void 0:t.message})}}/**
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
 */async function Ja(e,t){if(!t&&!e.swRegistration&&await Ya(e),!(!t&&e.swRegistration)){if(!(t instanceof ServiceWorkerRegistration))throw R.create("invalid-sw-registration");e.swRegistration=t}}/**
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
 */async function Za(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=en)}/**
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
 */async function sn(e,t){if(!navigator)throw R.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw R.create("permission-blocked");return await Za(e,t==null?void 0:t.vapidKey),await Ja(e,t==null?void 0:t.serviceWorkerRegistration),Ba(e)}/**
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
 */async function Xa(e,t,n){const a=Qa(t);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(a,{message_id:n[tn],message_name:n[ja],message_time:n[Ca],message_device_time:Math.floor(Date.now()/1e3)})}function Qa(e){switch(e){case xe.NOTIFICATION_CLICKED:return"notification_open";case xe.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
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
 */async function es(e,t){const n=t.data;if(!n.isFirebaseMessaging)return;e.onMessageHandler&&n.messageType===xe.PUSH_RECEIVED&&(typeof e.onMessageHandler=="function"?e.onMessageHandler(mt(n)):e.onMessageHandler.next(mt(n)));const a=n.data;Ga(a)&&a[Na]==="1"&&await Xa(e,n.messageType,a)}const gt="@firebase/messaging",pt="0.12.12";/**
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
 */const ts=e=>{const t=new qa(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",n=>es(t,n)),t},ns=e=>{const t=e.getProvider("messaging").getImmediate();return{getToken:a=>sn(t,a)}};function os(){Ce(new Ne("messaging",ts,"PUBLIC")),Ce(new Ne("messaging-internal",ns,"PRIVATE")),je(gt,pt),je(gt,pt,"esm2017")}/**
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
 */async function rn(){try{await kn()}catch{return!1}return typeof window<"u"&&jn()&&Cn()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
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
 */function as(e=Nn()){return rn().then(t=>{if(!t)throw R.create("unsupported-browser")},t=>{throw R.create("indexed-db-unsupported")}),Ke(It(e),"messaging").getImmediate()}async function Ur(e,t){return e=It(e),sn(e,t)}os();const ss={apiKey:"AIzaSyBrAZBMOWmvy0afvp_l2EEbVusz08ziMQ0",authDomain:"kaspit-d01e9.firebaseapp.com",projectId:"kaspit-d01e9",storageBucket:"kaspit-d01e9.firebasestorage.app",messagingSenderId:"45946797475",appId:"1:45946797475:web:9bf0003a39f530d805ee16"},nt=En(ss),W=In(nt),b=An(nt,{localCache:Tn()}),ft=new At,Wr=rn().then(e=>e?as(nt):null);async function rs(e){const t=S(b,"users",e.uid),n=await X(t);return n.exists()?n.data():(await K(t,{displayName:e.displayName,email:e.email,householdId:null,createdAt:new Date().toISOString()}),{householdId:null})}async function is(e){return(await X(S(b,"usernames",e.toLowerCase()))).exists()}async function cs(e,t){await K(S(b,"usernames",e.toLowerCase()),{uid:t})}async function ls(e){const t=await X(S(b,"usernames",e.toLowerCase()));return t.exists()?t.data().email:null}async function ds(e){const t=await X(S(b,"users",e));return t.exists()?t.data():{}}async function us(e,t){await ae(S(b,"users",e),{email:t})}async function cn(e,t){await K(S(b,"users",e),{householdId:t},{merge:!0})}async function zr(e,t){await ae(S(b,"users",e),{pendingWhatsappPhone:t,whatsappNumber:""})}async function Hr(e){await ae(S(b,"users",e),{whatsappNumber:"",pendingWhatsappPhone:""})}async function hs(e,t){await K(S(b,"households",e,"settings","main"),{cycleStartDay:t},{merge:!0})}async function Kr(e,{enabled:t,time:n,token:a}){await ae(S(b,"users",e),{reminderEnabled:t,reminderTime:n||null,fcmToken:a||null})}async function Gr(e){const t=await X(S(b,"users",e));if(!t.exists())return{enabled:!1,time:"20:00"};const n=t.data();return{enabled:n.reminderEnabled||!1,time:n.reminderTime||"20:00"}}function ms(){const e="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";return Array.from({length:6},()=>e[Math.floor(Math.random()*e.length)]).join("")}async function gs(e){var a;const t=ms(),n=await Ve(oe(b,"households"),{name:`הבית של ${((a=e.displayName)==null?void 0:a.split(" ")[0])||"המשפחה"}`,members:[{uid:e.uid,displayName:e.displayName||""}],memberUids:[e.uid],inviteCode:t,createdAt:new Date().toISOString()});return await cn(e.uid,n.id),{householdId:n.id,inviteCode:t}}async function ps(e,t){const n=Ee(oe(b,"households"),ge("inviteCode","==",t.trim().toUpperCase()),Dn(1)),a=await qe(n);if(a.empty)throw new Error("קוד הזמנה לא נמצא");const s=a.docs[0],r=s.data().memberUids||[];if(r.length>=1&&!r.includes(e.uid)){const i=r[0],d=await X(S(b,"subscriptions",i)),u=d.exists()?d.data():null;if(!((u==null?void 0:u.status)==="active"||(u==null?void 0:u.status)==="trial"&&new Date(u.trialEndsAt)>new Date))throw new Error("REQUIRES_PREMIUM")}if(!r.includes(e.uid)){const i=s.data().members||[];await ae(S(b,"households",s.id),{members:[...i,{uid:e.uid,displayName:e.displayName||""}],memberUids:[...r,e.uid]})}return await cn(e.uid,s.id),s.id}async function Vr(e){const t=await X(S(b,"households",e));if(!t.exists())return null;const n={id:t.id,...t.data()};if(!n.memberUids){const a=(n.members||[]).map(s=>typeof s=="string"?s:s.uid);await ae(S(b,"households",e),{memberUids:a}),n.memberUids=a}return n}function qr(e){return Promise.resolve(e.map(t=>typeof t=="string"?{uid:t,displayName:t}:t))}async function fs(e,t){await Promise.all([K(S(b,"households",e),{customCategories:t},{merge:!0}),ot(e,{customCategories:t})])}async function Yr(e,t){await Promise.all([K(S(b,"households",e),{budgets:t},{merge:!0}),ot(e,{budgets:t})])}async function yt(e,t){await K(S(b,"households",e),{currency:t},{merge:!0})}async function Jr(e,t){await Promise.all([K(S(b,"households",e),{savingsGoal:t},{merge:!0}),ot(e,{savingsGoal:t})])}async function ot(e,t){await K(S(b,"households",e,"settings","main"),t,{merge:!0})}async function at(e,t){const[n,a]=t.split("-").map(Number),s=`${t}-01`,r=a===12?n+1:n,i=a===12?1:a+1,d=`${r}-${String(i).padStart(2,"0")}-01`,c=(await qe(Ee(oe(b,"households",e,"entries"),ge("date",">=",s),ge("date","<",d)))).docs.map(m=>m.data()),h=c.filter(m=>m.type==="income").reduce((m,y)=>m+y.amount,0),p=c.filter(m=>m.type!=="income").reduce((m,y)=>m+y.amount,0),x=c.filter(m=>m.type==="saving").reduce((m,y)=>m+y.amount,0),v={};c.filter(m=>m.type!=="income").forEach(m=>{v[m.category]=(v[m.category]||0)+m.amount}),await K(S(b,"households",e,"monthlySummaries",t),{month:t,totalIncome:h,totalExpenses:p,totalSavings:x,byCategory:v,entryCount:c.length,updatedAt:new Date().toISOString()})}async function Zr(e,t){return(await Ve(oe(b,"households",e,"accounts"),t)).id}async function Xr(e,t,n){await ae(S(b,"households",e,"accounts",t),n)}async function Qr(e,t){await Tt(S(b,"households",e,"accounts",t))}async function ys(e,t,n){var i;const s=((i=(await X(S(b,"households",e))).data())==null?void 0:i.memberUids)||[n.uid];await Ve(oe(b,"households",e,"entries"),{...t,householdId:e,memberUids:s,addedBy:n.displayName||"unknown",addedByUid:n.uid,createdAt:new Date().toISOString()});const r=t.date.slice(0,7);at(e,r).catch(d=>console.error("summary update error:",d))}async function bs(e,t,n){if(await ae(S(b,"households",e,"entries",t),n),n.date){const a=n.date.slice(0,7);at(e,a).catch(s=>console.error("summary update error:",s))}}async function vs(e,t){var s;const a=(s=(await X(S(b,"households",e,"entries",t))).data())==null?void 0:s.date;await Tt(S(b,"households",e,"entries",t)),a&&at(e,a.slice(0,7)).catch(r=>console.error("summary update error:",r))}function xs(){const[e,t]=l.useState(null),[n,a]=l.useState(null),[s,r]=l.useState(!0);return l.useEffect(()=>Pn(W,async d=>{if(d){t(d);try{const u=await rs(d);u.householdId&&a(u.householdId)}catch{}}else t(null),a(null);r(!1)}),[]),{user:e,householdId:n,setHouseholdId:a,loading:s}}function bt(){const e=new Date,t=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-01`,n=new Date(e);return n.setMonth(n.getMonth()-6),{thisMonthStart:t,historyStart:n.toISOString().slice(0,10)}}function ws(e){const[t,n]=l.useState([]),[a,s]=l.useState([]);return l.useEffect(()=>{if(!e){n([]);return}const{thisMonthStart:r}=bt(),i=Ee(oe(b,"households",e,"entries"),ge("date",">=",r),st("date","desc"));return ve(i,d=>n(d.docs.map(u=>({id:u.id,...u.data()}))),d=>console.error("entries listener error:",d))},[e]),l.useEffect(()=>{if(!e){s([]);return}const{thisMonthStart:r,historyStart:i}=bt(),d=Ee(oe(b,"households",e,"entries"),ge("date",">=",i),ge("date","<",r),st("date","desc"));qe(d).then(u=>s(u.docs.map(c=>({id:c.id,...c.data()})))).catch(u=>console.error("history fetch error:",u))},[e]),[...t,...a]}function Ss(e){const[t,n]=l.useState({}),[a,s]=l.useState(null),[r,i]=l.useState([]),[d,u]=l.useState([]),[c,h]=l.useState(null),[p,x]=l.useState(null);return l.useEffect(()=>{if(!e){u([]);return}return ve(S(b,"households",e),v=>{var y;const m=v.data()||{};if(!m.memberUids&&((y=m.members)==null?void 0:y.length)>0){const N=m.members.map(E=>typeof E=="string"?E:E.uid);K(S(b,"households",e),{memberUids:N},{merge:!0}).catch(console.error),u(N)}else u(m.memberUids||[]);m.currency&&h(m.currency)},v=>console.error("household listener error:",v))},[e]),l.useEffect(()=>{if(e)return ve(S(b,"households",e,"settings","main"),v=>{if(v.exists()){const m=v.data();n(m.budgets||{}),s(m.savingsGoal||null),i(m.customCategories||[]),m.cycleStartDay&&x(m.cycleStartDay)}else X(S(b,"households",e)).then(m=>{const y=m.data()||{};n(y.budgets||{}),s(y.savingsGoal||null),i(y.customCategories||[]),y.cycleStartDay&&x(y.cycleStartDay)}).catch(console.error)},v=>console.error("settings listener error:",v))},[e]),{budgets:t,savingsGoal:a,customCategories:r,memberUids:d,currency:c,cycleStartDay:p}}function ks(e){const[t,n]=l.useState([]);return l.useEffect(()=>{if(!e){n([]);return}return ve(oe(b,"households",e,"accounts"),a=>n(a.docs.map(s=>({id:s.id,...s.data()}))),a=>console.error("accounts listener error:",a))},[e]),t}const js={ILS:"₪",USD:"$",EUR:"€",GBP:"£",JPY:"¥",CAD:"$",AUD:"$",CHF:"Fr",CNY:"¥",INR:"₹",MXN:"$",BRL:"R$",KRW:"₩",SGD:"$",HKD:"$",NOK:"kr",SEK:"kr",DKK:"kr",PLN:"zł",TRY:"₺",AED:"د.إ"};function ei(e,t){const n=localStorage.getItem("budgi-currency")||"ILS",a=js[n]||n,r=(localStorage.getItem("i18nextLng")||"he")==="he"?"he-IL":"en-US";return a+Math.round(Math.abs(e)).toLocaleString(r)}function Cs(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function Pe(e,t,n=1){const a=`${t}-${String(e+1).padStart(2,"0")}-${String(n).padStart(2,"0")}`,s=new Date(t,e+1,n-1);return{start:a,end:Cs(s)}}function ti(e,t,n,a=1){if(a===1)return e.filter(i=>{if(!i.date)return!1;const[d,u]=i.date.split("-").map(Number);return u-1===t&&d===n});const{start:s,end:r}=Pe(t,n,a);return e.filter(i=>i.date>=s&&i.date<=r)}function Ns(e){const[t,n]=(e||"").split("-").map(Number);return{y:t,m:n}}function Es(e,t,n,a){return(n-e)*12+(a-t)}function Is(e){const t={};return e.forEach(n=>{if(n.fixed!=="fixed"&&n.fixed!=="bimonthly")return;const a=t[n.name];(!a||n.date>a.lastDate)&&(t[n.name]={name:n.name,category:n.category,fixed:n.fixed,type:n.type,amount:n.amount,lastDate:n.date,recurringMonths:n.recurringMonths||null,recurringUntil:n.recurringUntil||null})}),Object.values(t)}function As(e,t,n,a,s,r,i=1){const d=l.useRef(new Set);l.useEffect(()=>{if(!a||!s||e.length===0)return;const u=`${n}-${t}-${i}`;if(d.current.has(u))return;d.current.add(u);const c=Is(e),{start:h,end:p}=Pe(t,n,i),x=e.filter(m=>m.date>=h&&m.date<=p),v=h;c.forEach(async m=>{var N;if(!x.some(E=>E.name===m.name)){if(m.fixed==="bimonthly"){const{y:E,m:T}=Ns(m.lastDate);if(Es(E,T-1,n,t)<2)return}if(!(m.recurringUntil&&`${n}-${String(t+1).padStart(2,"0")}`>m.recurringUntil))try{const T=((N=(await X(S(b,"households",a))).data())==null?void 0:N.memberUids)||[s.uid],I=`auto-${h}-${m.name.replace(/\//g,"-")}`;await K(S(b,"households",a,"entries",I),{name:m.name,amount:m.amount,category:m.category,date:v,fixed:m.fixed,type:m.type,note:"הועבר אוטומטית",householdId:a,memberUids:T,recurringMonths:m.recurringMonths,recurringUntil:m.recurringUntil,uid:s.uid,createdAt:new Date().toISOString()},{merge:!1})}catch(E){console.error("auto-recurring:",E)}}})},[t,n,a,e])}function Ts(e){const[t,n]=l.useState(void 0);l.useEffect(()=>{if(!(e!=null&&e.uid)){n(null);return}return ve(S(b,"subscriptions",e.uid),async d=>{if(!d.exists()){try{const u=new Date(Date.now()+5184e6).toISOString();await K(S(b,"subscriptions",e.uid),{uid:e.uid,plan:"premium",status:"trial",trialEndsAt:u,createdAt:new Date().toISOString()})}catch(u){console.error("trial create error:",u),n(null)}return}n(d.data())},d=>{console.error("subscription listener error:",d),n(null)})},[e==null?void 0:e.uid]);const a=typeof window<"u"&&localStorage.getItem("budgi-force-free")==="1",s=a?!1:t===void 0?!0:(t==null?void 0:t.status)==="active"||(t==null?void 0:t.status)==="trial"&&new Date(t.trialEndsAt)>new Date,r=a?3:(t==null?void 0:t.status)==="trial"?Math.max(0,Math.ceil((new Date(t.trialEndsAt)-Date.now())/864e5)):null,i=a?"trial":(t==null?void 0:t.status)??null;return{isPremium:s,status:i,trialDaysLeft:r,subscription:t}}const He=["housing","food","transport","kids","health","education","clothing","coffee","dining","leisure","sport","telecom","travel","shopping","insurance","pets","savings","cosmetics","home_maintenance","income","other"];function Ds(e){return He.map(t=>({value:t,label:e(`categories.${t}`)}))}function ln(e){return e("months",{returnObjects:!0})}/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dn=(...e)=>e.filter((t,n,a)=>!!t&&t.trim()!==""&&a.indexOf(t)===n).join(" ").trim();/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ps=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ms=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,n,a)=>a?a.toUpperCase():n.toLowerCase());/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vt=e=>{const t=Ms(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Be={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _s=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},Ls=l.createContext({}),Os=()=>l.useContext(Ls),Rs=l.forwardRef(({color:e,size:t,strokeWidth:n,absoluteStrokeWidth:a,className:s="",children:r,iconNode:i,...d},u)=>{const{size:c=24,strokeWidth:h=2,absoluteStrokeWidth:p=!1,color:x="currentColor",className:v=""}=Os()??{},m=a??p?Number(n??h)*24/Number(t??c):n??h;return l.createElement("svg",{ref:u,...Be,width:t??c??Be.width,height:t??c??Be.height,stroke:e??x,strokeWidth:m,className:dn("lucide",v,s),...!r&&!_s(d)&&{"aria-hidden":"true"},...d},[...i.map(([y,N])=>l.createElement(y,N)),...Array.isArray(r)?r:[r]])});/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=(e,t)=>{const n=l.forwardRef(({className:a,...s},r)=>l.createElement(Rs,{ref:r,iconNode:t,className:dn(`lucide-${Ps(vt(e))}`,`lucide-${e}`,a),...s}));return n.displayName=vt(e),n};/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $s=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],Bs=G("chevron-up",$s);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fs=[["path",{d:"M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",key:"1vdc57"}],["path",{d:"M5 21h14",key:"11awu3"}]],Us=G("crown",Fs);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ws=[["path",{d:"M10 18v-7",key:"wt116b"}],["path",{d:"M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z",key:"1m329m"}],["path",{d:"M14 18v-7",key:"vav6t3"}],["path",{d:"M18 18v-7",key:"aexdmj"}],["path",{d:"M3 22h18",key:"8prr45"}],["path",{d:"M6 18v-7",key:"1ivflk"}]],zs=G("landmark",Ws);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hs=[["path",{d:"m5 8 6 6",key:"1wu5hv"}],["path",{d:"m4 14 6-6 2-3",key:"1k1g8d"}],["path",{d:"M2 5h12",key:"or177f"}],["path",{d:"M7 2h1",key:"1t2jsx"}],["path",{d:"m22 22-5-10-5 10",key:"don7ne"}],["path",{d:"M14 18h6",key:"1m8k6r"}]],Ks=G("languages",Hs);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gs=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],un=G("layout-dashboard",Gs);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vs=[["path",{d:"M11 5h10",key:"1cz7ny"}],["path",{d:"M11 12h10",key:"1438ji"}],["path",{d:"M11 19h10",key:"11t30w"}],["path",{d:"M4 4h1v5",key:"10yrso"}],["path",{d:"M4 9h2",key:"r1h2o0"}],["path",{d:"M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02",key:"xtkcd5"}]],hn=G("list-ordered",Vs);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qs=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],Ys=G("log-out",qs);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Js=[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]],mn=G("message-circle",Js);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zs=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],Xs=G("refresh-cw",Zs);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qs=[["path",{d:"M12 3v18",key:"108xh3"}],["path",{d:"m19 8 3 8a5 5 0 0 1-6 0zV7",key:"zcdpyk"}],["path",{d:"M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1",key:"1yorad"}],["path",{d:"m5 8 3 8a5 5 0 0 1-6 0zV7",key:"eua70x"}],["path",{d:"M7 21h10",key:"1b0cd5"}]],er=G("scale",Qs);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tr=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],gn=G("settings",tr);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nr=[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]],pn=G("trending-up",nr);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const or=[["path",{d:"M11.5 15H7a4 4 0 0 0-4 4v2",key:"15lzij"}],["path",{d:"M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",key:"1817ys"}],["circle",{cx:"10",cy:"7",r:"4",key:"e45bow"}]],ar=G("user-pen",or),sr=["feature1","feature2","feature3"],rr=/^[a-zA-Z0-9_\u0590-\u05FF]{2,20}$/,ir=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function fn(e){let t=0;return e.length>=8&&t++,e.length>=12&&t++,/[A-Z]/.test(e)&&t++,/[0-9]/.test(e)&&t++,/[^a-zA-Z0-9\u0590-\u05FF]/.test(e)&&t++,t}function cr({password:e}){const{t}=H();if(!e)return null;const n=fn(e),a=[t("login.strengthVeryWeak"),t("login.strengthWeak"),t("login.strengthFair"),t("login.strengthGood"),t("login.strengthStrong")],s=["#c0392b","#e67e22","#f1c40f","#27ae60","#2D6A4F"];return o.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[o.jsx("div",{style:{display:"flex",gap:3},children:[1,2,3,4,5].map(r=>o.jsx("div",{style:{flex:1,height:4,borderRadius:2,background:n>=r?s[Math.min(n,5)-1]:"var(--border)",transition:"background 0.2s"}},r))}),o.jsx("div",{style:{fontSize:11,color:n>=3?"var(--text2)":"#c0392b",textAlign:"start"},children:a[Math.min(n,4)]})]})}function be({msg:e}){return e?o.jsx("div",{style:{fontSize:11,color:"#c0392b",marginTop:-6,textAlign:"start"},children:e}):null}function lr(){return o.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",style:{flexShrink:0},children:[o.jsx("path",{fill:"#4285F4",d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"}),o.jsx("path",{fill:"#34A853",d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"}),o.jsx("path",{fill:"#FBBC05",d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"}),o.jsx("path",{fill:"#EA4335",d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"})]})}function dr({onNewUser:e}){const{t,i18n:n}=H(),[a,s]=l.useState(""),[r,i]=l.useState(""),[d,u]=l.useState(!1),[c,h]=l.useState(!1),[p,x]=l.useState(!1),[v,m]=l.useState(""),[y,N]=l.useState(""),[E,T]=l.useState(""),[I,$]=l.useState(""),[j,M]=l.useState(""),[A,L]=l.useState({}),_=w=>L(q=>({...q,[w]:!0})),B=n.language==="he";function V(){const w=B?"en":"he";n.changeLanguage(w),localStorage.setItem("budgi-lang",w),document.body.dir=w==="he"?"rtl":"ltr"}const C={username:rr.test(v.trim())?"":t("login.errorUsernameChars"),displayName:y.trim().length<2?t("login.errorDisplayName"):"",email:ir.test(E.trim())?"":t("login.errorEmailFormat"),password:fn(I)<2?t("login.errorWeakPassword"):"",confirm:I!==j?t("login.errorPasswordMatch"):""},F=c?!C.username&&!C.displayName&&!C.email&&!C.password&&!C.confirm:!C.username&&I.length>=1;async function Q(){s(""),i("google");try{await Dt(W,ft)}catch(w){if(w.code==="auth/popup-blocked"||w.code==="auth/popup-closed-by-user")try{await Mn(W,ft)}catch(q){s(t("login.errorGeneric")+q.message)}else w.code==="auth/unauthorized-domain"?s(t("login.errorDomain")):s(t("login.errorGeneric")+w.message)}finally{i("")}}async function z(w){if(w.preventDefault(),L(c?{username:!0,displayName:!0,email:!0,password:!0,confirm:!0}:{username:!0,password:!0}),!!F){s(""),i("manual");try{const D=v.trim().toLowerCase();if(c){if(await is(D)){s(t("login.errorUsernameTaken"));return}const U=`${D}@budgi.internal`;e==null||e();const J=await _n(W,U,I);await Pt(J.user,{displayName:y.trim()}),await cs(D,J.user.uid)}else{if(!await ls(D)){s(t("login.errorUsernameNotFound"));return}const U=`${D}@budgi.internal`;await Ln(W,U,I)}}catch(D){D.code==="auth/wrong-password"||D.code==="auth/invalid-credential"?s(t("login.errorWrongPassword")):s(t("login.errorGeneric")+D.message)}finally{i("")}}}function Z(w){h(w),u(!0),s(""),m(""),N(""),T(""),$(""),M(""),L({})}return o.jsxs("div",{className:"login-screen",dir:B?"rtl":"ltr",children:[o.jsx("button",{className:"login-lang-btn",onClick:V,children:B?"EN":"עב"}),o.jsxs("div",{className:"login-hero",children:[o.jsxs("svg",{width:"72",height:"56",viewBox:"0 0 72 56",fill:"none",style:{marginBottom:4},children:[o.jsx("rect",{x:"4",y:"20",width:"24",height:"30",rx:"4",fill:"#F4EBD0",stroke:"#D6C9A8",strokeWidth:"1.2"}),o.jsx("rect",{x:"32",y:"10",width:"24",height:"40",rx:"4",fill:"#F4EBD0",stroke:"#D6C9A8",strokeWidth:"1.2"}),o.jsx("rect",{x:"4",y:"28",width:"24",height:"4",rx:"2",fill:"#2D6A4F",opacity:"0.7"}),o.jsx("rect",{x:"32",y:"18",width:"24",height:"4",rx:"2",fill:"#2D6A4F",opacity:"0.9"}),o.jsx("rect",{x:"32",y:"26",width:"14",height:"4",rx:"2",fill:"#2D6A4F",opacity:"0.5"}),o.jsx("circle",{cx:"60",cy:"14",r:"10",fill:"#2D6A4F",opacity:"0.12"}),o.jsx("path",{d:"M54 14 L58 18 L66 10",stroke:"#2D6A4F",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",opacity:"0.8"})]}),o.jsxs("div",{className:"login-wordmark",dir:"ltr",children:[o.jsx("span",{className:"login-wordmark-b",children:"B"}),o.jsx("span",{className:"login-wordmark-rest",children:"udgi"})]}),o.jsx("div",{className:"login-tagline",children:t("login.tagline")})]}),o.jsxs("div",{className:"login-card",children:[d?o.jsxs("form",{onSubmit:z,noValidate:!0,style:{display:"flex",flexDirection:"column",gap:8,width:"100%"},children:[o.jsx("div",{className:"login-form-title",children:t(c?"login.createAccount":"login.signInManual")}),o.jsx("input",{className:`form-input${A.username&&C.username?" input-error":""}`,placeholder:t("login.usernameLabel"),value:v,onChange:w=>m(w.target.value),onBlur:()=>_("username"),autoFocus:!0,autoCapitalize:"none",autoCorrect:"off",dir:"ltr"}),A.username&&o.jsx(be,{msg:C.username}),c&&o.jsxs(o.Fragment,{children:[o.jsx("input",{className:`form-input${A.displayName&&C.displayName?" input-error":""}`,placeholder:t("login.displayNamePlaceholder"),value:y,onChange:w=>N(w.target.value),onBlur:()=>_("displayName")}),A.displayName&&o.jsx(be,{msg:C.displayName}),o.jsx("input",{className:`form-input${A.email&&C.email?" input-error":""}`,type:"email",placeholder:t("login.emailPlaceholder"),value:E,onChange:w=>T(w.target.value),onBlur:()=>_("email"),dir:"ltr"}),A.email&&o.jsx(be,{msg:C.email})]}),o.jsxs("div",{style:{position:"relative"},children:[o.jsx("input",{className:`form-input${A.password&&C.password?" input-error":""}`,type:p?"text":"password",placeholder:t("login.passwordLabel"),value:I,onChange:w=>$(w.target.value),onBlur:()=>_("password"),dir:"ltr",style:{paddingInlineEnd:44}}),o.jsx("button",{type:"button",onClick:()=>x(w=>!w),style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"var(--text3)",fontSize:13,padding:4},tabIndex:-1,children:p?"🙈":"👁"})]}),c&&o.jsx(cr,{password:I}),A.password&&!c&&o.jsx(be,{msg:C.password}),c&&o.jsxs(o.Fragment,{children:[o.jsx("div",{style:{position:"relative"},children:o.jsx("input",{className:`form-input${A.confirm&&C.confirm?" input-error":""}`,type:p?"text":"password",placeholder:t("login.passwordConfirmLabel"),value:j,onChange:w=>M(w.target.value),onBlur:()=>_("confirm"),dir:"ltr",style:{paddingInlineEnd:44}})}),A.confirm&&o.jsx(be,{msg:C.confirm})]}),o.jsx("button",{className:"login-provider-btn login-provider-manual",type:"submit",disabled:!!r,style:{marginTop:6},children:r==="manual"?"...":t(c?"login.createAccount":"login.signInBtn")}),o.jsx("button",{type:"button",className:"login-switch-link",onClick:()=>Z(!c),children:t(c?"login.switchToSignIn":"login.switchToCreate")}),o.jsxs("button",{type:"button",className:"login-switch-link",onClick:()=>{u(!1),s("")},children:["← ",t("login.backToOptions")]})]}):o.jsxs(o.Fragment,{children:[o.jsxs("button",{className:"login-provider-btn",onClick:Q,disabled:!!r,children:[o.jsx(lr,{})," ",r==="google"?"...":t("login.signInGoogle")]}),o.jsx("div",{className:"login-or",children:o.jsx("span",{children:t("login.orDivider")})}),o.jsx("button",{className:"login-provider-btn login-provider-manual",onClick:()=>Z(!1),disabled:!!r,children:t("login.signInManual")}),o.jsx("button",{className:"login-provider-btn login-provider-create",onClick:()=>Z(!0),disabled:!!r,children:t("login.createAccount")})]}),a&&o.jsx("div",{className:"login-error",children:a}),o.jsx("div",{className:"login-hint",children:t("login.hint")})]}),!d&&o.jsx("div",{className:"login-features",children:sr.map(w=>o.jsxs("div",{className:"login-feature-row",children:[o.jsx("span",{className:"login-feature-check",children:"✓"}),o.jsx("span",{children:t(`login.${w}`)})]},w))}),o.jsx("div",{className:"login-footer",children:t("login.footer")})]})}function xt(){const{i18n:e}=H(),t=e.language==="he";function n(){const a=t?"en":"he";e.changeLanguage(a),localStorage.setItem("budgi-lang",a),document.body.dir=a==="he"?"rtl":"ltr"}return o.jsx("button",{className:"login-lang-btn",onClick:n,children:t?"EN":"עב"})}function ur({user:e,onComplete:t}){const{t:n}=H(),[a,s]=l.useState("choose"),[r,i]=l.useState(""),[d,u]=l.useState(""),[c,h]=l.useState(""),[p,x]=l.useState(!1);async function v(){x(!0),h("");try{const{householdId:y,inviteCode:N}=await gs(e);i(N),s("created"),t(y)}catch(y){h(n("household.errorCreate")+y.message)}finally{x(!1)}}async function m(){if(d.trim()){x(!0),h("");try{const y=await ps(e,d);t(y)}catch(y){h(y.message==="REQUIRES_PREMIUM"?n("household.errorJoinPremium"):y.message||n("household.errorJoin"))}finally{x(!1)}}}if(a==="choose")return o.jsxs("div",{className:"household-screen",children:[o.jsx(xt,{}),o.jsx("div",{style:{fontSize:48},children:"🏠"}),o.jsx("h2",{children:n("household.welcome")}),o.jsx("p",{children:n("household.chooseDesc")}),o.jsxs("div",{className:"household-actions",children:[o.jsx("button",{className:"btn-primary",onClick:v,disabled:p,children:n(p?"household.creating":"household.create")}),o.jsx("div",{className:"divider",children:n("household.or")}),o.jsx("button",{className:"btn-secondary",onClick:()=>s("join"),children:n("household.join")})]}),c&&o.jsx("div",{className:"login-error",children:c}),o.jsx("button",{onClick:()=>We(W),style:{marginTop:24,background:"none",border:"none",color:"var(--text3)",fontSize:13,cursor:"pointer",textDecoration:"underline"},children:n("header.signOut")})]});if(a==="created")return o.jsxs("div",{className:"household-screen",children:[o.jsx("div",{style:{fontSize:48},children:"🎉"}),o.jsx("h2",{children:n("household.created")}),o.jsx("p",{children:n("household.createdDesc")}),o.jsxs("div",{className:"invite-code-display",children:[o.jsx("p",{children:n("household.inviteLabel")}),o.jsx("div",{className:"code",children:r}),o.jsx("p",{children:n("household.inviteHint")})]}),o.jsx("p",{style:{fontSize:13,color:"var(--text2)",textAlign:"center"},children:n("household.autoLogin")})]});if(a==="join")return o.jsxs("div",{className:"household-screen",children:[o.jsx(xt,{}),o.jsx("div",{style:{fontSize:48},children:"🔑"}),o.jsx("h2",{children:n("household.joinTitle")}),o.jsx("p",{children:n("household.joinDesc")}),o.jsxs("div",{className:"join-form",children:[o.jsx("input",{className:"form-input",placeholder:n("household.joinPlaceholder"),value:d,onChange:y=>u(y.target.value.toUpperCase()),maxLength:6,style:{textAlign:"center",letterSpacing:4,fontSize:20}}),c&&o.jsx("div",{className:"login-error",children:c}),o.jsx("button",{className:"btn-primary",onClick:m,disabled:p||!d.trim(),children:n(p?"household.joining":"household.joinBtn")}),o.jsx("button",{className:"btn-secondary",onClick:()=>{s("choose"),h("")},children:n("household.back")})]})]})}function hr({onContinue:e}){const{t}=H(),n=l.useRef(e);return n.current=e,l.useEffect(()=>{const a=setTimeout(()=>n.current(),5e3);return()=>clearTimeout(a)},[]),o.jsx("div",{className:"welcome-screen",onClick:()=>n.current(),children:o.jsxs("div",{className:"welcome-content",children:[o.jsxs("svg",{width:"80",height:"80",viewBox:"0 0 80 80",fill:"none",className:"welcome-check",children:[o.jsx("circle",{cx:"40",cy:"40",r:"38",stroke:"#2D6A4F",strokeWidth:"3",fill:"#F4EBD0"}),o.jsx("path",{d:"M22 40L34 52L58 28",stroke:"#2D6A4F",strokeWidth:"4",strokeLinecap:"round",strokeLinejoin:"round"})]}),o.jsxs("div",{className:"welcome-wordmark",dir:"ltr",children:[o.jsx("span",{style:{fontWeight:700,color:"var(--accent)"},children:"B"}),o.jsx("span",{style:{color:"var(--text1)"},children:"udgi"})]}),o.jsx("h1",{className:"welcome-headline",children:t("welcome.headline")}),o.jsx("p",{className:"welcome-sub",children:t("welcome.sub")}),o.jsx("button",{className:"welcome-btn",onClick:a=>{a.stopPropagation(),n.current()},children:t("welcome.continue")}),o.jsx("p",{className:"welcome-hint",children:"לחצו בכל מקום להמשך"})]})})}const mr=[{code:"ILS",symbol:"₪",flag:"🇮🇱",name:"שקל ישראלי",nameEn:"Israeli Shekel"},{code:"USD",symbol:"$",flag:"🇺🇸",name:"דולר אמריקאי",nameEn:"US Dollar"},{code:"EUR",symbol:"€",flag:"🇪🇺",name:"אירו",nameEn:"Euro"},{code:"GBP",symbol:"£",flag:"🇬🇧",name:"לירה שטרלינג",nameEn:"British Pound"},{code:"JPY",symbol:"¥",flag:"🇯🇵",name:"ין יפני",nameEn:"Japanese Yen"},{code:"CAD",symbol:"$",flag:"🇨🇦",name:"דולר קנדי",nameEn:"Canadian Dollar"},{code:"AUD",symbol:"$",flag:"🇦🇺",name:"דולר אוסטרלי",nameEn:"Australian Dollar"},{code:"CHF",symbol:"Fr",flag:"🇨🇭",name:"פרנק שוויצרי",nameEn:"Swiss Franc"},{code:"CNY",symbol:"¥",flag:"🇨🇳",name:"יואן סיני",nameEn:"Chinese Yuan"},{code:"INR",symbol:"₹",flag:"🇮🇳",name:"רופי הודי",nameEn:"Indian Rupee"},{code:"MXN",symbol:"$",flag:"🇲🇽",name:"פסו מקסיקני",nameEn:"Mexican Peso"},{code:"BRL",symbol:"R$",flag:"🇧🇷",name:"ריאל ברזילאי",nameEn:"Brazilian Real"},{code:"KRW",symbol:"₩",flag:"🇰🇷",name:"וון קוריאני",nameEn:"Korean Won"},{code:"SGD",symbol:"$",flag:"🇸🇬",name:"דולר סינגפורי",nameEn:"Singapore Dollar"},{code:"HKD",symbol:"$",flag:"🇭🇰",name:"דולר הונג קונג",nameEn:"Hong Kong Dollar"},{code:"NOK",symbol:"kr",flag:"🇳🇴",name:"כתר נורווגי",nameEn:"Norwegian Krone"},{code:"SEK",symbol:"kr",flag:"🇸🇪",name:"כתר שוודי",nameEn:"Swedish Krona"},{code:"DKK",symbol:"kr",flag:"🇩🇰",name:"כתר דני",nameEn:"Danish Krone"},{code:"PLN",symbol:"zł",flag:"🇵🇱",name:"זלוטי פולני",nameEn:"Polish Złoty"},{code:"TRY",symbol:"₺",flag:"🇹🇷",name:"לירה טורקית",nameEn:"Turkish Lira"},{code:"AED",symbol:"د.إ",flag:"🇦🇪",name:"דירהם אמירתי",nameEn:"UAE Dirham"}];function wt({onSelect:e}){const{t,i18n:n}=H(),[a,s]=l.useState(""),[r,i]=l.useState("ILS"),d=n.language==="he",u=mr.filter(c=>{const h=a.toLowerCase();return c.code.toLowerCase().includes(h)||c.nameEn.toLowerCase().includes(h)||c.name.includes(h)||c.symbol.includes(h)});return o.jsx("div",{className:"currency-picker-screen",children:o.jsxs("div",{className:"currency-picker-card",children:[o.jsxs("div",{className:"currency-picker-header",children:[o.jsx("h2",{children:t("currency.title")}),o.jsx("p",{children:t("currency.sub")})]}),o.jsx("input",{className:"form-input currency-search",placeholder:t("currency.search"),value:a,onChange:c=>s(c.target.value),autoFocus:!0,dir:"auto"}),o.jsx("div",{className:"currency-list",children:u.map(c=>o.jsxs("button",{className:`currency-item${r===c.code?" selected":""}`,onClick:()=>i(c.code),children:[o.jsx("span",{className:"currency-flag",children:c.flag}),o.jsx("span",{className:"currency-name",children:d?c.name:c.nameEn}),o.jsxs("span",{className:"currency-code",dir:"ltr",children:[c.symbol," ",c.code]})]},c.code))}),o.jsxs("div",{className:"currency-actions",children:[o.jsx("button",{className:"btn-primary",onClick:()=>e(r),children:t("currency.confirm")}),o.jsx("button",{className:"btn-secondary",onClick:()=>e("ILS"),children:t("currency.skip")})]})]})})}const gr=Array.from({length:28},(e,t)=>t+1);function pr({onSelect:e}){const{t,i18n:n}=H(),a=n.language==="he",[s,r]=l.useState(1),i=ln(t),d=new Date,{start:u,end:c}=Pe(d.getMonth(),d.getFullYear(),s),h=p=>{const[x,v,m]=p.split("-").map(Number);return`${m} ${i[v-1]}`};return o.jsx("div",{className:"currency-picker-screen",children:o.jsxs("div",{className:"currency-picker-card",children:[o.jsxs("div",{className:"currency-picker-header",children:[o.jsx("h2",{children:a?"מתי מתחיל ה״חודש״ שלך?":"When does your month start?"}),o.jsx("p",{children:a?"בחר את היום בחודש שממנו תרצה למדוד הכנסות והוצאות":"Choose the day you want to track from each month"})]}),o.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(7, 1fr)",gap:6,margin:"8px 0 16px"},children:gr.map(p=>{const x=s===p;return o.jsx("button",{onClick:()=>r(p),style:{aspectRatio:"1",border:x?"2px solid var(--accent)":"1.5px solid var(--border)",borderRadius:10,background:x?"var(--accent)":"var(--surface)",color:x?"#fff":"var(--text)",fontFamily:"DM Mono,monospace",fontSize:14,fontWeight:x?700:400,cursor:"pointer",transition:"all .15s"},children:p},p)})}),o.jsx("div",{style:{background:"var(--accent-soft)",border:"1px solid rgba(45,106,79,.2)",borderRadius:10,padding:"10px 14px",marginBottom:20,fontSize:13,color:"var(--accent)",fontWeight:600,textAlign:"center"},children:a?`החודש הנוכחי: ${h(u)} — ${h(c)}`:`This cycle: ${h(u)} — ${h(c)}`}),o.jsxs("div",{className:"currency-actions",children:[o.jsx("button",{className:"btn-primary",onClick:()=>e(s),children:a?"המשך":"Continue"}),o.jsx("button",{className:"btn-secondary",onClick:()=>e(1),children:a?"דלג (1 לחודש)":"Skip (1st of month)"})]})]})})}const Se=[{target:"summary-cards",titleKey:"tour.step1Title",msgKey:"tour.step1",placement:"below"},{target:"month-nav",titleKey:"tour.step2Title",msgKey:"tour.step2",placement:"below"},{target:"fab",titleKey:"tour.step3Title",msgKey:"tour.step3",placement:"above"},{target:"nav",titleKey:"tour.step4Title",msgKey:"tour.step4",placement:"above"},{target:null,titleKey:"tour.step5Title",msgKey:"tour.step5",placement:null}],Fe=240,St=130,kt=16,jt=68,ke=8;function fr(e){const t=document.querySelector(`[data-tour="${e}"]`);return t?t.getBoundingClientRect():null}function yr({onDone:e}){const{t}=H(),[n,a]=l.useState(0),[s,r]=l.useState(null),i=Se[n],d=l.useCallback(()=>r(fr(i.target)),[i.target]);l.useEffect(()=>(d(),window.addEventListener("resize",d),()=>window.removeEventListener("resize",d)),[d]);function u(){localStorage.setItem("budgi-tour-done","1"),e()}function c(){n<Se.length-1?a(j=>j+1):u()}if(i.target===null){const j=/iphone|ipad|ipod/i.test(navigator.userAgent),M=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone;return pe.createPortal(o.jsx("div",{className:"tour-overlay",style:{display:"flex",alignItems:"center",justifyContent:"center",padding:24},onClick:u,children:o.jsxs("div",{className:"tour-tooltip",style:{position:"relative",left:"auto",top:"auto",transform:"none",width:"100%",maxWidth:320},onClick:A=>A.stopPropagation(),children:[o.jsx("div",{style:{fontSize:28,textAlign:"center",marginBottom:8},children:"🔔"}),o.jsx("div",{className:"tour-tooltip-title",style:{textAlign:"center"},children:t(i.titleKey)}),o.jsx("div",{className:"tour-tooltip-msg",children:t(i.msgKey)}),j&&!M&&o.jsxs("div",{style:{background:"#fffbeb",border:"1px solid #fcd34d",borderRadius:8,padding:"10px 12px",marginTop:10,fontSize:11,color:"#92400e"},children:[o.jsx("div",{style:{fontWeight:700,marginBottom:4},children:t("notifications.iosTitle")}),o.jsxs("ol",{style:{margin:0,paddingInlineStart:16,lineHeight:1.9},children:[o.jsxs("li",{children:[t("notifications.iosStep1")," ",o.jsx("span",{style:{fontSize:13},children:"⎋"})]}),o.jsx("li",{children:t("notifications.iosStep2")}),o.jsx("li",{children:t("notifications.iosStep3")})]})]}),o.jsxs("div",{className:"tour-tooltip-footer",children:[o.jsx("span",{}),o.jsxs("span",{className:"tour-counter",children:[n+1,"/",Se.length]}),o.jsx("button",{className:"tour-next",onClick:u,children:t("tour.finish")})]})]})}),document.body)}if(!s)return null;const h=i.placement==="above",p={left:s.left-ke,top:s.top-ke,width:s.width+ke*2,height:s.height+ke*2},x=s.left+s.width/2,v=Math.min(Math.max(x-Fe/2,kt),window.innerWidth-Fe-kt),m=p.top+p.height,y=h?p.top-jt-St:m+jt,E=v+Fe/2,T=h?y+St+4:y-4,I=x,$=h?p.top-4:m+4;return pe.createPortal(o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"tour-overlay",onClick:u}),o.jsx("div",{className:"tour-spotlight",style:{left:p.left,top:p.top,width:p.width,height:p.height},onClick:j=>j.stopPropagation()}),o.jsx(br,{tailX:E,tailY:T,tipX:I,tipY:$,isAbove:h}),o.jsxs("div",{className:"tour-tooltip",style:{left:v,top:y,transform:"none"},onClick:j=>j.stopPropagation(),children:[o.jsx("div",{className:"tour-tooltip-title",children:t(i.titleKey)}),o.jsx("div",{className:"tour-tooltip-msg",children:t(i.msgKey)}),o.jsxs("div",{className:"tour-tooltip-footer",children:[o.jsx("button",{className:"tour-skip",onClick:u,children:t("tour.skip")}),o.jsxs("span",{className:"tour-counter",children:[n+1,"/",Se.length]}),o.jsx("button",{className:"tour-next",onClick:c,children:t("tour.next")})]})]})]}),document.body)}function br({tailX:e,tailY:t,tipX:n,tipY:a,isAbove:s}){const r=(t+a)/2,i=(n-e)*.5+(s?-20:20),d=e+i*.6,u=s?r+10:r-10,c=n-i*.3,h=s?r-10:r+10,p=`M ${e} ${t} C ${d} ${u}, ${c} ${h}, ${n} ${a}`;return o.jsxs("svg",{style:{position:"fixed",inset:0,width:"100vw",height:"100vh",pointerEvents:"none",zIndex:10001,overflow:"visible"},children:[o.jsx("defs",{children:o.jsx("marker",{id:"ca",markerWidth:"10",markerHeight:"10",refX:"9",refY:"5",orient:"auto",children:o.jsx("path",{d:"M 0 0 L 10 5 L 0 10 Z",fill:"#F4D03F",stroke:"#1C1917",strokeWidth:"1",strokeLinejoin:"round"})})}),o.jsx("path",{d:p,stroke:"#1C1917",strokeWidth:"7",fill:"none",strokeLinecap:"round"}),o.jsx("path",{d:p,stroke:"#F4D03F",strokeWidth:"4.5",fill:"none",strokeLinecap:"round",markerEnd:"url(#ca)"})]})}function Ct({fullscreen:e=!1}){return e?o.jsx("div",{className:"loader-overlay",children:o.jsx(Nt,{})}):o.jsx("div",{className:"loader-inline",children:o.jsx(Nt,{small:!0})})}function Nt({small:e}){const t=e?22:34,n=e?36:56;return o.jsxs("div",{className:"loader-mark",style:{width:n,height:n},children:[o.jsxs("svg",{className:"loader-ring",viewBox:`0 0 ${n} ${n}`,width:n,height:n,style:{position:"absolute",inset:0},children:[o.jsx("circle",{cx:n/2,cy:n/2,r:n/2-2.5,fill:"none",stroke:"var(--border)",strokeWidth:"2.5"}),o.jsx("circle",{className:"loader-arc",cx:n/2,cy:n/2,r:n/2-2.5,fill:"none",stroke:"var(--accent)",strokeWidth:"2.5",strokeLinecap:"round",strokeDasharray:Math.PI*(n-5),strokeDashoffset:Math.PI*(n-5)*.75})]}),o.jsx("span",{className:"loader-letter",style:{fontSize:t,lineHeight:`${n}px`},children:"B"})]})}function vr(){const[e,t]=l.useState(!1);return l.useEffect(()=>{function n(){t(window.scrollY>300)}return window.addEventListener("scroll",n,{passive:!0}),()=>window.removeEventListener("scroll",n)},[]),e?pe.createPortal(o.jsx("button",{className:"scroll-top-btn",onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),"aria-label":"Back to top",children:o.jsx(Bs,{size:18,strokeWidth:2.5})}),document.body):null}function xr({user:e,currentMonth:t,currentYear:n,onMonthChange:a,isPremium:s,subStatus:r,trialDaysLeft:i,onNavigate:d,cycleStartDay:u=1}){var ee,ie,ce;const{t:c,i18n:h}=H(),p=h.language==="he"?"he":"en";function x(){const f=h.language==="he"?"en":"he";h.changeLanguage(f),localStorage.setItem("budgi-lang",f)}const[v,m]=l.useState(!1),[y,N]=l.useState(!1),[E,T]=l.useState(""),[I,$]=l.useState(""),[j,M]=l.useState(""),[A,L]=l.useState(""),[_,B]=l.useState(!1),[V,C]=l.useState(""),[F,Q]=l.useState(!1),z=((ie=(ee=e==null?void 0:e.providerData)==null?void 0:ee[0])==null?void 0:ie.providerId)==="google.com";async function Z(){if(m(!1),T((e==null?void 0:e.displayName)||""),M(""),L(""),C(""),!z&&(e!=null&&e.uid)){const f=await ds(e.uid);$((f==null?void 0:f.email)||"")}N(!0)}async function w(){B(!0),C("");try{if(E.trim()&&E.trim()!==e.displayName&&await Pt(W.currentUser,{displayName:E.trim()}),!z&&I.trim()){if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(I.trim()))throw new Error(p==="he"?"כתובת מייל לא תקינה":"Invalid email address");await us(e.uid,I.trim())}if(!z&&A){if(A.length<6)throw new Error(p==="he"?"סיסמה חייבת להכיל לפחות 6 תווים":"Password must be at least 6 characters");if(!j)throw new Error(p==="he"?"יש להזין סיסמה נוכחית לאימות":"Current password required to change password");const f=On.credential(W.currentUser.email,j);await Rn(W.currentUser,f),await $n(W.currentUser,A),M(""),L("")}N(!1),Q(!0),setTimeout(()=>Q(!1),2500)}catch(f){const P=f.code==="auth/wrong-password"||f.code==="auth/invalid-credential"?p==="he"?"סיסמה נוכחית שגויה":"Incorrect current password":f.message;C(P)}finally{B(!1)}}const q=ln(c),D=l.useMemo(()=>{const f=[],P=new Date,g=P.getFullYear()-3,O=P.getFullYear()+1;for(let te=O;te>=g;te--){const fe=te===O?P.getMonth()+1:11;for(let me=fe;me>=0;me--)f.push({month:me,year:te,label:`${q[me]} ${te}`})}return f},[q]),Y=l.useRef(null),U=`${n}-${t}`;l.useEffect(()=>{function f(P){Y.current&&!Y.current.contains(P.target)&&m(!1)}return document.addEventListener("mousedown",f),()=>document.removeEventListener("mousedown",f)},[]);async function J(){m(!1),await We(W);const f=new At;f.setCustomParameters({prompt:"select_account"});try{await Dt(W,f)}catch{}}function re(f){const[P,g]=f.target.value.split("-").map(Number);a(g,P)}return o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"app-header",children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14},children:[o.jsxs("div",{className:"app-logo",dir:"ltr",style:{gap:0,cursor:"pointer"},onClick:()=>d("dashboard"),children:[o.jsx("span",{style:{fontWeight:700,color:"var(--accent)"},children:"B"}),o.jsx("span",{style:{fontWeight:400,color:"var(--text)"},children:"udgi"})]}),r==="active"&&o.jsx("button",{onClick:()=>d("settings"),className:"header-sub-badge",style:{alignItems:"center",gap:5,background:"var(--accent)",color:"#fff",border:"none",borderRadius:20,padding:"5px 14px",fontSize:14,fontWeight:700,fontFamily:"Heebo,sans-serif",cursor:"pointer",letterSpacing:.3},children:"✦ Pro"}),r==="trial"&&o.jsxs("button",{onClick:()=>d("settings"),className:"header-sub-badge",style:{alignItems:"center",gap:5,background:i<=7?"#fff1f2":"#fffbeb",color:i<=7?"var(--expense)":"#92400e",border:`1.5px solid ${i<=7?"#fca5a5":"#fcd34d"}`,borderRadius:20,padding:"5px 14px",fontSize:14,fontWeight:700,fontFamily:"Heebo,sans-serif",cursor:"pointer",whiteSpace:"nowrap"},children:[i<=7?"⚠ ":"⏳ ",h.language==="he"?`ניסיון · ${i} ימים`:`Trial · ${i}d`]})]}),o.jsxs("div",{className:"header-right",children:[o.jsxs("button",{onClick:x,title:h.language==="he"?"Switch to English":"עברית",className:"header-lang-btn",style:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--radius-pill)",padding:"6px 10px",cursor:"pointer",alignItems:"center",gap:4,fontSize:11,fontWeight:600,color:"var(--text2)",boxShadow:"var(--shadow-xs)",transition:"border-color var(--d) var(--ease)"},children:[o.jsx(Ks,{size:13}),h.language==="he"?"EN":"עב"]}),o.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[o.jsx("select",{className:"month-selector","data-tour":"month-nav",value:U,onChange:re,children:D.map(f=>o.jsx("option",{value:`${f.year}-${f.month}`,children:f.label},`${f.year}-${f.month}`))}),u!==1&&(()=>{const{start:f,end:P}=Pe(t,n,u),g=O=>{const[,te,fe]=O.split("-");return`${parseInt(fe)}/${parseInt(te)}`};return o.jsxs("span",{style:{fontSize:10,color:"var(--text3)",letterSpacing:.2,direction:"ltr"},children:[g(f)," – ",g(P)]})})()]}),o.jsxs("div",{ref:Y,style:{position:"relative"},children:[o.jsx("button",{className:"avatar",onClick:()=>m(f=>!f),children:((ce=e==null?void 0:e.displayName)==null?void 0:ce.charAt(0))||"?"}),v&&o.jsxs("div",{style:{position:"absolute",top:40,insetInlineEnd:0,background:"var(--surface)",border:"0.5px solid var(--border)",borderRadius:"var(--radius)",minWidth:180,zIndex:300,overflow:"hidden"},children:[o.jsxs("div",{style:{padding:"12px 14px",borderBottom:"1px solid var(--border)"},children:[o.jsx("div",{style:{fontSize:13,fontWeight:700},children:e==null?void 0:e.displayName}),o.jsx("div",{style:{fontSize:11,color:"var(--text3)",marginTop:2},children:e==null?void 0:e.email})]}),o.jsxs("button",{onClick:Z,style:{width:"100%",padding:"11px 14px",background:"none",border:"none",borderBottom:"0.5px solid var(--border)",color:"var(--text2)",fontSize:13,fontWeight:500,cursor:"pointer",textAlign:"right",fontFamily:"DM Sans,Heebo,sans-serif",display:"flex",alignItems:"center",gap:8},children:[o.jsx(ar,{size:14})," ",p==="he"?"עדכון פרטים":"Edit profile"]}),o.jsxs("button",{onClick:J,style:{width:"100%",padding:"11px 14px",background:"none",border:"none",borderBottom:"0.5px solid var(--border)",color:"var(--text2)",fontSize:13,fontWeight:500,cursor:"pointer",textAlign:"right",fontFamily:"DM Sans,Heebo,sans-serif",display:"flex",alignItems:"center",gap:8},children:[o.jsx(Xs,{size:14})," ",c("header.switchUser")]}),o.jsxs("button",{onClick:()=>{m(!1),We(W)},style:{width:"100%",padding:"11px 14px",background:"none",border:"none",color:"var(--expense)",fontSize:13,fontWeight:500,cursor:"pointer",textAlign:"right",fontFamily:"DM Sans,Heebo,sans-serif",display:"flex",alignItems:"center",gap:8},children:[o.jsx(Ys,{size:14})," ",c("header.signOut")]})]})]})]})]}),y&&o.jsx("div",{className:"modal-overlay open",style:{alignItems:"center",padding:16},onClick:f=>f.target===f.currentTarget&&N(!1),children:o.jsxs("div",{className:"modal",style:{borderRadius:12,maxWidth:400,width:"100%"},children:[o.jsxs("div",{className:"modal-title",children:[p==="he"?"עדכון פרטים":"Edit profile",o.jsx("button",{className:"modal-close",onClick:()=>N(!1),children:"✕"})]}),o.jsxs("div",{className:"modal-body",style:{display:"flex",flexDirection:"column",gap:14,paddingTop:16},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,marginBottom:4},children:[o.jsx("div",{style:{width:48,height:48,borderRadius:"50%",background:"var(--accent)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:700,color:"#fff",flexShrink:0},children:((e==null?void 0:e.displayName)||"?").charAt(0).toUpperCase()}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:14,fontWeight:600},children:e==null?void 0:e.displayName}),o.jsx("div",{style:{fontSize:12,color:"var(--text3)"},children:e==null?void 0:e.email})]})]}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:12,color:"var(--text3)",marginBottom:4},children:p==="he"?"שם תצוגה":"Display name"}),o.jsx("input",{className:"form-input",value:E,onChange:f=>T(f.target.value)})]}),z?o.jsx("div",{style:{fontSize:12,color:"var(--text3)",background:"var(--surface2)",borderRadius:8,padding:"10px 12px"},children:p==="he"?"🔒 חשבון Google — המייל מנוהל דרך Google":"🔒 Google account — email managed by Google"}):o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:12,color:"var(--text3)",marginBottom:4},children:p==="he"?"מייל לשחזור חשבון":"Recovery email"}),o.jsx("input",{className:"form-input",type:"email",value:I,onChange:f=>$(f.target.value),placeholder:"email@example.com",inputMode:"email",autoComplete:"email"})]}),!z&&o.jsxs(o.Fragment,{children:[o.jsx("div",{style:{height:1,background:"var(--border)"}}),o.jsx("div",{style:{fontSize:13,fontWeight:600,color:"var(--text2)"},children:p==="he"?"שינוי סיסמה":"Change password"}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:12,color:"var(--text3)",marginBottom:4},children:p==="he"?"סיסמה נוכחית (נדרש לשינוי סיסמה)":"Current password (required to change password)"}),o.jsx("input",{className:"form-input",type:"password",value:j,onChange:f=>M(f.target.value),placeholder:"••••••",autoComplete:"current-password"})]}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:12,color:"var(--text3)",marginBottom:4},children:p==="he"?"סיסמה חדשה (אופציונלי)":"New password (optional)"}),o.jsx("input",{className:"form-input",type:"password",value:A,onChange:f=>L(f.target.value),placeholder:"••••••",autoComplete:"new-password"})]})]}),V&&o.jsx("div",{style:{fontSize:13,color:"var(--expense)",fontWeight:500},children:V})]}),o.jsxs("div",{className:"modal-footer",children:[o.jsx("button",{onClick:()=>N(!1),style:{flex:1,height:44,background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:"var(--radius)",fontSize:14,cursor:"pointer",fontFamily:"Heebo,sans-serif",color:"var(--text2)"},children:p==="he"?"ביטול":"Cancel"}),o.jsx("button",{onClick:w,disabled:_,style:{flex:2,height:44,background:"var(--accent)",border:"none",borderRadius:"var(--radius)",fontSize:15,fontWeight:700,fontFamily:"Heebo,sans-serif",color:"#fff",cursor:_?"wait":"pointer",opacity:_?.7:1},children:_?p==="he"?"שומר...":"Saving...":p==="he"?"שמור שינויים":"Save changes"})]})]})}),F&&o.jsx("div",{style:{position:"fixed",inset:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,pointerEvents:"none"},children:o.jsxs("div",{style:{background:"var(--accent)",color:"#fff",borderRadius:14,padding:"16px 28px",fontSize:16,fontFamily:"Heebo,sans-serif",fontWeight:700,boxShadow:"0 8px 32px rgba(0,0,0,0.18)",display:"flex",alignItems:"center",gap:10,animation:"fadeInScale .2s ease"},children:[o.jsx("span",{style:{fontSize:20},children:"✓"}),p==="he"?"הפרטים עודכנו בהצלחה":"Details updated successfully"]})})]})}function wr({activePage:e,onNavigate:t,isPremium:n,subStatus:a}){const{t:s}=H(),r=[{id:"dashboard",Icon:un,label:s("nav.dashboard")},{id:"entries",Icon:hn,label:s("nav.entries")},{id:"insights",Icon:pn,label:s("nav.insights")},{id:"bot",Icon:mn,label:"Bot"},{id:"settings",Icon:gn,label:s("nav.settings")}];return o.jsx("nav",{className:"bottom-nav","data-tour":"nav",children:r.map(({id:i,Icon:d,label:u})=>o.jsxs("button",{className:`nav-item${e===i?" active":""}`,onClick:()=>t(i),children:[o.jsxs("span",{style:{position:"relative",display:"inline-flex"},children:[o.jsx(d,{size:20,strokeWidth:1.8}),i==="settings"&&!n&&a!=="active"&&o.jsx(Us,{size:10,strokeWidth:2,color:"#f59e0b",style:{position:"absolute",top:-4,right:-6}})]}),o.jsx("span",{className:"nav-label",children:u})]},i))})}const Sr=["income","other"],kr=["savings","other"],Ue=()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`};function jr(e,t){const[n,a]=e.split("-").map(Number),s=n*12+(a-1)+(t-1);return`${Math.floor(s/12)}-${String(s%12+1).padStart(2,"0")}`}function Cr(e){return e==="income"?"income":e==="saving"?"savings":"housing"}function Nr(e,t){return t==="income"?e.filter(n=>Sr.includes(n.value)||!He.includes(n.value)):t==="saving"?e.filter(n=>kr.includes(n.value)||!He.includes(n.value)):e.filter(n=>!["income","savings"].includes(n.value))}function Er({open:e,onClose:t,householdId:n,user:a,entry:s,allCategories:r=[],customCategories:i=[],accounts:d=[],onDelete:u}){const{t:c}=H(),h=!!s,[p,x]=l.useState("expense"),[v,m]=l.useState(""),[y,N]=l.useState(""),[E,T]=l.useState("housing"),[I,$]=l.useState(Ue()),[j,M]=l.useState("variable"),[A,L]=l.useState(""),[_,B]=l.useState(""),[V,C]=l.useState(""),[F,Q]=l.useState(!1),[z,Z]=l.useState(!1),[w,q]=l.useState(""),[D,Y]=l.useState(""),U=[{value:"fixed",label:c("addEntry.fixedDesc")},{value:"bimonthly",label:c("addEntry.bimonthlyDesc"),expenseOnly:!0},{value:"variable",label:c("addEntry.variableDesc")},{value:"sep",label:c("addEntry.sepDesc"),expenseOnly:!0}].filter(g=>!g.expenseOnly||p==="expense"),J={expense:c("addEntry.namePlaceholderExpense"),income:c("addEntry.namePlaceholderIncome"),saving:c("addEntry.namePlaceholderSaving")};l.useEffect(()=>{var g,O;s?(x(s.type||"expense"),m(s.name||""),N(((g=s.amount)==null?void 0:g.toString())||""),T(s.category||"housing"),$(s.date||Ue()),M(s.fixed||"variable"),L(s.note||""),B(s.accountId||""),C(((O=s.recurringMonths)==null?void 0:O.toString())||"")):ie()},[s,e]);function re(g){x(g),T(Cr(g))}async function ee(){if(!w.trim())return;const g="custom_"+w.trim().replace(/\s+/g,"_")+"_"+Date.now(),O={value:g,label:w.trim(),icon:D.trim()||"🏷️"};await fs(n,[...i,O]),T(g),q(""),Y(""),Z(!1)}function ie(){m(""),N(""),L(""),x("expense"),$(Ue()),T("housing"),M("variable"),B(""),C("")}const ce=Nr(r,p);async function f(){if(!v.trim()||!y||!I){alert(c("addEntry.errorRequired"));return}if(parseFloat(y)<=0){alert(c("addEntry.errorZero"));return}Q(!0);try{const g=V?parseInt(V):null,O={name:v.trim(),amount:parseFloat(y),category:E,date:I,fixed:j,type:p,note:A.trim(),accountId:_||null,recurringMonths:g,recurringUntil:g&&g>1?jr(I,g):null};h?await bs(n,s.id,O):await ys(n,O,a),P()}catch(g){alert(c("addEntry.errorSave")+g.message)}finally{Q(!1)}}function P(){ie(),t()}return o.jsx("div",{className:`modal-overlay${e?" open":""}`,onClick:g=>g.target===g.currentTarget&&P(),children:o.jsxs("div",{className:"modal",children:[o.jsxs("div",{className:"modal-title",children:[c(h?"addEntry.editTitle":"addEntry.title"),o.jsx("button",{className:"modal-close",onClick:P,children:"✕"})]}),o.jsxs("div",{className:"modal-body",children:[o.jsx("div",{className:"form-group",children:o.jsx("div",{className:"type-toggle",children:["expense","income","saving"].map(g=>o.jsx("button",{className:`type-btn${p===g?` active ${g}`:""}`,onClick:()=>re(g),children:c(g==="expense"?"addEntry.expense":g==="income"?"addEntry.income":"addEntry.saving")},g))})}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:c("addEntry.name")}),o.jsx("input",{className:"form-input",placeholder:J[p],value:v,onChange:g=>m(g.target.value)})]}),o.jsxs("div",{style:{display:"flex",gap:8},children:[o.jsxs("div",{className:"form-group",style:{flex:1},children:[o.jsx("label",{className:"form-label",children:c("addEntry.amount")}),o.jsx("input",{className:"form-input",type:"number",inputMode:"decimal",placeholder:"0",value:y,onChange:g=>N(g.target.value),style:{fontFamily:"DM Mono,monospace"}})]}),o.jsxs("div",{className:"form-group",style:{flex:1},children:[o.jsx("label",{className:"form-label",children:c("addEntry.date")}),o.jsx("input",{className:"form-input",type:"date",value:I,onChange:g=>$(g.target.value)})]})]}),o.jsxs("div",{style:{display:"flex",gap:8},children:[o.jsxs("div",{className:"form-group",style:{flex:1.6},children:[o.jsx("label",{className:"form-label",children:c("addEntry.category")}),o.jsx("select",{className:"form-input",value:E,onChange:g=>T(g.target.value),children:ce.map(g=>o.jsxs("option",{value:g.value,children:[g.icon," ",g.label]},g.value))})]}),o.jsxs("div",{className:"form-group",style:{flex:1},children:[o.jsx("label",{className:"form-label",children:c("addEntry.character")}),o.jsx("select",{className:"form-input",value:j,onChange:g=>M(g.target.value),children:U.map(g=>o.jsx("option",{value:g.value,children:g.label},g.value))}),(j==="fixed"||j==="bimonthly")&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{style:{fontSize:10,color:"var(--accent)",marginTop:4,lineHeight:1.4},children:["✦ ",c("addEntry.recurringHint")]}),o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5,marginTop:5},children:[o.jsx("span",{style:{fontSize:10,color:"var(--text2)",whiteSpace:"nowrap"},children:c("addEntry.paymentsLabel")}),o.jsx("input",{type:"number",min:"1",max:"36",className:"form-input",style:{width:52,padding:"4px 6px",fontSize:12,textAlign:"center",fontFamily:"DM Mono,monospace"},placeholder:"∞",value:V,onChange:g=>C(g.target.value)})]})]})]})]}),z?o.jsxs("div",{style:{display:"flex",gap:6,marginTop:-4,marginBottom:10},children:[o.jsx("input",{className:"form-input",placeholder:"😀",value:D,onChange:g=>Y(g.target.value),style:{width:46,textAlign:"center",fontSize:18,padding:"8px 4px"},maxLength:2}),o.jsx("input",{className:"form-input",placeholder:c("addEntry.categoryNamePlaceholder"),value:w,onChange:g=>q(g.target.value),onKeyDown:g=>g.key==="Enter"&&ee(),style:{flex:1},autoFocus:!0}),o.jsx("button",{type:"button",onClick:ee,style:{background:"var(--accent)",border:"none",color:"#fff",borderRadius:8,padding:"0 12px",cursor:"pointer",fontSize:13},children:"✓"}),o.jsx("button",{type:"button",onClick:()=>Z(!1),style:{background:"var(--surface3)",border:"none",color:"var(--text2)",borderRadius:8,padding:"0 10px",cursor:"pointer",fontSize:13},children:"✕"})]}):o.jsx("button",{type:"button",onClick:()=>Z(!0),style:{marginTop:-4,marginBottom:10,background:"none",border:"none",color:"var(--accent)",fontSize:12,cursor:"pointer",padding:0,display:"block"},children:c("addEntry.addNewCategory")}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:c("addEntry.note")}),o.jsx("input",{className:"form-input",placeholder:c("addEntry.notePlaceholder"),value:A,onChange:g=>L(g.target.value)})]}),d.length>0&&o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:c("accounts.nav")}),o.jsxs("select",{className:"form-input",value:_,onChange:g=>B(g.target.value),children:[o.jsx("option",{value:"",children:c("accounts.noAccount")}),d.map(g=>o.jsx("option",{value:g.id,children:g.name},g.id))]})]})]}),o.jsxs("div",{className:"modal-footer",children:[h&&u&&o.jsx("button",{onClick:()=>{P(),u(s.id)},style:{flex:"0 0 auto",padding:"0 20px",height:44,background:"var(--expense)",color:"#fff",border:"none",borderRadius:"var(--radius)",fontSize:14,fontWeight:600,fontFamily:"DM Sans,Heebo,sans-serif",cursor:"pointer"},children:c("addEntry.delete")}),o.jsx("button",{onClick:f,disabled:F,style:{flex:1,height:44,background:F?"var(--surface3)":"var(--accent)",color:F?"var(--text3)":"#fff",border:"none",borderRadius:"var(--radius)",fontSize:15,fontWeight:600,fontFamily:"DM Sans,Heebo,sans-serif",cursor:F?"wait":"pointer",opacity:F?.6:1},children:c(F?"addEntry.saving2":h?"addEntry.saveChanges":"addEntry.addNew")})]})]})})}function Ir({open:e,message:t,onConfirm:n,onCancel:a}){const{t:s}=H();return e?o.jsx("div",{onClick:a,style:{position:"fixed",inset:0,zIndex:400,background:"rgba(28,25,23,0.55)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"0 16px"},children:o.jsxs("div",{onClick:r=>r.stopPropagation(),style:{background:"var(--surface)",borderRadius:16,padding:"28px 24px 24px",width:"100%",maxWidth:360,boxShadow:"0 20px 50px rgba(0,0,0,0.2)",textAlign:"center"},children:[o.jsx("p",{style:{fontSize:16,fontWeight:600,color:"var(--text)",marginBottom:6},children:s("misc.confirmDelete")}),o.jsx("p",{style:{fontSize:13,color:"var(--text3)",marginBottom:24},children:t}),o.jsxs("div",{style:{display:"flex",gap:10},children:[o.jsx("button",{onClick:a,style:{flex:1,padding:"12px 0",borderRadius:10,border:"1px solid var(--border)",background:"var(--surface)",color:"var(--text2)",fontSize:15,fontFamily:"DM Sans,Heebo,sans-serif",cursor:"pointer",fontWeight:500},children:s("misc.no")}),o.jsx("button",{onClick:n,style:{flex:1,padding:"12px 0",borderRadius:10,border:"none",background:"var(--expense)",color:"#fff",fontSize:15,fontFamily:"DM Sans,Heebo,sans-serif",cursor:"pointer",fontWeight:600},children:s("misc.yes")})]})]})}):null}const Ar=l.lazy(()=>se(()=>import("./Dashboard-B8fjWCoj.js"),__vite__mapDeps([0,1,2,3,4,5,6]))),Tr=l.lazy(()=>se(()=>import("./Entries-CBn8fikh.js"),__vite__mapDeps([7,2,3,1,4,5,6]))),Dr=l.lazy(()=>se(()=>import("./Breakeven-Dtw0HzTc.js"),__vite__mapDeps([8,1,3,9,5,6]))),Pr=l.lazy(()=>se(()=>import("./Insights-KSKMA1Ft.js"),__vite__mapDeps([10,3,9,1,5,6]))),Mr=l.lazy(()=>se(()=>import("./Settings-DJzm_n6p.js"),__vite__mapDeps([11,1,5,6]))),_r=l.lazy(()=>se(()=>import("./ImportCSV-Brjup08H.js"),__vite__mapDeps([12,1,9,5,6]))),Lr=l.lazy(()=>se(()=>import("./Accounts-CmkrgbCr.js"),__vite__mapDeps([13,1,9,4,5,6]))),Or=l.lazy(()=>se(()=>import("./BudgiBot-BH_gnnG_.js"),__vite__mapDeps([14,1,6,5])));function Rr(){const{t:e,i18n:t}=H(),{user:n,householdId:a,setHouseholdId:s,loading:r}=xs(),i=ws(a),{budgets:d,savingsGoal:u,customCategories:c,memberUids:h,currency:p,cycleStartDay:x}=Ss(a),v=ks(a),{isPremium:m,status:y,trialDaysLeft:N,subscription:E}=Ts(n),T=m||localStorage.getItem("budgi-beta")==="1",I=Ds(e),$=[...I,...c.filter(k=>!I.some(ye=>ye.value===k.value))],[j,M]=l.useState("dashboard"),[A,L]=l.useState(!1),[_,B]=l.useState(null),[V,C]=l.useState(null),[F,Q]=l.useState(new Date().getMonth()),[z,Z]=l.useState(new Date().getFullYear()),[w,q]=l.useState(!1),[D,Y]=l.useState(!1),[U,J]=l.useState(!1),[re,ee]=l.useState(()=>localStorage.getItem("budgi-currency")||"ILS"),[ie,ce]=l.useState(()=>localStorage.getItem("budgi-tour-done")==="1"),[f,P]=l.useState(()=>parseInt(localStorage.getItem("budgi-cycle-day")||"1")),[g,O]=l.useState(!1);l.useEffect(()=>{Bn(W).catch(k=>console.error("Redirect error:",k))},[]),l.useEffect(()=>{p&&(ee(p),localStorage.setItem("budgi-currency",p),localStorage.setItem("budgi-currency-chosen","1"))},[p]),l.useEffect(()=>{const k=localStorage.getItem("budgi-currency-chosen")==="1";a&&!k&&!U&&!D&&J(!0)},[a,U,D]),l.useEffect(()=>{x&&(P(x),localStorage.setItem("budgi-cycle-day",x))},[x]),l.useEffect(()=>{const k=localStorage.getItem("budgi-cycle-chosen")==="1";a&&!k&&!g&&!U&&!D&&O(!0)},[a,g,U,D]);async function te(k){ee(k),localStorage.setItem("budgi-currency",k),localStorage.setItem("budgi-currency-chosen","1"),a&&await yt(a,k),J(!1)}async function fe(k){P(k),localStorage.setItem("budgi-cycle-day",k),localStorage.setItem("budgi-cycle-chosen","1"),a&&await hs(a,k),O(!1)}l.useEffect(()=>{const k=t.language==="he"?"rtl":"ltr";document.documentElement.setAttribute("lang",t.language),document.body.setAttribute("dir",k)},[t.language]);async function me(){try{await vs(a,V)}catch(k){alert(e("misc.errorDelete")+k.message)}finally{C(null)}}if(As(i,F,z,a,n,T,f),r)return o.jsx(Ct,{fullscreen:!0});if(!n)return o.jsx(dr,{onNewUser:()=>{q(!0),Y(!0)}});if(D)return o.jsx(hr,{onContinue:()=>{Y(!1),a||J(!0)}});if(U&&!a)return o.jsx(wt,{onSelect:k=>{ee(k),localStorage.setItem("budgi-currency",k),localStorage.setItem("budgi-currency-chosen","1"),J(!1)}});if(!a)return o.jsx(ur,{user:n,onComplete:k=>{s(k),re!=="ILS"&&yt(k,re)}});if(U)return o.jsx(wt,{onSelect:te});if(g)return o.jsx(pr,{onSelect:fe});function yn(){localStorage.removeItem("budgi-tour-done"),localStorage.removeItem("budgi-currency-chosen"),localStorage.removeItem("budgi-cycle-chosen"),ce(!1),Y(!0),J(!1),M("dashboard")}const le={entries:i,currentMonth:F,currentYear:z,householdId:a,user:n,memberUids:h,allCategories:$,customCategories:c,budgets:d,savingsGoal:u,accounts:v,isPremium:T,subStatus:y,trialDaysLeft:N,subscription:E,currency:re,cycleStartDay:f,onEdit:B,onDelete:C,onNavigate:M,onJoinHousehold:s,onResetOnboarding:yn},bn=[{key:"dashboard",Icon:un,label:e("nav.dashboard")},{key:"entries",Icon:hn,label:e("nav.entries")},{key:"breakeven",Icon:er,label:e("nav.breakeven")},{key:"insights",Icon:pn,label:e("nav.insights")},{key:"bot",Icon:mn,label:"Budgi Bot"},{key:"accounts",Icon:zs,label:e("accounts.nav")},{key:"settings",Icon:gn,label:e("nav.settings")}];return o.jsxs(o.Fragment,{children:[o.jsxs("nav",{className:"desktop-sidebar",children:[o.jsx("div",{className:"desktop-sidebar-title",dir:"ltr",children:o.jsxs("span",{children:[o.jsx("span",{style:{fontWeight:700,color:"var(--accent)"},children:"B"}),"udgi"]})}),bn.map(({key:k,Icon:ye,label:vn})=>o.jsxs("button",{className:`desktop-sidebar-item${j===k?" active":""}`,onClick:()=>M(k),style:{background:"none",border:"none",fontFamily:"DM Sans,Heebo,sans-serif",width:"100%",textAlign:"right"},children:[o.jsx(ye,{size:16,strokeWidth:1.8})," ",vn]},k)),o.jsx("div",{style:{marginTop:"auto",paddingTop:16,borderTop:"0.5px solid var(--border)",fontSize:13,color:"var(--text3)"},children:n==null?void 0:n.displayName})]}),o.jsxs("div",{className:"app-shell",children:[o.jsx(xr,{user:n,currentMonth:F,currentYear:z,onMonthChange:(k,ye)=>{Q(k),Z(ye)},isPremium:T,subStatus:y,trialDaysLeft:N,onNavigate:M,cycleStartDay:f}),o.jsxs(l.Suspense,{fallback:o.jsx(Ct,{}),children:[j==="dashboard"&&o.jsx(Ar,{...le}),j==="entries"&&o.jsx(Tr,{...le}),j==="breakeven"&&o.jsx(Dr,{...le}),j==="insights"&&o.jsx(Pr,{...le}),j==="bot"&&o.jsx(Or,{user:n}),j==="import"&&o.jsx(_r,{...le}),j==="accounts"&&o.jsx(Lr,{...le}),j==="settings"&&o.jsx(Mr,{...le})]}),o.jsx(wr,{activePage:j,onNavigate:M,isPremium:T,subStatus:y})]}),o.jsx(vr,{}),!(A||_||V)&&["dashboard","entries"].includes(j)&&pe.createPortal(o.jsx("button",{className:"fab","data-tour":"fab",onClick:()=>L(!0),children:e("dashboard.addEntry")}),document.body),!ie&&a&&j==="dashboard"&&o.jsx(yr,{onDone:()=>ce(!0)}),pe.createPortal(o.jsxs(o.Fragment,{children:[o.jsx(Er,{open:A||!!_,onClose:()=>{L(!1),B(null)},householdId:a,user:n,entry:_,allCategories:$,customCategories:c,accounts:v,onDelete:k=>{B(null),L(!1),C(k)}}),o.jsx(Ir,{open:!!V,message:e("misc.confirmDelete"),onConfirm:me,onCancel:()=>C(null)})]}),document.body)]})}Lt(document.getElementById("root")).render(o.jsx(l.StrictMode,{children:o.jsx(Rr,{})}));export{Us as C,Ct as L,mn as M,pn as T,ti as a,ys as b,G as c,Pe as d,Ur as e,ei as f,ln as g,Vr as h,qr as i,o as j,Gr as k,ps as l,Wr as m,Kr as n,fs as o,Yr as p,Jr as q,zs as r,hs as s,Zr as t,bs as u,Xr as v,Qr as w,b as x,zr as y,Hr as z};
