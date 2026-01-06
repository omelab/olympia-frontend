"use client"

import { Settings } from "@/api/lib/definitions"
import { useDeleteSystemSettingsMutation } from "@/api/settings"
import { message, Popconfirm, Tooltip } from "antd"
import { FaPenToSquare } from "react-icons/fa6"
import { FiTrash2 } from "react-icons/fi"

interface SettingsActionProps {
  record: Settings
  handleEdit: any
}

const SettingsAction = ({ record, handleEdit }: SettingsActionProps) => {
  const [deleteItem] = useDeleteSystemSettingsMutation()

  const deleteConfirm = async (id: any) => {
    try {
      const payload = await deleteItem({
        id: id,
      }).unwrap()

      if (payload.id) {
        message.success("Item permanently deleted successfully!")
      }
    } catch (error) {
      if (typeof error === "object" && "message" in error!) {
        message.error("Somthing went wrong")
      }
    }
  }

  return (
    <div className="">
      <div className="flex items-center justify-end gap-3">
        <Tooltip placement="bottom" title={"Permanent Edit"}>
          <button
            type="button"
            className="hover:text-secondary"
            onClick={() => handleEdit(record)}
          >
            <FaPenToSquare className="text-base" />
          </button>
        </Tooltip>
        <Tooltip placement="bottom" title={"Permanent Delete"}>
          <Popconfirm
            placement="topRight"
            title={
              <div className="font-semibold">
                Are you sure you want to delete this item Permanently? <br />
                <div className="font-normal">
                  Deleted item can&apos;t be recovered!
                </div>
              </div>
            }
            onConfirm={() => deleteConfirm(record?.id)}
            okText="Yes"
            cancelText="No"
          >
            <button type="button" className="hover:text-secondary">
              <FiTrash2 className="text-base" />
            </button>
          </Popconfirm>
        </Tooltip>
      </div>
    </div>
  )
}

export default SettingsAction
