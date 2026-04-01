import { createContext, useContext, useEffect, useMemo, useState } from "react"

export type Locale = "en" | "zh-CN"

const LOCALE_STORAGE_KEY = "ai-trip-locale"

const enMessages = {
  "common.appName": "AI Trip",
  "common.none": "None",
  "common.unknownError": "Unknown error",
  "common.success": "Success",
  "common.error": "Something went wrong",
  "language.label": "Switch language",
  "language.toggle": "EN / 中文",
  "appearance.label": "Appearance",
  "appearance.toggle": "Toggle theme",
  "appearance.light": "Light",
  "appearance.dark": "Dark",
  "appearance.system": "System",
  "nav.home": "Home",
  "nav.trip": "Trip Planner",
  "footer.tagline": "Mock itinerary planning MVP",
  "home.badge": "AI Trip MVP",
  "home.heading": "Start your next itinerary",
  "home.greeting": "Welcome back, {{name}}",
  "home.subtitle":
    "Build a mock trip plan in minutes and keep the product focused on the MVP.",
  "home.primaryAction": "Plan a trip",
  "home.scopeTitle": "What this version covers",
  "home.scopeDescription":
    "Destination, days, budget and preferences are in scope. Real LLM, booking and calendar sync are intentionally not included yet.",
  "home.helperTitle": "What you can do now",
  "home.helperItem1": "Generate a mock itinerary draft",
  "home.helperItem2": "Test bilingual UI copy",
  "home.helperItem3": "Continue trimming template leftovers",
  "home.overviewTitle": "Product direction",
  "home.overviewDescription":
    "AI Trip is a lightweight trip-planning MVP built with FastAPI and React.",
  "trip.badge": "Mock planner",
  "trip.heading": "Plan a trip",
  "trip.subtitle":
    "Enter a few basics and generate a draft itinerary from the mock API.",
  "trip.destinationLabel": "Destination",
  "trip.destinationPlaceholder": "Tokyo",
  "trip.daysLabel": "Days",
  "trip.budgetLabel": "Budget",
  "trip.budgetPlaceholder": "e.g. mid-range, 5000 RMB, $1000",
  "trip.preferencesLabel": "Preferences",
  "trip.preferencesPlaceholder": "e.g. food, culture, nature",
  "trip.preferencesHelp": "Use commas to separate interests.",
  "trip.submit": "Generate itinerary",
  "trip.submitting": "Generating...",
  "trip.resultTitle": "{{destination}} itinerary",
  "trip.summaryDays": "Days",
  "trip.summaryBudget": "Budget",
  "trip.summaryPreferences": "Preferences",
  "trip.dailyPlan": "Daily plan",
  "trip.dayTitle": "Day {{day}}",
  "trip.emptyTitle": "Your itinerary will appear here",
  "trip.emptyDescription":
    "Submit the form to preview the mock trip plan response.",
  "trip.errorPrefix": "Error",
  "trip.noPreferences": "No preferences",
  "auth.emailLabel": "Email",
  "auth.fullNameLabel": "Full name",
  "auth.fullNamePlaceholder": "Traveler",
  "auth.passwordLabel": "Password",
  "auth.passwordPlaceholder": "Password",
  "auth.confirmPasswordLabel": "Confirm password",
  "auth.confirmPasswordPlaceholder": "Confirm password",
  "auth.newPasswordLabel": "New password",
  "auth.newPasswordPlaceholder": "New password",
  "auth.loginHeading": "Log in to AI Trip",
  "auth.loginSubmit": "Log In",
  "auth.forgotPassword": "Forgot your password?",
  "auth.noAccount": "Don't have an account yet?",
  "auth.signUp": "Sign up",
  "auth.signupHeading": "Create your account",
  "auth.signupSubmit": "Sign Up",
  "auth.haveAccount": "Already have an account?",
  "auth.logIn": "Log in",
  "auth.recoverHeading": "Password recovery",
  "auth.recoverSubmit": "Send reset link",
  "auth.rememberPassword": "Remember your password?",
  "auth.resetHeading": "Reset password",
  "auth.resetSubmit": "Reset password",
  "auth.recoverySent": "Password recovery email sent successfully",
  "auth.passwordUpdated": "Password updated successfully",
  "validation.passwordRequired": "Password is required",
  "validation.passwordMin": "Password must be at least 8 characters",
  "validation.passwordConfirmRequired": "Password confirmation is required",
  "validation.passwordsMismatch": "The passwords don't match",
  "validation.fullNameRequired": "Full name is required",
  "user.settings": "Settings",
  "user.logout": "Log out",
  "user.fallbackName": "Traveler",
  "settings.title": "Settings",
  "settings.subtitle": "Manage your account settings and preferences",
  "settings.tabProfile": "My profile",
  "settings.tabPassword": "Password",
  "settings.tabDanger": "Danger zone",
  "notFound.title": "Page not found",
  "notFound.description": "The page you are looking for does not exist.",
  "notFound.action": "Go home",
  "error.title": "Something went wrong",
  "error.description": "Please refresh the page or try again later.",
  "error.action": "Back to home",
} as const

type MessageKey = keyof typeof enMessages

