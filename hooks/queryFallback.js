const responseData = (response) => response?.data?.data ?? response?.data

export const responseArray = (value, keys) => {
  if (Array.isArray(value)) return value
  for (const key of keys) {
    if (Array.isArray(value?.[key])) return value[key]
  }
  return null
}

export const fetchArrayWithMockFallback = async ({
  label,
  fetcher,
  fallback,
  keys,
}) => {
  try {
    const data = responseArray(responseData(await fetcher()), keys)
    if (data?.length) return data
    console.info(`[demo data] ${label} returned no items; showing sample content.`)
  } catch (error) {
    console.warn(
      `[demo data] ${label} could not be loaded; showing sample content.`,
      error?.message || error,
    )
  }

  return fallback()
}

export const fetchValueWithMockFallback = async ({ label, fetcher, fallback }) => {
  try {
    const value = responseData(await fetcher())
    if (value) return value
    console.info(`[demo data] ${label} was empty; showing sample content.`)
  } catch (error) {
    console.warn(
      `[demo data] ${label} could not be loaded; showing sample content.`,
      error?.message || error,
    )
  }

  return fallback()
}
