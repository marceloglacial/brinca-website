import styles from './FormStyles'

export interface FormGroupProps {
  children?: React.ReactNode
}

const FormGroup = (props: FormGroupProps & React.JSX.IntrinsicElements['div']) => (
  <div className={`${styles.group} `}>{props.children}</div>
)
export default FormGroup