const zhMessages: Record<MessageKey, string> = {
  "common.appName": "AI Trip",
  "common.none": "无",
  "common.unknownError": "未知错误",
  "common.success": "成功",
  "common.error": "出了一点问题",
  "language.label": "切换语言",
  "language.toggle": "EN / 中文",
  "appearance.label": "外观",
  "appearance.toggle": "切换主题",
  "appearance.light": "浅色",
  "appearance.dark": "深色",
  "appearance.system": "跟随系统",
  "nav.home": "首页",
  "nav.trip": "行程规划",
  "footer.tagline": "AI 行程规划 MVP",
  "home.badge": "AI Trip MVP",
  "home.heading": "开始规划下一次行程",
  "home.greeting": "欢迎回来，{{name}}",
  "home.subtitle": "用几分钟生成一个 mock 行程草案，让产品继续聚焦 MVP。",
  "home.primaryAction": "开始规划",
  "home.scopeTitle": "当前版本覆盖内容",
  "home.scopeDescription":
    "当前只覆盖目的地、天数、预算和偏好。真实 LLM、订票和日历同步暂时不做。",
  "home.helperTitle": "你现在可以做什么",
  "home.helperItem1": "生成一个 mock 行程草案",
  "home.helperItem2": "测试中英文界面切换",
  "home.helperItem3": "继续清理模板遗留内容",
  "home.overviewTitle": "产品方向",
  "home.overviewDescription":
    "AI Trip 是一个基于 FastAPI 和 React 的轻量行程规划 MVP。",
  "trip.badge": "Mock 规划器",
  "trip.heading": "规划一趟旅行",
  "trip.subtitle": "输入几个基础信息，调用 mock API 生成一个行程草案。",
  "trip.destinationLabel": "目的地",
  "trip.destinationPlaceholder": "东京",
  "trip.daysLabel": "天数",
  "trip.budgetLabel": "预算",
  "trip.budgetPlaceholder": "例如：中等、5000 元、1000 美元",
  "trip.preferencesLabel": "偏好",
  "trip.preferencesPlaceholder": "例如：美食，文化，自然",
  "trip.preferencesHelp": "多个偏好请用逗号分隔。",
  "trip.submit": "生成行程",
  "trip.submitting": "生成中...",
  "trip.resultTitle": "{{destination}} 行程草案",
  "trip.summaryDays": "天数",
  "trip.summaryBudget": "预算",
  "trip.summaryPreferences": "偏好",
  "trip.dailyPlan": "每日安排",
  "trip.dayTitle": "第 {{day}} 天",
  "trip.emptyTitle": "行程会显示在这里",
  "trip.emptyDescription": "提交表单后即可预览 mock 行程返回结果。",
  "trip.errorPrefix": "错误",
  "trip.noPreferences": "暂无偏好",
  "auth.emailLabel": "邮箱",
  "auth.fullNameLabel": "姓名",
  "auth.fullNamePlaceholder": "旅行者",
  "auth.passwordLabel": "密码",
  "auth.passwordPlaceholder": "请输入密码",
  "auth.confirmPasswordLabel": "确认密码",
  "auth.confirmPasswordPlaceholder": "请再次输入密码",
  "auth.newPasswordLabel": "新密码",
  "auth.newPasswordPlaceholder": "请输入新密码",
  "auth.loginHeading": "登录 AI Trip",
  "auth.loginSubmit": "登录",
  "auth.forgotPassword": "忘记密码？",
  "auth.noAccount": "还没有账号？",
  "auth.signUp": "注册",
  "auth.signupHeading": "创建账号",
  "auth.signupSubmit": "注册",
  "auth.haveAccount": "已经有账号了？",
  "auth.logIn": "去登录",
  "auth.recoverHeading": "找回密码",
  "auth.recoverSubmit": "发送重置链接",
  "auth.rememberPassword": "想起密码了？",
  "auth.resetHeading": "重置密码",
  "auth.resetSubmit": "重置密码",
  "auth.recoverySent": "找回密码邮件已发送",
  "auth.passwordUpdated": "密码已更新",
  "validation.passwordRequired": "请输入密码",
  "validation.passwordMin": "密码至少需要 8 个字符",
  "validation.passwordConfirmRequired": "请输入确认密码",
  "validation.passwordsMismatch": "两次输入的密码不一致",
  "validation.fullNameRequired": "请输入姓名",
  "user.settings": "设置",
  "user.logout": "退出登录",
  "user.fallbackName": "旅行者",
  "settings.title": "设置",
  "settings.subtitle": "管理你的账号信息和偏好设置",
  "settings.tabProfile": "个人资料",
  "settings.tabPassword": "密码",
  "settings.tabDanger": "危险操作",
  "notFound.title": "页面不存在",
  "notFound.description": "你访问的页面不存在或已经被移动。",
  "notFound.action": "返回首页",
  "error.title": "页面出错了",
  "error.description": "请刷新页面后重试，或稍后再试。",
  "error.action": "回到首页",
}

const messages = {
  en: enMessages,
  "zh-CN": zhMessages,
}

type TranslateParams = Record<string, string | number>

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: MessageKey, params?: TranslateParams) => string
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined)

function resolveInitialLocale(): Locale {
  const storedLocale = localStorage.getItem(LOCALE_STORAGE_KEY)
  if (storedLocale === "en" || storedLocale === "zh-CN") {
    return storedLocale
  }

  return "en"
}

function interpolate(template: string, params?: TranslateParams): string {
  if (!params) {
    return template
  }

  return Object.entries(params).reduce(
    (result, [key, value]) => result.split(`{{${key}}}`).join(String(value)),
    template,
  )
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => resolveInitialLocale())

  useEffect(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key, params) => interpolate(messages[locale][key], params),
    }),
    [locale],
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider")
  }

  return context
}
