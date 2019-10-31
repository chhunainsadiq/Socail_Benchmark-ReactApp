import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { fetchMediaDetail } from '../../../actions/DataActions'
import { Container } from '../../../config/commonStyles'
import {
  TableHeadContainer,
  TableHeading,
  Table,
  MediaDetailsDiv,
  InstagramFullImg,
  TableRow,
  TableData,
  TBody,
  Anchor,
  MediaContainer,
  MediaDetailContainer
} from '../styled'
import { tokenSelector, selectedMediaSelector } from '../../../selectors/index'
import { extractData } from './helper'

const PageResults = ({
  match: {
    params: { mediaId }
  },
  fetchMediaDetail
}) => {
  // redux store selectors
  const state = useSelector(state => state)
  const accessToken = tokenSelector(state)
  const media = selectedMediaSelector(state)
  // local scope variables
  let mediaInsights = media ? media.media_insights[0] : null
  useEffect(
    () => {
      if (!media) {
        fetchMediaDetail(accessToken, mediaId)
      }
    },
    [media] // eslint-disable-line
  )
  const renderTableRows = mediaList => {
    return mediaList.map(item => {
      return (
        <TableRow key={item.key}>
          <TableData>{item.label}</TableData>
          <TableData>{item.data}</TableData>
        </TableRow>
      )
    })
  }
  return (
    <Container>
      <MediaDetailsDiv sm={{ span: 10, offset: 1 }}>
        <TableHeadContainer>
          <TableHeading>Media Details</TableHeading>
        </TableHeadContainer>
        <MediaContainer>
          <InstagramFullImg
            src={media ? media.media_url : ''}
            thumbnail
            rounded
          />
        </MediaContainer>
        <MediaDetailContainer>
          {!media || (
            <Table>
              <TBody>
                <TableRow>
                  <TableData>Media url</TableData>
                  <TableData>
                    <Anchor href={media.media_url}>{media.media_url}</Anchor>
                  </TableData>
                </TableRow>
                {renderTableRows(extractData(mediaInsights))}
              </TBody>
            </Table>
          )}
        </MediaDetailContainer>
      </MediaDetailsDiv>
    </Container>
  )
}
export default connect(
  null,
  { fetchMediaDetail }
)(PageResults)
