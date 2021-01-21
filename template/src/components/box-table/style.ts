import styled from 'styled-components'

export const Wrapper = styled.div`
  .table-top {
    display: flex; align-items: center; justify-content: space-between;
    >div.extra {
      text-align: right;
    }
    &+.table-content {
      margin-top: 16px;
    }
  }
  
`
