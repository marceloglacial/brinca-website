import styles from './FormStyles'

export interface FormLabelProps {
  children?: React.ReactNode
  full?: boolean
}

const FormLabel = (props: FormLabelProps & React.JSX.IntrinsicElements['label']) => {
  const { children, full, ...labelProps } = props
  const fullClassName = full ? styles.inputFull : ''

  return (
    <label {...labelProps} className={`${styles.label} ${fullClassName} `}>
      {children}
    </label>
  )
}
export default FormLabel
