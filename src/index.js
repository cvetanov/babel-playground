import * as babylon from 'babylon';
import * as types from 'babel-types'
import traverse from 'babel-traverse';
import generate from 'babel-generator';

const code = `function square(x) {
  return x ** 2;
}`;

const expVisitor = {
  BinaryExpression(path) {
    if (types.isBinaryExpression(path.node, { operator: "**" })) {
      path.replaceWith(
        types.callExpression(
          types.memberExpression(types.identifier("Math"), types.identifier("pow")),
          [path.node.left, path.node.right]
        )
      );
    }
  }
};

const parsed = babylon.parse(code);
traverse(parsed, expVisitor);
const generated = generate(parsed);

console.log(generated.code);
