import { Oval } from 'react-loader-spinner'

type LoaderProps = {
   height: string | number
   width: string | number
   color: string
   secondaryColor: string
   strokeWidth: string | number
   strokeWidthSecondary: string | number
}

const Loader = ({ height, width, color, secondaryColor, strokeWidth, strokeWidthSecondary }: LoaderProps) => {
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
