import styled from 'styled-components'
import { FormInput } from '../../config/commonStyles'
import { Col, Table as bootTable, Image } from 'react-bootstrap'

const TableHeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const TableHeading = styled.h4`
  margin-left: 0.4rem;
`

const TableSearchContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const TableSearchLabel = styled.label`
  align-self: center;
`

const TableSearchInput = styled(FormInput)`
  margin-bottom: 0.4rem;
  margin-left: 0.3rem;
`

const CrawlUserInput = styled(FormInput)`
  margin-right: 0.3rem;
`

const Table = styled(bootTable)`
  background-color: ${props => props.theme.light};
  margin-bottom: 0.05rem;
  border-collapse: separate;
  border-spacing: 0.5em;
`

const TableRow = styled.tr`
  padding-top: 2rem;
`
const TableData = styled.td``
const TableHeadRow = styled.th``

const PagginationDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end
  margin-bottom: 2rem;
`

const DetailColumn = styled.td`
  cursor: pointer;
`

const SeparateTextDiv = styled(Col)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 0.5rem;
`
const ConnectIgDiv = styled(Col)`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.2rem;
`

const SmallIcon = styled(Image)`
  margin-left: 0.5rem;
  width: 2rem;
  height: 2rem;
`

const MediaDetailsDiv = styled(Col)`
  margin-top: 2rem;
  margin-bottom: 3rem;
`

const InstagramFullImg = styled(Image)`
  width: 30rem;
  max-height: 18rem;
  margin-bottom: 1rem;
`

const Anchor = styled.a``
const H5 = styled.h5``
const THead = styled.thead`
  background-color: ${props => props.theme.dark}
  color: ${props => props.theme.light};
`
const TBody = styled.tbody``
const TableContainer = styled(Col)``
const LoadingContainer = styled(Col)``

const MediaContainer = styled.div``
const MediaDetailContainer = styled.div``

const PageTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

export {
  TableHeadContainer,
  TableHeading,
  TableSearchContainer,
  TableSearchLabel,
  TableSearchInput,
  Table,
  TableRow,
  TableData,
  TableHeadRow,
  THead,
  TBody,
  PagginationDiv,
  DetailColumn,
  SeparateTextDiv,
  ConnectIgDiv,
  SmallIcon,
  MediaDetailsDiv,
  InstagramFullImg,
  FormInput,
  Anchor,
  H5,
  TableContainer,
  LoadingContainer,
  MediaContainer,
  MediaDetailContainer,
  PageTopContainer,
  CrawlUserInput
}
