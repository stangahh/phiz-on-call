import { States, UIState } from '../types'
import { getImage } from './getImage'

export class Queue {
  private queue: UIState[] = []

  push = (item: UIState): void => {
    this.queue.push(item)
  }

  pop = () => {
    return this.queue.shift()
  }

  peek = () => {
    return this.queue.length > 0 ? this.queue[0] : undefined
  }

  get = () => {
    return this.queue
  }

  clear = () => {
    this.queue = []
  }

  setCurrentAction = (action: States) => {
    if (this.queue.length) {
      this.queue[0].action = action
      this.queue[0].image = getImage(action)
    }
  }

  setCurrentSound = (sound: string) => {
    if (this.queue.length) {
      this.queue[0].sound = sound
    }
  }

  setCurrentImage = (image: string) => {
    if (this.queue.length) {
      this.queue[0].image = image
    }
  }

  setCurrentTTS = (tts: string) => {
    if (this.queue.length) {
      this.queue[0].tts = tts
    }
  }
}
