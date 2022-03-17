export const error = {
  "background-color": "red",
  "color": "white",
  "padding": "5px 15px",
}

export const warn = {
  "background-color": "yellow",
  "color": "black",
  "padding": "5px 15px",
}

export const box = {
  padding: "5px 15px",
  border: "1px solid red",
  "border-radius": "5px"
}

export const chalk = (css: { [key: string]: string } | string, string: string, output = console.log) => {
  return output(
    `%c${string}`,
    (typeof css === "string")
      ? `color: ${css}`
      : Object.keys(css).map(style => `${style}:${css[style]}`).join(";")
  )
}
