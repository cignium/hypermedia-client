import React from 'react'
import StyleSheet from 'stilr'
import ListItem from './list-item'

export default ({ navigate, property }) => {
  return (
    <div className={`${styles.root} ct-list`}>
      {property.items.map(item => {
        return <ListItem item={item} key={item.id} navigate={navigate} />
      })}
    </div>
  )
}

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
})
