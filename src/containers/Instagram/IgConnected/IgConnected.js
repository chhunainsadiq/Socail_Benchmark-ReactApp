import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FetchNewData,
  fetchUserMedia,
  setCrawledImagesZIPlink
} from '../../../actions/DataActions'
import { connect, useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import { pageSize } from '../../../config/utils'
import Pagination from 'react-js-pagination'
import Button from '../../../components/Button'
import { theme } from '../../../config/theme'
import { Container, InnerContainer } from '../../../config/commonStyles'
import Modal from '../../../components/Modal/Modal'
import {
  TableHeadContainer,
  TableHeading,
  TableSearchContainer,
  TableSearchLabel,
  TableSearchInput,
  Table,
  PagginationDiv,
  DetailColumn,
  TableRow,
  TableData,
  THead,
  TBody,
  TableHeadRow,
  LoadingContainer,
  TableContainer
} from '../styled'
import {
  tokenSelector,
  mediaSelector,
  mediaCountSelector,
  mediaIdsSelector,
  dataLoadingSelector,
  zipImagesLinkSelector
} from '../../../selectors/index'
import {
  columnsToRender,
  extractRowData,
  crawlerMsg,
  actionBtnTitle
} from './helper'

const IgConnected = ({ history, FetchNewData, setCrawledImagesZIPlink }) => {
  // local state variables
  const [currentPage, setCurrentPage] = useState(1)
  // redux store selectors
  const state = useSelector(state => state)
  const accessToken = tokenSelector(state)
  const instaMedia = mediaSelector(state)
  const instaMediaIds = mediaIdsSelector(state)
  const dataLoading = dataLoadingSelector(state)
  const mediaCount = mediaCountSelector(state)
  const zipImagesLink = zipImagesLinkSelector(state)

  useEffect(
    () => {
      if (window.location.href.split('#')[1] && !dataLoading) {
        let accessTokenIG = window.location.href.split('#')[1].split('=')[1]
        if (accessToken) {
          FetchNewData(accessToken, accessTokenIG)
        }
      }
    },
    [currentPage, dataLoading] // eslint-disable-line
  )
  // helper methods for component
  const handleCrawlClick = () => {
    history.push('/igconnect')
  }
  const handlePageChange = pageNumber => {
    setCurrentPage(Number(pageNumber))
  }
  const renderMediaRows = () => {
    return instaMediaIds.map(id => {
      const rowData = extractRowData(instaMedia, id)
      return (
        <TableRow key={id}>
          {renderColumnData(rowData)}
          <DetailColumn>
            <Link to='/igPageResults'>details</Link>
          </DetailColumn>
        </TableRow>
      )
    })
  }
  const renderColumnData = dataList => {
    return dataList.map(item => {
      return <TableData key={item.key}>{item.value}</TableData>
    })
  }
  const renderColumnHeadings = () => {
    return columnsToRender.map(item => {
      return (
        <TableHeadRow scope='col' key={item.key}>
          {item.value}
        </TableHeadRow>
      )
    })
  }
  const onCloseModal = () => {
    setCrawledImagesZIPlink(null)
  }
  const onActionBtnClick = () => {
    window.open(zipImagesLink)
    setCrawledImagesZIPlink(null)
  }
  return (
    <Container>
      <InnerContainer sm={{ span: 2, offset: 0 }}>
        <Button type='submit' onClick={handleCrawlClick}>
          Crawl again
        </Button>
      </InnerContainer>
      <TableContainer sm={{ span: 9, offset: 1 }}>
        <TableHeadContainer>
          <TableHeading>Recent crawl results</TableHeading>
          <TableSearchContainer>
            <TableSearchLabel htmlFor='inputPassword'>Search:</TableSearchLabel>
            <TableSearchInput type='text' id='inputSearchText' />
          </TableSearchContainer>
        </TableHeadContainer>
        <Table>
          <THead>
            <TableRow>{renderColumnHeadings()}</TableRow>
          </THead>
          <TBody>{dataLoading || renderMediaRows()}</TBody>
        </Table>
        {dataLoading ? (
          <LoadingContainer sm={{ span: 5, offset: 5 }}>
            <ClipLoader
              sizeUnit={'rem'}
              size={4}
              color={theme.loaderColor}
              loading
            />
          </LoadingContainer>
        ) : (
          <PagginationDiv>
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={pageSize}
              totalItemsCount={mediaCount}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
              itemClass='page-item'
              linkClass='page-link'
            />
          </PagginationDiv>
        )}
      </TableContainer>
      {!zipImagesLink || (
        <Modal
          bodyString={crawlerMsg}
          actionBtnTitle={actionBtnTitle}
          hideHeading
          onCloseModal={onCloseModal}
          onActionBtnClick={onActionBtnClick}
        />
      )}
    </Container>
  )
}
export default connect(
  null,
  { FetchNewData, fetchUserMedia, setCrawledImagesZIPlink }
)(IgConnected)
