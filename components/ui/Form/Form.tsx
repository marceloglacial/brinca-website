import FormGroup from './FormGroup'
import FormInput from './FormInput'
import FormLabel from './FormLabel'
import FormSelect from './FormSelect'
import styles from './FormStyles'
import FormTextarea from './FormTextarea'

export interface FormProps {
  children: React.ReactNode
}

const FormContainer = (props: FormProps & React.JSX.IntrinsicElements['form']) => {
  const { children } = props
  return (
    <form {...props} className={`${styles.form} `}>
      {children}
    </form>
  )
}

export const Form = Object.assign(FormContainer, {
  Label: FormLabel,
  Group: FormGroup,
  Input: FormInput,
  Textarea: FormTextarea,
  Select: FormSelect,
})

FormContainer.displayName = 'Form'
;(FormGroup as React.FC).displayName = 'Form.Group'
;(FormLabel as React.FC).displayName = 'Form.Label'
;(FormInput as React.FC).displayName = 'Form.Input'
;(FormTextarea as React.FC).displayName = 'Form.Textarea'
;(FormSelect as React.FC).displayName = 'Form.Select'
