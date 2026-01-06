import { Metadata } from "next"
import PagesAddEdit from "@/modules/admin/pages/add_edit"

export const metadata: Metadata = {
  title: "Update Page | Archviz Ltd",
  description: "Update Page",
}

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function EditPages({ params }: Props) {
  const { id } = await params;

  return (
    <div>
      <PagesAddEdit id={id} />
    </div>
  )
}
