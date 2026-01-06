import { Metadata } from "next"
import PagesList from "@/modules/admin/pages/list"

export const metadata: Metadata = {
  title: "Pages | Archviz Ltd",
  description: "List of all pages",
}

export default function CategoriesListPage() {
  return <PagesList />
}
