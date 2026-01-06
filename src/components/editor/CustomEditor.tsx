import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css';
const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});
interface editorProps {
  name: string;
  values: any;
  setFieldValue: any;
}
export const CustomSunEditor: React.FC<editorProps> = ({
  name = 'description',
  values,
  setFieldValue,
}) => {
  return (
    <SunEditor
      width="100%"
      height="400px"
      setOptions={{
        mode: 'classic',
        rtl: false,
        katex: 'window.katex',
        videoFileInput: false,
        tabDisable: false,
        buttonList: [
          [
            'undo',
            'redo',
            'font',
            'fontSize',
            'formatBlock',
            'paragraphStyle',
            'blockquote',
            'bold',
            'underline',
            'italic',
            'strike',
            'subscript',
            'superscript',
            'fontColor',
            'hiliteColor',
            'textStyle',
            'removeFormat',
            'outdent',
            'indent',
            'align',
            'horizontalRule',
            'list',
            'lineHeight',
            'table',
            'link',
            'image',
            'video',
            'audio',
            'math',
            'imageGallery',
            'fullScreen',
            'showBlocks',
            'codeView',
            'preview',
            'print',
            'save',
            'template',
          ],
        ],
      }}
      setContents={values[name] || values.description}
      onChange={(value: any) => setFieldValue(name, value)}
    />
  );
};

export default CustomSunEditor;
