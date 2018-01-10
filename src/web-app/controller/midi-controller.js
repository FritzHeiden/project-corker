const CROSS_FADER = 64, VOLUME_FADER_1 = 48, VOLUME_FADER_2 = 49, VOLUME_FADER_3 = 50, VOLUME_FADER_4 = 51,
  ONE_BUTTON_1 = 19, TWO_BUTTON_1 = 20, CUE_BUTTON_1 = 48, ONE_BUTTON_2 = 23, TWO_BUTTON_2 = 24, CUE_BUTTON_2 = 49,
  ONE_BUTTON_3 = 27, TWO_BUTTON_3 = 28, CUE_BUTTON_3 = 50, ONE_BUTTON_4 = 31, TWO_BUTTON_4 = 32, CUE_BUTTON_4 = 51,
  FX_KNOB1_1 = 6, FX_KNOB2_1 = 10, FX_KNOB3_1 = 14, FX_KNOB4_1 = 18, FX_KNOB1_2 = 7, FX_KNOB2_2 = 11, FX_KNOB3_2 = 15,
  FX_KNOB4_2 = 19,
  FX_KNOB1_3 = 8, FX_KNOB2_3 = 12, FX_KNOB3_3 = 16, FX_KNOB4_3 = 20, FX_KNOB1_4 = 9, FX_KNOB2_4 = 13, FX_KNOB3_4 = 17,
  FX_KNOB4_4 = 21,
  FX_BUTTON = 18, OUT1_KNOB = 1, OUT2_KNOB = 2, LEFT_BUTTON = 16, BROWSE_KNOB = 3, RIGHT_BUTTON = 17, CUE_VOL_KNOB = 4,
  CUE_MIX_KNOB = 5
const ON = 153, OFF = 137, FADE = 185

export default class MidiController {
  constructor () {
    this._listeners = []
  }

  async initialize () {
    if (!navigator.requestMIDIAccess) {
      throw new Error('Could not initialize midi controller: Midi not supported by environment!')
    }

    let midi = await navigator.requestMIDIAccess()
    let inputs = midi.inputs
    for (let input of inputs.values()) {
      input.onmidimessage = this._onMessage.bind(this)
    }
  }

  _onMessage (event) {
    let input = event.data[1]
    let mode = event.data[0]
    let value = event.data[2]

    let listener = this._listeners.find(listener => listener.input === input && listener.modes.find(listenMode => listenMode === mode))
    if (listener) {
      listener.callback(value, mode)
    }
  }

  listenOnOut1KnobChange (callback) {
    this._listeners.push({input: OUT1_KNOB, modes: [FADE], callback})
  }

  listenOnOut2KnobChange (callback) {
    this._listeners.push({input: OUT2_KNOB, modes: [FADE], callback})
  }

  listenOnLeftButtonChange (callback) {
    this._listeners.push({input: LEFT_BUTTON, modes: [ON, OFF], callback})
  }

  listenOnBrowseKnobChange (callback) {
    this._listeners.push({input: BROWSE_KNOB, modes: [FADE, ON, OFF], callback})
  }

  listenOnRightButtonChange (callback) {
    this._listeners.push({input: RIGHT_BUTTON, modes: [ON, OFF], callbacak})
  }

  listenOnCueVolKnobChange (callback) {
    this._listeners.push({input: CUE_VOL_KNOB, modes: [FADE], callback})
  }

  listenOnCueMixKnobChange (callback) {
    this._listeners.push({input: CUE_MIX_KNOB, modes: [FADE], callback})
  }

  listenOnFxKnob1Column1Change (callback) {
    this._listeners.push({input: FX_KNOB1_1, modes: [FADE], callback})
  }

  listenOnFxKnob2Column1Change (callback) {
    this._listeners.push({input: FX_KNOB2_1, modes: [FADE], callback})
  }

  listenOnFxKnob3Column1Change (callback) {
    this._listeners.push({input: FX_KNOB3_1, modes: [FADE], callback})
  }

  listenOnFxKnob4Column1Change (callback) {
    this._listeners.push({input: FX_KNOB4_1, modes: [FADE], callback})
  }

  listenOnFxKnob1Column2Change (callback) {
    this._listeners.push({input: FX_KNOB1_2, modes: [FADE], callback})
  }

  listenOnFxKnob2Column2Change (callback) {
    this._listeners.push({input: FX_KNOB2_2, modes: [FADE], callback})
  }

