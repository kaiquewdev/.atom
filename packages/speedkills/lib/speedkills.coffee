{CompositeDisposable, TextEditor} = require 'atom'


module.exports =
  editorView: null
  subscriptions: null
  keysSinceLastCheck: 0
  interval: null
  ctx: null
  buffer: null
  source: null
  keyUpListener: null

  config:
    keysPerSecond:
      type: 'integer'
      default: 8
      minimum: 1
    riffUrl:
      type: 'string'
      default: 'atom://speedkills/solo.mp3'

  activate: (state) ->
    @subscriptions = new CompositeDisposable
    @subscriptions.add atom.workspace.observeActivePaneItem((currentPanelItem) =>
      @onActivePaneItemChange currentPanelItem
    )
    @interval = setInterval (=> @checkRate()), 1000

    @ctx = new window.AudioContext
    @loadAudio(atom.config.get('speedkills.riffUrl'))

    atom.config.observe 'speedkills.riffUrl', (url) =>
      @loadAudio(url)

  deactivate: ->
    @subscriptions.dispose()
    @changeDisposable.dispose() unless not @changeDisposable
    @editorView.removeEventListener('keyup', @keyUpListener) unless not @editorView
    clearInterval @interval

  loadAudio: (url) ->
    request = new XMLHttpRequest
    request.open 'GET', url, true
    request.responseType = 'arraybuffer'
    request.onload = =>
      @ctx.decodeAudioData request.response, (decoded) =>
        @buffer = decoded
    request.send()

  onActivePaneItemChange: (currentPaneItem) ->
    @changeDisposable.dispose() unless not @changeDisposable
    @editorView.removeEventListener('keyup', @keyUpListener) unless not @editorView

    if currentPaneItem instanceof TextEditor
      @keyUpListener = (e) =>
        @keysSinceLastCheck++
      @editorView = atom.views.getView currentPaneItem
      @editorView.addEventListener 'keyup', @keyUpListener
      @keysSinceLastCheck = 0
      @lastCheck = Date.now()

  checkRate: ->
    if @keysSinceLastCheck > atom.config.get 'speedkills.keysPerSecond'
      @play()
    else
      @stop()
    @keysSinceLastCheck = 0

  play: ->
    if not @source
      @source = @ctx.createBufferSource()
      try
        @source.buffer = @buffer
        @source.loop = true
        @source.connect @ctx.destination
        @source.start()
      catch error
        @source = null
    @editorView.classList.add('fire') unless not @editorView

  stop: ->
    if @source
      @source.stop()
      @source.disconnect()
      @source = null
    @editorView.classList.remove('fire') unless not @editorView
