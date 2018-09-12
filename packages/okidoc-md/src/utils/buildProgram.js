function buildProgram(...declarations) {
  return {
    type: 'Program',
    body: declarations.reduce((result, item) => result.concat(item), []),
  };
}

export default buildProgram;
