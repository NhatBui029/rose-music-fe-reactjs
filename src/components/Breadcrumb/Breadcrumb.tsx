import { Breadcrumb as AntdBreadcrumb } from 'antd'
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import { BsArrowRight } from 'react-icons/bs'
import { UIMatch, useLocation, useMatches } from 'react-router-dom'

type HandleType = {
  breadcrumb: ItemType[]
  alternativeBreadcrumb?: ItemType[]
}

const Breadcrumb = () => {
  const location = useLocation()
  const matches = useMatches() as UIMatch<unknown, HandleType>[]
  console.log('🚀 ~ Breadcrumb ~ matches:', matches)
  const items = matches
    .filter((match) => Boolean(match.handle?.breadcrumb))
    .map(
      (match) =>
        (location.state?.useAlternative &&
          match.handle.alternativeBreadcrumb) ||
        match.handle?.breadcrumb,
    )
    .flat()

  return (
    items.length > 0 && (
      <AntdBreadcrumb
        className="text-12M mb-4"
        separator={<BsArrowRight />}
        items={items}
      />
    )
  )
}

export default Breadcrumb
