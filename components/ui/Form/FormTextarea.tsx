import styles from './FormStyles'

export interface FormTextareaProps {
  full?: boolean
  value?: string
  defaultValue?: string
}

const FormTextarea = (props: FormTextareaProps & React.JSX.IntrinsicElements['textarea']) => {
  const { full, ...textareaProps } = props
  const fullClassName = full ? styles.inputFull : ''
  const disabledClassname = props.disabled ? styles.disabled : ` `

  return (
    <textarea
      {...textareaProps}
      className={`${styles.textarea} ${fullClassName} ${disabledClassname}`}
    />
  )
}
export default FormTextarea
