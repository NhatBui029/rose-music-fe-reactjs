import { Tag } from 'antd'

type ActionOnRowProps = {
  id: number
  onOpenModal: (id: number) => void
}

const ActionOnRow = ({ id, onOpenModal }: ActionOnRowProps) => {
  return (
    <div>
      <Tag color="warning" onClick={() => onOpenModal(id)}>
        Sửa
      </Tag>
      <Tag color="error">Xóa</Tag>
    </div>
  )
}

export default ActionOnRow
