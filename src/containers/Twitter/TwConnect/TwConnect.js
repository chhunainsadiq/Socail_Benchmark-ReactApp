import React from 'react'
import Button from '../../../components/Button'
import { Container, InnerContainer } from '../../../config/commonStyles'

const TwConnect = () => {
  return (
    <Container>
      <InnerContainer sm={{ span: 3, offset: 4 }}>
        <Button type='submit'>Twitter connect</Button>
      </InnerContainer>
    </Container>
  )
}

export default TwConnect
