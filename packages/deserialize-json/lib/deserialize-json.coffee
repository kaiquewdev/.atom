DeserializeJsonView = require './deserialize-json-view'
{CompositeDisposable} = require 'atom'

module.exports = DeserializeJson =
  activate : ->
    atom.commands.add 'atom-workspace', "json-deserialize:deserialize", => @deserialize()

  deserialize: ->
    editor = atom.workspace.getActiveTextEditor()
    selection = editor.getSelectedText()
    range = editor.getSelectedBufferRange()
    try
      editor.setTextInBufferRange(range, JSON.parse(selection))
    catch error
      ""
