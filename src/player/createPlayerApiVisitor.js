import { isPlayerApiDecorator } from './playerApi';

function createPlayerApiVisitor(enter) {
  return {
    Decorator(path) {
      if (isPlayerApiDecorator(path.node)) {
        enter(path.parentPath);
      }
    },
  };
}

export default createPlayerApiVisitor;
