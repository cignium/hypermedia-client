import React from 'react'
import StyleSheet from 'stilr'

export default ({requests}) => {
  if (!Object.keys(requests).length) {
    return <div />
  }

  return (
    <div className={`${styles.root} ct-activity-indicator`}>
      loading...
    </div>
  )
}

const styles = StyleSheet.create({
  root: {
    background: '#bbb',
    border: 'solid 1px #aaa',
    borderBottom: 0,
    borderRadius: '3px 3px 0 0',
    boxShadow: 'inset 0 -2px 2px rgba(0, 0, 0, 0.05)',
    color: '#eee',
    fontSize: 12,
    margin: '-45px auto 10px',
    padding: '10px 30px',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
})
