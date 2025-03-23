import * as buttonStyles from '../Button/ButtonStyles'

const button = buttonStyles.default
const afterLine = `after:w-0 relative after:absolute after:block after:h-[3px] after:rounded-full hover:after:w-full  after:transition-all ease-in-out  whitespace-nowrap`
const styles = {
  primary: `ui-link ui-link--primary ${button.button} ${button.primary}`,
  secondary: `ui-link ui-link--secondary ${button.button} ${button.secondary}`,
  disabled: `ui-link ui-link--disabled ${button.button} ${button.disabled}`,
  default: `ui-link inline ui-font-normal hover:ui-text-green-600 after:ui-bg-green-600 ${afterLine}`,
  white: `ui-link--white ui-inline ui-font-normal ui-text-white after:ui-bg-white ${afterLine}`,
  full: `ui-link--full ${button.full} ui-inline-block ui-text-center`,
  size: button.size,
}
export default styles
