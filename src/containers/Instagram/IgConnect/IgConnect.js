import React, { useEffect, useState, useRef, useCallback } from 'react'
import { images } from '../../../assets/images'
import { connect, useSelector } from 'react-redux'
import { theme } from '../../../config/theme'
import {
  fetchUserMedia,
  CrawlNewUser,
  setIgConnectSearchText,
  setSelectedMedia
} from '../../../actions/DataActions'
import { Link } from 'react-router-dom'
import { ToastsStore } from 'react-toasts'
import { InstaRedirect } from '../../../config/urls'
import { ClipLoader } from 'react-spinners'
import Button from '../../../components/Button'
import AnchorButton from '../../../components/AnchorButton'
import { Container, InnerContainer } from '../../../config/commonStyles'
import {
  TableHeadContainer,
  TableHeading,
  TableSearchContainer,
  TableSearchLabel,
  TableSearchInput,
  Table,
  PagginationDiv as DummyDiv,
  DetailColumn,
  SeparateTextDiv,
  ConnectIgDiv,
  SmallIcon,
  TableRow,
  TableData,
  TableHeadRow,
  THead,
  TBody,
  H5,
  TableContainer,
  LoadingContainer,
  CrawlUserInput
} from '../styled'
import {
  tokenSelector,
  mediaSelector,
  // mediaCountSelector,
  mediaIdsSelector,
  igConnectSearchTextSelector,
  dataLoadingSelector
} from '../../../selectors/index'
import { columnsToRender, extractRowData } from './helper'

const IgConnect = ({
  history,
  fetchUserMedia,
  CrawlNewUser,
  setIgConnectSearchText,
  setSelectedMedia
}) => {
  const DummyDivRef = useRef(null)
  // local state variables
  const [currentPage, setCurrentPage] = useState(1)
  const [username, setUsername] = useState('')
  const [searchText, setSearchText] = useState('')
  // redux store selectors
  const state = useSelector(state => state)
  const accessToken = tokenSelector(state)
  const instaMedia = mediaSelector(state)
  const instaMediaIds = mediaIdsSelector(state)
  // const mediaCount = mediaCountSelector(state)
  const dataLoading = dataLoadingSelector(state)
  const igConnectSearchText = igConnectSearchTextSelector(state)

  const isInViewport = useCallback(
    (offset = 0) => {
      let element = DummyDivRef.current
      if (element) {
        const top = element.getBoundingClientRect().top
        if (top + offset >= 0 && top - Math.abs(offset) <= window.innerHeight) {
          setCurrentPage(currentPage + 1)
        }
      }
    },
    [currentPage]
  )

  useEffect(
    () => {
      if (igConnectSearchText) {
        setSearchText(igConnectSearchText)
        setIgConnectSearchText('')
      }
      console.log('currentPage in useeffect: ', currentPage)
      fetchUserMedia(
        accessToken,
        currentPage,
        searchText.length > 1 ? searchText : ''
      )
    }, // eslint-disable-next-line
    [currentPage, searchText, accessToken, igConnectSearchText]
  )

  useEffect(
    () => {
      const attachListener = () => {
        window.addEventListener('scroll', () => isInViewport(), true)
      }

      const removeListener = () => {
        window.removeEventListener('scroll', isInViewport())
      }
      attachListener()
      return () => {
        removeListener()
      }
    },
    [isInViewport]
  )

  // helper methods for component

  const renderMediaRows = () => {
    return instaMediaIds.map(id => {
      const rowData = extractRowData(instaMedia, id)
      return (
        <TableRow key={id}>
          {renderColumnData(rowData)}
          <DetailColumn>
            <Link
              to={`/igPageResults/${id}`}
              onClick={() => {
                setIgConnectSearchText(searchText)
                setSelectedMedia(instaMedia[id])
              }}
            >
              details
            </Link>
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

  const handleCrawlClick = () => {
    if (username.trim().length === 0) {
      ToastsStore.error('can not crawl an empty username')
    } else {
      CrawlNewUser(accessToken, username)
      history.push('/igconnected')
    }
  }
  const handleTextInputChange = event => {
    if (event.target.id === 'inputIgUser') {
      setUsername(event.target.value)
    } else if (event.target.id === 'inputSearchText') {
      setSearchText(event.target.value)
    }
  }

  return (
    <Container>
      <InnerContainer sm={{ span: 3, offset: 4 }}>
        <CrawlUserInput
          type='text'
          id='inputIgUser'
          placeholder='Enter Insta username'
          onChange={handleTextInputChange}
        />
        <Button type='submit' onClick={handleCrawlClick} variant='primary'>
          Crawl
        </Button>
      </InnerContainer>
      <SeparateTextDiv sm={{ span: 3, offset: 4 }}>
        <H5>{' OR '}</H5>
      </SeparateTextDiv>
      <ConnectIgDiv sm={{ span: 3, offset: 4 }}>
        <AnchorButton
          href={InstaRedirect}
          role='button'
          paddingHorizontal='1rem'
        >
          Connect to Instagram
          <SmallIcon src={images.instaLogo} />
        </AnchorButton>
      </ConnectIgDiv>
      <TableContainer sm={{ span: 9, offset: 1 }}>
        <TableHeadContainer>
          <TableHeading>Previous crawl results</TableHeading>
          <TableSearchContainer>
            <TableSearchLabel htmlFor='inputPassword'>Search:</TableSearchLabel>
            <TableSearchInput
              type='text'
              id='inputSearchText'
              onChange={handleTextInputChange}
              value={searchText}
            />
          </TableSearchContainer>
        </TableHeadContainer>
        <Table>
          <THead>
            <TableRow>{renderColumnHeadings()}</TableRow>
          </THead>
          <TBody>{renderMediaRows()}</TBody>
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
          <DummyDiv ref={DummyDivRef} />
        )}
      </TableContainer>
    </Container>
  )
}
export default connect(
  null,
  {
    fetchUserMedia,
    CrawlNewUser,
    setIgConnectSearchText,
    setSelectedMedia
  }
)(IgConnect)
