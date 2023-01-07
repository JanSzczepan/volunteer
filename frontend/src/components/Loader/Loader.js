import { Oval } from 'react-loader-spinner'

const Loader = ({ height, width, color, secondaryColor, strokeWidth, strokeWidthSecondary }) => {
   return (
      <Oval
         height={height}
         width={width}
         color={color}
         wrapperStyle={{}}
         wrapperClass=''
         visible={true}
         ariaLabel='oval-loading'
         secondaryColor={secondaryColor}
         strokeWidth={strokeWidth}
         strokeWidthSecondary={strokeWidthSecondary}
      />
   )
}

export default Loader
