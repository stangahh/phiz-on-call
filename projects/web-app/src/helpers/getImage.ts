import { WebAppParams } from '../types.js'

export const getImage = (action: WebAppParams['action']): string => {
  switch (action) {
    case 'ringing':
      return 'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/091cab3b-808f-4d0c-a614-08d4790979a5/incoming-call.gif'
    case 'answered':
      return 'https://thumbs.gfycat.com/MeanFluffyGlassfrog-max-1mb.gif'
    case 'message-bank':
      return 'https://raw.githubusercontent.com/emrekose26/RecordButton/master/art/recordbutton.gif'
    case 'hang':
      return 'https://cdn.dribbble.com/users/1113077/screenshots/2801947/phone_calling.gif'
    case 'reset':
    default:
      return 'https://media.tenor.com/images/938c2c961d67096c2fa46edc0c579d3b/tenor.gif'
  }
}
