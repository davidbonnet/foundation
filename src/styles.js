import { isFunction, uniq, concat, keys, get } from 'lodash'
import jss from 'jss'
import preset from 'jss-preset-default'
import {
  compose,
  lifecycle,
  setDisplayName,
  withPropsOnChange,
} from 'recompose'

jss.setup(
  preset({
    defaultUnit: {
      'line-height': 'px',
    },
  }),
)

export function shallowEqual(
  a,
  b,
  properties = uniq(concat(keys(a), keys(b))),
  paths = false,
) {
  /*
  Returns `false` if objects `a` and `b` have at least one different property.
  If a list of `properties` names is provided, only considers those.
  If `paths` is `true`, considers properties as paths (e.g., `p1.p2`).
  */
  const { length } = properties
  for (let i = 0; i < length; i++) {
    const property = properties[i]
    if (paths) {
      if (get(a, property) !== get(b, property)) {
        return false
      }
    } else if (a[property] !== b[property]) {
      return false
    }
  }
  return true
}

function updateStyleSheet(stylesMapper, props) {
  const styleSheet = jss.createStyleSheet(stylesMapper(props))
  styleSheet.attach()
  if (this.styleSheet != null) {
    this.styleSheet.detach()
  }
  this.styleSheet = styleSheet
  const { classes } = props
  this.setState({
    classes:
      classes == null
        ? styleSheet.classes
        : { ...classes, ...styleSheet.classes },
  })
}

export function withStylesOnChange(shouldHandleOrKeys, stylesMapper) {
  const shouldHandle = isFunction(shouldHandleOrKeys)
    ? shouldHandleOrKeys
    : (props, nextProps) => !shallowEqual(props, nextProps, shouldHandleOrKeys)
  return Component =>
    compose(
      setDisplayName(
        `withStylesOnChange(${Component.displayName ||
          Component.name ||
          'Component'})`,
      ),
      lifecycle({
        updateStyleSheet,
        componentWillMount() {
          this.updateStyleSheet(stylesMapper, this.props)
        },
        componentWillReceiveProps(nextProps) {
          if (shouldHandle(this.props, nextProps)) {
            this.updateStyleSheet(stylesMapper, nextProps)
          }
        },
        componentWillUnmount() {
          this.styleSheet.detach()
        },
      }),
    )(Component)
}

export function withStyles(styles) {
  return Component => {
    const displayName = `JSS(${Component.displayName ||
    Component.name /* istanbul ignore next */ ||
      'Component'})`
    const styleSheet = jss.createStyleSheet(styles)
    let instances = 0
    return compose(
      setDisplayName(displayName),
      lifecycle({
        componentWillMount() {
          /* istanbul ignore else */
          if (!instances++) {
            styleSheet.attach()
          }
        },
        componentWillUnmount() {
          /* istanbul ignore else */
          if (!--instances) {
            styleSheet.detach()
          }
        },
      }),
      withPropsOnChange(['classes'], ({ classes }) => ({
        classes:
          classes == null
            ? styleSheet.classes
            : { ...classes, ...styleSheet.classes },
      })),
    )(Component)
  }
}
