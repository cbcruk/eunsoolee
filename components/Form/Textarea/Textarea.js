/**
 * @param {JSX.IntrinsicElements['textarea']} props
 */
export function Textarea(props) {
  return (
    <textarea
      rows={4}
      className="block w-full p-2 border-2 bg-transparent border-[color:var(--solarized-background-highlight)] rounded-xl color-[var(--solarized-secondary)]"
      {...props}
    />
  )
}
