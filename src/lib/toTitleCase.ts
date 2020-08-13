function toTitleCase(input: string) {
  var result = input.replace( /([A-Z])/g, " $1" );
  var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
}

export default toTitleCase;
