interface ButtonGroupProps {
  content: ButtonGroupType[]
}

type ButtonGroupType = {
  link: {
    title: string
    url: string
  }
  new_page: boolean
}
