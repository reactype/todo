import { FaRegCheckCircle } from 'react-icons/fa'
import styled from 'styled-components'

type Props = {
  hidden?: boolean,
  checked?: boolean,
  toggle?: (e?: unknown) => unknown,
}

const StyledIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 64px;
  font-size: 28px;
  padding-bottom: 4px;
`

function IconCheck ({ hidden, checked, toggle = () => {} }: Props) {
  return <StyledIcon>
    <FaRegCheckCircle
      visibility={hidden ? 'hidden' : 'visible'}
      color={checked ? 'black' : 'lightgrey'}
      cursor="pointer"
      onClick={toggle}
    />
  </StyledIcon>
}

export default IconCheck
