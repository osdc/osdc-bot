import nltk

def message_chunk(command):
    words = nltk.word_tokenize(command)
    taggedTokens = nltk.pos_tag(words)
    outputCommand = ''
    for x in taggedTokens:
        if x[0] in ['wiki', 'wikipedia']:
            outputCommand += 'wiki'
    regularExpression = r"""
                NP: {<NN|NNP|NNS>?<DT|PP\$>?<JJ>*<NN|NNS><IN>?<NN|NNP|NNS>+}
                {<VB>?<JJ>*<NNP|NN|NNS>+}
                """
    chunk = nltk.RegexpParser(regularExpression)
    sentenceTree = chunk.parse(taggedTokens)
    for outerSubtree in sentenceTree.subtrees():
        if outerSubtree.label() == 'NP':
            for innerSubtree in outerSubtree:
                if innerSubtree[1] == 'NNP':
                    outputCommand += ' ' + innerSubtree[0]
                elif innerSubtree[1] == 'NN':
                    if innerSubtree[0] == 'location':
                        outputCommand += ' ' + 'locate'
                    elif innerSubtree[0] == 'definition':
                        outputCommand += ' ' + 'define'
                    else:
                        outputCommand += ' ' + innerSubtree[0]
                elif innerSubtree[1] == 'JJ':
                    if innerSubtree[0] in ['wiki', 'locate']:
                        outputCommand += ' ' + innerSubtree[0]
    outputCommand = outputCommand.strip()
    print(outputCommand)
    return outputCommand
