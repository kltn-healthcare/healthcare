import { useQuery } from "@tanstack/react-query"
import { getArticleCategories, getArticles, getArticleBySlug } from "../api/articles.api"
import { ARTICLE_QUERY_KEYS } from "@/shared/constants"

/**
 * Hook to retrieve all health guide article categories
 */
export function useArticleCategories() {
  return useQuery({
    queryKey: ARTICLE_QUERY_KEYS.CATEGORIES,
    queryFn: getArticleCategories,
  })
}

/**
 * Hook to retrieve articles with optional category filtering and pagination
 */
export function useArticlesList(filters: { category?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey: ARTICLE_QUERY_KEYS.LIST(filters),
    queryFn: () => getArticles(filters),
  })
}

/**
 * Hook to retrieve a single article by its unique slug
 */
export function useArticleDetail(slug: string) {
  return useQuery({
    queryKey: ARTICLE_QUERY_KEYS.BY_SLUG(slug),
    enabled: Boolean(slug),
    queryFn: () => getArticleBySlug(slug),
  })
}
