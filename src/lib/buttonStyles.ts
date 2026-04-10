export type ButtonStyle = 'primary' | 'secondary' | 'link'

export const buttonClass: Record<ButtonStyle, string> = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-secondary',
  link: 'btn btn-link',
}

export const buttonStyles = `
  .btn {
    display: inline-block;
    text-decoration: none;
    font-weight: 600;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
    cursor: pointer;
    border-radius: 6px;
  }
  .btn-primary {
    padding: 0.75rem 1.75rem;
    background: #019f44;
    color: #fff;
    border: 2px solid #019f44;
  }
  .btn-primary:hover {
    background: #02662c;
    border-color: #02662c;
  }
  .btn-secondary {
    padding: 0.75rem 1.75rem;
    background: transparent;
    color: #019f44;
    border: 2px solid #019f44;
  }
  .btn-secondary:hover {
    background: #019f44;
    color: #fff;
  }
  .btn-link {
    padding: 0;
    background: transparent;
    color: #019f44;
    border: none;
    border-radius: 0;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .btn-link:hover {
    color: #02662c;
  }
`
