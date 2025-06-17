module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feature', 'fix', 'docs', 'style', 'refactor', 'test', 'chore']],
    'subject-case': [0],
    'subject-full-stop': [0],
    'subject-empty': [2, 'never'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^<(\w*)>\s*\((\w*)\)\s*(.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject']
    }
  }
};