import { registerDependencies } from 'mjml-validator'
import { BodyComponent } from 'mjml-core'

registerDependencies({
  // Tell the validator which tags are allowed as our component's parent
  'mj-hero': ['mj-basic-component'],
  'mj-column': ['mj-basic-component'],
  // Tell the validator which tags are allowed as our component's children
  'mj-basic-component': []
})

/*
  Our component is a (useless) simple text tag, that adds colored stars around the text.
  It can take 3 attributes, to specify size and colors.
*/
export default class MjBasic extends BodyComponent {
  // Tell the parser that our component won't contain other mjml tags
  static endingTag = true

  // Tells the validator which attributes are allowed for mj-layout
  static allowedAttributes = {
    'stars-color': 'color',
    'color': 'color',
    'font-size': 'unit(px)',
    'align': 'enum(left,right,center)',
  }

  // What the name suggests. Fallback value for this.getAttribute('attribute-name').
  static defaultAttributes = {
    'stars-color': 'yellow',
    color: 'black',
    'font-size': '12px',
    'align': 'center',
  }

  // This functions allows to define styles that can be used when rendering (see render() below)
  getStyles() {
    return {
      wrapperDiv: {
        color: this.getAttribute('stars-color'), // this.getAttribute(attrName) is the recommended way to access the attributes our component received in the mjml
        'font-size': this.getAttribute('font-size'),
      },
      contentP: {
        'text-align': this.getAttribute('align'),
        'font-size': '20px'
      },
      contentSpan: {
        color: this.getAttribute('color')
      }
    }
  }

  /*
    Render is the only required function in a component.
    It must return an html string.
  */
  render() {
    return `
      <div
        ${this.htmlAttributes({ // this.htmlAttributes() is the recommended way to pass attributes to html tags
          class: this.getAttribute('css-class'),
          style: 'wrapperDiv' // This will add the 'wrapperDiv' attributes from getStyles() as inline style
        })}
      >
      <p ${this.htmlAttributes({
        style: 'contentP' // This will add the 'contentP' attributes from getStyles() as inline style
      })}>
        <span>★</span>
        <span
          ${this.htmlAttributes({
            style: 'contentSpan' // This will add the 'contentSpan' attributes from getStyles() as inline style
          })}
        >
          ${this.getContent()}
        </span>
        <span>★</span>
      </p>
      </div>
		`
  }
}