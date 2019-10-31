import React from 'react'
import Button from '../../../components/Button'
import { Container, InnerContainer } from '../../../config/commonStyles'

const FbConnect = () => {
  return (
    <Container>
      <InnerContainer sm={{ span: 3, offset: 4 }}>
        <Button type='submit'>Facebook connect</Button>
      </InnerContainer>
    </Container>
  )
}

export default FbConnect
