import { type MouseEventHandler } from 'react'

type LoadMoreProps = {
    handler: MouseEventHandler,
    type: string,
}

function LoadMoreBtn(props: LoadMoreProps) {
  return (
    <button onClick={props.handler}>
        Load More {`${props.type}`}
    </button>
  )
}

export default LoadMoreBtn