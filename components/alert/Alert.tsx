interface AlertProps {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
}

export const Alert = ({ message, type = 'error' }: AlertProps) => {
  const alertTypes: { [key in NonNullable<AlertProps['type']>]: string } = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    warning: 'bg-yellow-600',
    info: 'bg-blue-600',
  }

  return <div className={`p-4 rounded-2xl text-white ${alertTypes[type]}`}>{message}</div>
}
