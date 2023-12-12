import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useEffect, useState } from "react";
import { fabric } from "fabric";

const MyEditor = (props: any) => {
  const { editor, onReady } = useFabricJSEditor();
  const [file, setFile] = useState(null);

  // console.log(props.mockupId, props.side);

  const handleFileChange = (e:any) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onloadend = (e) => {
      fabric.Image.fromURL(e?.target?.result as any, (oImg) => {
        oImg.scaleToWidth(100);
        oImg.scaleToHeight(100);
        editor&&editor.canvas.centerObject(oImg);
        editor&&editor.canvas.add(oImg);
      });
    };

    reader.readAsDataURL(file);
  }, [file]);

  useEffect(() => {
    if (!props.snapshot) {
      return;
    }

    editor?.canvas.loadFromJSON(props.snapshot, renderAll);

    function renderAll() {
      editor?.canvas.renderAll();
    }
  }, [editor?.canvas, props]);

  useEffect(() => {
    const handleObjectModified = () => {
      let json = editor?.canvas?.toJSON();
      props.takeSnapshot(json);
  
      // Remove the listener after it's been triggered once
      editor?.canvas?.off('object:modified', handleObjectModified);
    };
  
    editor?.canvas?.on('object:modified', handleObjectModified);
  
    // Clean up the listener when the component unmounts
    return () => {
      editor?.canvas?.off('object:modified', handleObjectModified);
    };
  }, [editor?.canvas, props]);
  

  return (
    <div>
      <div className="container">
        <img id="bgp" src={props.imgUrl} />

        <div className="canvas-container">
          <FabricJSCanvas className="canvas" onReady={onReady} />
        </div>
      </div>

      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default MyEditor;
