/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutableRefObject } from 'react'

import { Rule, RuleRender } from 'antd/es/form'
import { Schema } from 'yup'

const useYupValidation = (
  schema: Schema<any>,
  removeMethodRef?: MutableRefObject<(() => void) | null>,
): Rule => {
  const yupSchemaRule: RuleRender = (form) => ({
    validator: async ({ fullField }: any) => {
      if (removeMethodRef?.current) {
        return Promise.resolve()
      }
      return schema.validateSyncAt(fullField, form.getFieldsValue())
    },
  })

  return yupSchemaRule
}

export default useYupValidation
