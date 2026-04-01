import { Languages } from "lucide-react"

import { useLocale } from "@/components/locale-provider"
import { Button } from "@/components/ui/button"

export function LanguageToggle() {
  const { locale, setLocale, t } = useLocale()

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "zh-CN" : "en")
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      data-testid="language-toggle"
    >
      <Languages className="size-4" />
      <span>{locale === "en" ? "中文" : "EN"}</span>
      <span className="sr-only">{t("language.label")}</span>
    </Button>
  )
}
