export function formatHomePrice(price: number, language: string) {
  return new Intl.NumberFormat(language === "en" ? "en-US" : "vi-VN").format(price) + "đ"
}

export function formatHomeDate(value: string, language: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleDateString(language === "en" ? "en-US" : "vi-VN")
}
