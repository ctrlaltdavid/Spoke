import React, { Component } from "react";
import LibraryToolbar from "./LibraryToolbar";
import styles from "./LibraryContainer.scss";
import ComponentsLibrary from "./ComponentsLibrary";
import PrimitivesLibrary from "./PrimitivesLibrary";
import ModelsLibrary from "./ModelsLibrary";
import VideosLibrary from "./VideosLibrary";
import ImagesLibrary from "./ImagesLibrary";
import MyFilesLibrary from "./MyFilesLibrary";
import { withEditor } from "../contexts/EditorContext";
import PropTypes from "prop-types";

class LibraryContainer extends Component {
  static propTypes = {
    editor: PropTypes.object.isRequired
  };

  state = {
    selected: null,
    items: [
      {
        id: "components",
        label: "Components",
        iconClassName: "fa-puzzle-piece",
        component: ComponentsLibrary
      },
      {
        id: "primitives",
        label: "Primitives",
        iconClassName: "fa-cube",
        component: PrimitivesLibrary
      },
      {
        id: "models",
        label: "Models",
        iconClassName: "fa-cubes",
        component: ModelsLibrary
      },
      {
        id: "videos",
        label: "Videos",
        iconClassName: "fa-film",
        component: VideosLibrary
      },
      {
        id: "images",
        label: "Images",
        iconClassName: "fa-image",
        component: ImagesLibrary
      },
      {
        id: "files",
        label: "My Files",
        iconClassName: "fa-folder",
        component: MyFilesLibrary
      }
    ]
  };

  onSelectItem = (NodeType, props) => {
    const editor = this.props.editor;
    const node = new NodeType(editor);

    if (props) {
      for (const propName in props) {
        if (props.hasOwnProperty(propName)) {
          node[propName] = props[propName];
        }
      }
    }

    editor.addObject(node);
  };

  onSelect = item => {
    this.setState({
      selected: item === this.state.selected ? null : item
    });
  };

  render() {
    const { items, selected } = this.state;
    const Component = selected && selected.component;

    return (
      <div className={styles.libraryContainer}>
        <div className={styles.libraryPanelContainer}>
          {Component && <Component onSelectItem={this.onSelectItem} />}
        </div>
        <LibraryToolbar items={items} selected={selected} onSelect={this.onSelect} />
      </div>
    );
  }
}

export default withEditor(LibraryContainer);
