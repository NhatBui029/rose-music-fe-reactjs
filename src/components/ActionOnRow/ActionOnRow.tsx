import { Tag } from 'antd'

type ActionOnRowProps = {
  id: number
  onOpenModal: (id: number) => void
}

const ActionOnRow = ({ id, onOpenModal }: ActionOnRowProps) => {
  return (
    <div>
      <Tag
        color="warning"
        onClick={() => onOpenModal(id)}
        style={{ cursor: 'pointer' }}
      >
        Sửa
      </Tag>
      <Tag color="error" style={{ cursor: 'pointer' }}>
        Xóa
      </Tag>
    </div>
  )
}

export default ActionOnRow
