import styled, { css } from 'styled-components'

interface Props {
  hasRow: boolean
  isOpen: boolean
  contentHeight: number
  labelWidth: number
}

export const Wrapper = styled.div<Props>`
  border: 1px solid #f0f0f0; border-radius: 3px;
  padding: 16px 12px 0 12px; position: relative;
  transition: all .3s ease; overflow: hidden;
  ${props => !props.hasRow || props.isOpen ? css`height:${props.contentHeight + 2}px;` : css`height: 64px;`}
  
  ${props => props.hasRow && !props.isOpen ? css`
    .ant-row:not(:first-child) { display: none; }
  ` : css``}

  >.button-box{
    position:absolute;right:16px;top:16px;
    ${props => props.hasRow ? css`right:111px;` : css``}
    >*{width:100%;}
  }

  >.more{
    width:95px;
    position:absolute;right:16px;top:16px;
    >*{width:100%;}
    svg{transition: all .3s ease;}
  }

  .ant-form-item-label {
    ${props => css`
      flex: 0 0 ${props.labelWidth}px;
    `}
  }
  .ant-form-item-control{
    flex: 1;
  }
  .ant-form-item {
    margin-bottom: 16px;
  }

  &+.box-table {
    margin-top: 16px;
  }
  
`;