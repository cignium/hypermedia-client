import StyleSheet from 'stilr'

export default ({ error }) => {
  if (!error) {
    return <div />
  }

  return (
    <div className={`${styles.root} ct-error-message`}>
      {error.message}
    </div>
  )
}

const styles = StyleSheet.create({
  root: {
    background: '#FF6767',
    border: 'solid 1px #DC6363',
    borderBottom: 0,
    borderRadius: '3px 3px 0 0',
    boxShadow: 'inset 0 -2px 2px rgba(0, 0, 0, 0.05)',
    color: 'white',
    fontSize: 12,
    margin: '-45px auto 10px',
    padding: '10px 30px',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
})
