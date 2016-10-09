import nltk


def message_chunk(command):
    '''
    This function extracts the command (preferably a noun)
    and the subject from the input text and returns it.
    '''
    words = nltk.word_tokenize(command)
    tagged_tokens = nltk.pos_tag(words)
    output_command = ''
    for x in tagged_tokens:
        if x[0] in ['wiki', 'wikipedia']:
            output_command += 'wiki'
    regular_expression = r"""
                NP: {<NN|NNP|NNS>?<DT|PP\$>?<JJ>*<NN|NNS><IN>?<NN|NNP|NNS>+}
                {<VB>?<JJ>*<NNP|NN|NNS>+}
                """
    chunk = nltk.RegexpParser(regular_expression)
    sentence_tree = chunk.parse(tagged_tokens)
    for outer_subtree in sentence_tree.subtrees():
        if outer_subtree.label() == 'NP':
            for inner_subtree in outer_subtree:
                if inner_subtree[1] == 'NNP':
                    output_command += ' ' + inner_subtree[0]
                elif inner_subtree[1] == 'NN':
                    if inner_subtree[0] == 'location':
                        output_command += ' ' + 'locate'
                    elif inner_subtree[0] == 'definition':
                        output_command += ' ' + 'define'
                    else:
                        output_command += ' ' + inner_subtree[0]
                elif inner_subtree[1] == 'JJ':
                    if inner_subtree[0] in ['wiki', 'locate']:
                        output_command += ' ' + inner_subtree[0]
    output_command = output_command.strip()
    print(output_command)
    return output_command
