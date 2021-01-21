import styled, { createGlobalStyle } from 'styled-components'
import { Layout } from 'antd'

export const GlobalStyle = createGlobalStyle`
  /* 公共样式 */
`

/** layout */
export const Wrapper = styled(Layout)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .layout-main {
    display: flex;
    flex-direction: column;
  }
  .ant-layout-content {
    padding: 16px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    .ka-wrapper {
      flex: 1;
      .ka-content {
        width: 100%;
        height: 100%;
        display: flex;
      }
    }
    .page-container {
      flex: 1;
      position: relative;
    }
  }
`

/** header */
export const HeaderWrapper = styled(Layout.Header)`
  height: 48px;
  line-height: 48px;
  padding-left: 0;
  box-shadow: ${({ theme }) => theme.shadowBottom};
  background-color: #fff;
  display: flex;
  position: relative;
  z-index: 2;
  .header-info {
    flex: 1;
    .trigger {
      font-size: 18px;
      line-height: 48px;
      padding: 0 24px;
      transition: color 0.3s;
      cursor: pointer;
      &:hover {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
  .header-actions {
    display: flex;
  }
`

/** sider menu */
export const SiderWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadowRight};
  .logo {
    height: 48px;
    position: relative;
    z-index: 1;
    display: flex;
    padding-left: 20px;
    align-items: flex-end;
    box-shadow: ${({ theme }) => theme.shadowBottom};
    > img {
      height: 32px;
    }
    &.mini {
      padding: 0; justify-content: center;
    }
  }
  .menu-wrapper {
    flex: 1;
    padding: 10px 0;
  }
  .ant-menu-inline {
    border-right: 0;
  }
`
