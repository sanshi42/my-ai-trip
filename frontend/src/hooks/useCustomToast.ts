import { toast } from "sonner"

import { useLocale } from "@/components/locale-provider"

const useCustomToast = () => {
  const { t } = useLocale()

  const showSuccessToast = (description: string) => {
    toast.success(t("common.success"), {
      description,
    })
  }

  const showErrorToast = (description: string) => {
    toast.error(t("common.error"), {
      description,
    })
  }

  return { showSuccessToast, showErrorToast }
}

export default useCustomToast
