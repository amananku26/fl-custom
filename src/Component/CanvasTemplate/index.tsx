import React, { useEffect, useState } from "react";
import { fabric } from "fabric"; // Make sure fabric is installed in your project
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import styles from "./styles.module.css";
const DEFAULT_IMAGE = "./white-realistic-a5-notebook-closed-600nw-1556581460.webp";

interface AppProps { }

const CanvasTemplate: React.FC<AppProps> = () => {
  const [text, setText] = useState<string>("");
  const { editor, onReady } = useFabricJSEditor();

  const _onReady = (canvas: fabric.Canvas | null) => {
    if (!canvas) {
      console.error("Canvas is null");
      return;
    }
    fabric.Image.fromURL(DEFAULT_IMAGE, (img) => {
      canvas.setBackgroundImage && canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      onReady(canvas);
    });
  };
  
  const onAddText = () => {
    editor && editor.addText(text);
    setText("");
  };

  const onDeleteAll = () => {
    editor && editor.deleteAll();
    setText("");
  };

  const onDeleteSelected = () => {
    editor && editor.deleteSelected();
  };

  return (
    <div className={styles.design_parent}>
      <div className={styles.sample_container}>
        <FabricJSCanvas className={styles.sample_canvas} onReady={_onReady} />
      </div>
      <div>
        <fieldset>
          <input
            className={styles.input_box}
            name={`text`}
            type={`text`}
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <button className={styles.btn} onClick={onAddText}>Add Text</button>
        </fieldset>
        <button onClick={onDeleteAll}>Reset</button>
      </div>
    </div>
  );
};

export default CanvasTemplate;