  listenOnFxKnob3Column2Change (callback) {
    this._listeners.push({input: FX_KNOB3_2, modes: [FADE], callback})
  }

  listenOnFxKnob4Column2Change (callback) {
    this._listeners.push({input: FX_KNOB4_2, modes: [FADE], callback})
  }

  listenOnFxKnob1Column3Change (callback) {
    this._listeners.push({input: FX_KNOB1_3, modes: [FADE], callback})
  }

  listenOnFxKnob2Column3Change (callback) {
    this._listeners.push({input: FX_KNOB2_3, modes: [FADE], callback})
  }

  listenOnFxKnob3Column3Change (callback) {
    this._listeners.push({input: FX_KNOB3_3, modes: [FADE], callback})
  }

  listenOnFxKnob4Column3Change (callback) {
    this._listeners.push({input: FX_KNOB4_3, modes: [FADE], callback})
  }

  listenOnFxKnob1Column4Change (callback) {
    this._listeners.push({input: FX_KNOB1_4, modes: [FADE], callback})
  }

  listenOnFxKnob2Column4Change (callback) {
    this._listeners.push({input: FX_KNOB2_4, modes: [FADE], callback})
  }

  listenOnFxKnob3Column4Change (callback) {
    this._listeners.push({input: FX_KNOB3_4, modes: [FADE], callback})
  }

  listenOnFxKnob4Column4Change (callback) {
    this._listeners.push({input: FX_KNOB4_4, modes: [FADE], callback})
  }

  listenOnFxButtonChange (callback) {
    this._listeners.push({input: FX_BUTTON, modes: [ON, OFF], callback})
  }

  listenOnOneButtonColumn1Change (callback) {
    this._listeners.push({input: ONE_BUTTON_1, modes: [ON, OFF], callback})
  }

  listenOnTwoButtonColumn1Change (callback) {
    this._listeners.push({input: TWO_BUTTON_1, modes: [ON, OFF], callback})
  }

  listenOnCueButtonColumn1Change (callback) {
    this._listeners.push({input: CUE_BUTTON_1, modes: [ON, OFF], callback})
  }

  listenOnOneButtonColumn2Change (callback) {
    this._listeners.push({input: ONE_BUTTON_2, modes: [ON, OFF], callback})
  }

  listenOnTwoButtonColumn2Change (callback) {
    this._listeners.push({input: TWO_BUTTON_2, modes: [ON, OFF], callback})
  }

  listenOnCueButtonColumn2Change (callback) {
    this._listeners.push({input: CUE_BUTTON_2, modes: [ON, OFF], callback})
  }

  listenOnOneButtonColumn3Change (callback) {
    this._listeners.push({input: ONE_BUTTON_3, modes: [ON, OFF], callback})
  }

  listenOnTwoButtonColumn3Change (callback) {
    this._listeners.push({input: TWO_BUTTON_3, modes: [ON, OFF], callback})
  }

  listenOnCueButtonColumn3Change (callback) {
    this._listeners.push({input: CUE_BUTTON_3, modes: [ON, OFF], callback})
  }

  listenOnOneButtonColumn4Change (callback) {
    this._listeners.push({input: ONE_BUTTON_4, modes: [ON, OFF], callback})
  }

  listenOnTwoButtonColumn4Change (callback) {
    this._listeners.push({input: TWO_BUTTON_4, modes: [ON, OFF], callback})
  }

  listenOnCueButtonColumn4Change (callback) {
    this._listeners.push({input: CUE_BUTTON_4, modes: [ON, OFF], callback})
  }

  listenOnVolumeFader1Change (callback) {
    this._listeners.push({input: VOLUME_FADER_1, modes: [FADE], callback})
  }

  listenOnVolumeFader2Change (callback) {
    this._listeners.push({input: VOLUME_FADER_2, modes: [FADE], callback})
  }

  listenOnVolumeFader3Change (callback) {
    this._listeners.push({input: VOLUME_FADER_3, modes: [FADE], callback})
  }

  listenOnVolumeFader4Change (callback) {
    this._listeners.push({input: VOLUME_FADER_4, modes: [FADE], callback})
  }

  listenOnCrossFaderChange (callback) {
    this._listeners.push({input: CROSS_FADER, modes: [FADE], callback})
  }

  static ON () {
    return ON
  }

  static OFF () {
    return OFF
  }

  static FADE () {
    return FADE
  }
}