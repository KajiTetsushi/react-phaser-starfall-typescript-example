export const getViewportDimensions = function getViewportDimensions(): { width: number; height: number; } {
  let width = 0;
  let height = 0;

  // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
  if (typeof window.innerWidth != 'undefined') {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
  else if (
    typeof document.documentElement !== 'undefined' &&
    typeof document.documentElement.clientWidth !== 'undefined' &&
    document.documentElement.clientWidth !== 0
  ) {
    width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
  }

  // older versions of IE
  else {
    const body = document.getElementsByTagName('body')[0];
    width = body.clientWidth;
    height = body.clientHeight;
  }

  return {
    width,
    height,
  };
}
