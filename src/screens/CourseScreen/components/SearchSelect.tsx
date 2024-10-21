import { useMemo, useState } from 'react'
import { Select, SelectProps, Spin } from 'antd'
import debounce from 'lodash/debounce'
import { useGetStudents } from '@api/api-hooks/student'

export interface DebounceSelectProps<ValueType>
  extends Omit<SelectProps<ValueType>, 'options' | 'children'> {
  debounceTimeout?: number
}

export interface SearchValue {
  label: string
  value: number
}

export function DebounceSelect<
  ValueType extends {
    key?: string
    label: string
    value: number
  },
>({ debounceTimeout = 800, ...props }: DebounceSelectProps<ValueType>) {
  const [searchText, setSearchText] = useState('')
  const [options, setOptions] = useState<ValueType[]>([])

  const debouncedSearch = useMemo(
    () => debounce((value: string) => setSearchText(value), debounceTimeout),
    [debounceTimeout],
  )

  const { data: students, isLoading } = useGetStudents(
    {
      content: searchText,
    },
    !!searchText,
  )

  useMemo(() => {
    if (students) {
      const newOptions = students.data.map(
        (student) =>
          ({
            label: student.name,
            value: student.id,
          }) as ValueType,
      )
      setOptions(newOptions)
    }
  }, [students])

  return (
    <Select
      filterOption={false}
      showSearch
      onSearch={debouncedSearch}
      notFoundContent={isLoading ? <Spin size="small" /> : null}
      {...props}
    >
      {options &&
        options.map((option) => (
          <Select.Option value={option.value} key={option.value}>
            {option.label}
          </Select.Option>
        ))}
    </Select>
  )
}
