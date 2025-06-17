module.exports = {
  rules: {
    // S3776: Cognitive Complexity
    'cognitive-complexity': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Cognitive Complexity of functions should not be too high',
          category: 'Best Practices',
          recommended: true
        },
        schema: [{
          type: 'integer',
          minimum: 0
        }]
      },
      create(context) {
        return {
          FunctionDeclaration(node) {
            // 实现认知复杂度检查
          },
          FunctionExpression(node) {
            // 实现认知复杂度检查
          },
          ArrowFunctionExpression(node) {
            // 实现认知复杂度检查
          }
        }
      }
    },

    // S1192: String literals should not be duplicated
    'no-duplicate-string': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'String literals should not be duplicated',
          category: 'Best Practices',
          recommended: true
        },
        schema: [{
          type: 'integer',
          minimum: 0
        }]
      },
      create(context) {
        const strings = new Map();
        return {
          Literal(node) {
            if (typeof node.value === 'string' && node.value.length > 3) {
              // 检查重复字符串
            }
          }
        }
      }
    }
  }
} 