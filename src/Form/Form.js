import React, {
  Component,
  Children,
  isValidElement
} from "react";

const extractContent = child => {
  let response = {};
  switch (child.props.guimInput) {
    case "checkbox":
      response[child.props.name] = child.props.checked;
      break;
    case "picker":
      response[child.props.name] = child.props.active;
      break;
    case "slider":
      response[child.props.name] = child.props.selected_range;
      break;
  }
  return response;
}


class Form extends Component {
  constructor(props) {
    super(props);
    this.grabFormData = this.grabFormData.bind(this);
  }

  grabFormData() {
    let formData = {};

    const traverseChildren = childrenTraverse => {
      Children.forEach(childrenTraverse, childTraverse => {
        if (isValidElement(childTraverse)) {
          traverseChildren(childTraverse.props.children);
          if (childTraverse.props.hasOwnProperty("guimInput")) {
            formData = {...formData, ...extractContent(childTraverse)};
          }
        }
      });
    }

    traverseChildren(this.props.children);
    return formData;
  }

  render() {
    return (
      <div
        className={this.props.className}
        style={this.props.styles}
        name={this.props.name} >
        {this.props.children}
      </div>
    );
  }
}

Form.defaultProps = {
  className: "GUIMForm",
  styles: {},
  name: "form",
  guimInput: "form"
}

export default Form;
