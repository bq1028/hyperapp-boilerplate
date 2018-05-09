import jsx from 'rollup-plugin-jsx'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const prod = !process.env.ROLLUP_WATCH
const dev = !!process.env.ROLLUP_WATCH

export default {
  input: 'src/main.js',
  output: {
    file: 'public/js/app.js',
    sourcemap: dev ? 'inline' : false,
    format: 'iife',
    intro:
      !dev &&
      `
      history.replaceState(null, null, sessionStorage.redirect)
      delete sessionStorage.redirect
      if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js')
    `,
  },
  plugins: [
    resolve({ jsnext: true }),
    commonjs(),
    jsx({factory: 'h'})
    prod && uglify(),
    dev && livereload('public'),
    dev &&
      serve({
        contentBase: ['public'],
        historyApiFallback: true,
        port: 80,
      }),
  ],
}
