import * as Yup from "yup"

export const systemSettingSchema = Yup.object({
  settings: Yup.array().of(
    Yup.object({
      key: Yup.string().required(),
      value: Yup.string().required(),
      type: Yup.string().required(),
    })
  ),
})
