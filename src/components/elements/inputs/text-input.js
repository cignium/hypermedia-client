import styles from './input.css'

export default ({ className, errors, onCommit, onUpdate, property, value }) => (
  <input
    className={`${className} ${styles.input} ct-text-input`}
    data-tip={errors}
    disabled={property.disabled}
    id={property.id}
    onBlur={() => onCommit()}
    onChange={e => onUpdate(e.target.value)}
    title={property.title}
    type={{ email: 'email', telephone: 'tel' }[property.display] || 'text'}
    value={value} />
)
