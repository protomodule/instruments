import "dotenv/config"
import { chalk, error, box } from "./chalk"
import { ValidatorSpec, cleanEnv, makeValidator } from "envalid"

/**
 * Usage:
 *  1.) Add a `<script src="%PUBLIC_URL%/env.js"></script>` tag to your
 *      index.html's <head> at the top most position, i.e.:
 *         <!DOCTYPE html>
 *            <html lang="en">
 *            <head>
 *               <meta charset="utf-8" />
 *               <script src="%PUBLIC_URL%/env.js"></script>
 *          ...
 *  2.) Create your own configuration singleton module in a separate file:
 * 
 *          import { fromWeb, requiredStr } from "@protomodule/instruments"
 * 
 *          export const config = fromWeb({
 *            REACT_APP_API_URL: requiredStr(),
 *          })
 * 
 *  3.) Access environment variables type-safe like so `const BASE_API_URI = config.REACT_APP_API_URL`
 *  4.) You can add your variables to `.env` when running `yarn start`
 *                                    OR
 *      You can set *actual environment variables* when running as a Docker container
 */

declare global {
  interface Window {
    env: { [key: string]: string };
  }
}

const reporter = ({ errors } : { errors: Partial<Record<string, Error>> }) => {
  if (!errors || Object.keys(errors).length < 1) return

  chalk(error, "Fatal misconfiguration in environment", console.error)
  chalk(box, Object.entries(errors)
    .map(([key, error]) => `${key}: ${error?.message === "undefined" ? "Missing environment variable" : error?.message}`)
    .join("\n"))
  
  alert("Fatal misconfiguration in environment! Please contact administrator.")
  throw new Error("Fatal misconfiguration in environment")
}

const TRUE_VALS = ["yes", "y", "true", "t", "1"]
const FALSE_VALS = ["no", "n", "false", "f", "0"]

export const yesNo = makeValidator(x => {
  const input = `${x}`
  if (TRUE_VALS.includes(input)) return true
  if (FALSE_VALS.includes(input)) return false
  throw new Error(`Input "${input}" invalid. Expected value of ${TRUE_VALS.join(" | ")} or ${FALSE_VALS.join(" | ")}`)
})

export const requiredStr = makeValidator(x => {
  if (typeof x === "string" && x.length > 0) return `${x}`

  throw new Error(`Input "${x}" invalid. Expected non empty string value`)
})

export type Schema<T> = { [K in keyof T]: ValidatorSpec<T[K]>; }
export const fromWeb = <T>(schema: Schema<T>) => {
  return cleanEnv(
    { ...process.env, ...window.env },
    schema,
    { reporter }
  )
}
