export default function Button({ children, type = 'button', disabled = false, onClick }) {
  return (
    <button className="btn" type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
