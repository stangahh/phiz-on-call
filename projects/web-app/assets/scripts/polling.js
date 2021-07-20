function speak(message) {
  var msg = new SpeechSynthesisUtterance(message)
  const voice = window.speechSynthesis
    .getVoices()
    .find((voice) => voice.voiceURI.startsWith('Microsoft James'))
  msg.voice = voice
  window.speechSynthesis.speak(msg)
}

async function updateUI(received) {
  var imageEl = document.getElementById('image')
  var targetEl = document.getElementById('target')
  var audioSrcEl = document.getElementById('audio')

  // set new image if its changed
  if (imageEl && imageEl.src !== received.image) {
    imageEl.src = received.image
  }

  // set new target paragraph if its changed
  if (targetEl && targetEl.textContent !== received.target) {
    targetEl.textContent = received.target
  }

  // Get the src of the audio element, subtract current url for comparison
  if (!audioSrcEl) return

  var audioSrcElSrc = audioSrcEl.src.split(window.location.href)[1]

  if (!received.sound) return

  // if its changed, set it. Otherwise autoplay will re-run this sound on dom update
  if (audioSrcElSrc !== received && received.sound.replace(/^\//g, '')) {
    audioSrcEl.src = received.sound
  }

  // set audio to loop only if its the `ringing` state
  if (!received.sound) return

  audioSrcEl.loop = received.sound.match(/ringing/).length > 0

  /** hash the target + message combination to make TTS only run once */
  const hash = received.user + received.target + received.tts

  if (received.tts && !window[hash] && received.action === 'answered') {
    // dedupe TTS
    window[hash] = true

    // delay TTS by 1200ms, seems natural
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // speak
    speak(received.tts)
  }

  // kill tts if you move beyond answered (hang or reset etc)
  if (received.action !== 'answered') {
    window.speechSynthesis.cancel()
  }
}

async function subscribe() {
  let response = await fetch('/subscribe')
  var INTERVAL = 2000 // ms

  if (response.status == 502) {
    // Status 502 is a connection timeout error,
    // may happen when the connection was pending for too long,
    // and the remote server or a proxy closed it
    // let's reconnect
    await subscribe()
  } else if (response.status != 200) {
    // An error - let's show it
    await updateUI(message)
    // Reconnect in one second
    await new Promise((resolve) => setTimeout(resolve, INTERVAL))
    await subscribe()
  } else {
    // Get and show the message
    let message = await response.json()
    await updateUI(message)
    await new Promise((resolve) => setTimeout(resolve, INTERVAL))
    // Call subscribe() again to get the next message
    await subscribe()
  }
}

subscribe()
