import React from 'react'

const Message = ({ alert, children }) => {
  return <div className={`alert alert-${alert}`}>{children}</div>
}

Message.defaultProps = {
  alert: 'info',
}

// info - bluish
// success - greenish
// danger - reddish

export default Message
