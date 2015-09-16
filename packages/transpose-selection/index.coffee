module.exports =
  activate: (state) ->
    atom.commands.add 'atom-workspace', 'transpose-selection:transpose': =>
      @transpose_forward()
    atom.commands.add 'atom-workspace', 'transpose-selection:transpose-backward': =>
      @transpose_backward()

  transpose_forward: ->
    editor = atom.workspace.getActiveTextEditor()
    selections = editor.getSelections()

    return unless selections.length > 1

    i = 1
    a = selections[0].getText()

    while i < selections.length
      b = selections[i].getText()
      selections[i].insertText(a, {select: true})
      a = b

      i++

    selections[0].insertText(a, {select: true})

  transpose_backward: ->
    editor = atom.workspace.getActiveTextEditor()
    selections = editor.getSelections()

    return unless selections.length > 1

    i = selections.length - 2
    a = selections[selections.length - 1].getText()

    while i >= 0
      b = selections[i].getText()
      selections[i].insertText(a, {select: true})
      a = b

      i--

    selections[selections.length - 1].insertText(a, {select: true})
