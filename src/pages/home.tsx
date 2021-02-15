/** @jsx jsx */
import { css, jsx } from '@emotion/react'

const color = css`color: red;`

const Home = () => {
  return (
    <div>
      This is home ddd
      <div css={color }>
        test
      </div>
    </div>
  )
}

export default Home