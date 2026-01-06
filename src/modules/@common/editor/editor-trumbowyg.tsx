'use client';

import 'trumbowyg/dist/ui/trumbowyg.min.css';

import { useField } from 'formik';
import React, { useEffect } from 'react';

export default function TrumbowygEditor({
  name,
  initialValue,
}: {
  name: string;
  initialValue: string;
}) {
  const type = 'text';
  const [field] = useField(name);

  const editorId = `trumbowyg-editor-${name}`;

  useEffect(() => {
    const loadDependencies = async () => {
      const $ = (await import('jquery')).default;

      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      window.$ = window.jQuery = $;

      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      await import('trumbowyg/dist/trumbowyg.min.js');

      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      $.trumbowyg.svgPath = '/icons/trumbowyg/icons.svg';

      const editorSelector = `#${editorId}`;

      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      $(editorSelector).trumbowyg({
        btns: [
          ['viewHTML'],
          ['undo', 'redo'], // Only supported in Blink browsers
          ['formatting'],
          ['strong', 'em', 'del'],
          ['superscript', 'subscript'],
          ['link'],
          ['insertImage'],
          ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
          ['unorderedList', 'orderedList'],
          ['horizontalRule'],
          ['removeformat'],
          ['fullscreen'],
        ],
        removeformatPasted: true,
      });

      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      $(editorSelector).trumbowyg('html', initialValue);

      $(editorSelector)
        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-expect-error
        .trumbowyg()
        .on('tbwblur', (e: any) => {
          field.onChange({
            target: { type, name, value: e.currentTarget.innerHTML },
          });
        });

      // Cleanup function
      return () => {
        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-expect-error
        $(editorSelector).trumbowyg('destroy').off('tbwblur');

        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-expect-error
        delete window.$;
        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-expect-error
        delete window.jQuery;
      };
    };

    loadDependencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue, editorId]);

  return <div id={editorId} className="trumbowyg-reset-css" />;
}
