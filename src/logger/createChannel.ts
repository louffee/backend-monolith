import Channel from './Channel'
import ColorChannel from './ColorChannel'

function createChannel(): Channel {
  return new ColorChannel()
}

export default createChannel
