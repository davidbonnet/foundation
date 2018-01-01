import jss from 'jss'
import preset from 'jss-preset-default'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import setDisplayName from 'recompose/setDisplayName'
import withPropsOnChange from 'recompose/withPropsOnChange'
import assign from 'lodash/assign'

jss.setup(
  preset({
    defaultUnit: {
      'line-height': 'px',
    },
  }),
)

export function withStyles(styles) {
  return Component => {
    const displayName = `JSS(${Component.displayName ||
      Component.name ||
      'Component'})`
    const styleSheet = jss.createStyleSheet(styles)
    let instances = 0
    return compose(
      setDisplayName(displayName),
      lifecycle({
        componentWillMount() {
          if (!instances++) {
            styleSheet.attach()
          }
        },
        componentWillUnmount() {
          if (!--instances) {
            styleSheet.detach()
          }
        },
      }),
      withPropsOnChange(['classes'], ({ classes }) => ({
        classes:
          classes == null
            ? styleSheet.classes
            : assign({}, classes, styleSheet.classes),
      })),
    )(Component)
  }
}
