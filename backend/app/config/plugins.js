module.exports = ({ env }) => ({
  chartbrew: true,
  ckeditor: {
    enabled: false,
    config: {
      plugin: {
        // disable data-theme tag setting //
        // setAttribute:false,
        // disable strapi theme, will use default ckeditor theme //
        // strapiTheme:false,
        // styles applied to editor container (global scope) //
        // styles:`
        // .ck.ck-editor__main .ck-focused{
        //   max-height: 700px;
        // }
        // :root{
        //   --ck-color-focus-border:red;
        //   --ck-color-text:red;
        // }
        // `
      },
      editor: {
        // editor default config

        // https://ckeditor.com/docs/ckeditor5/latest/features/markdown.html
        // if you need markdown support and output set: removePlugins: [''],
        // default is
        removePlugins: ['Markdown'],

        // https://ckeditor.com/docs/ckeditor5/latest/features/toolbar/toolbar.html
        toolbar: {
          items: [
            'paragraph',
            'heading1',
            'heading2',
            '|',
            'bold',
            'italic',
            'fontColor',
            'fontBackgroundColor',
            'fontFamily',
            'underline',
            'fontSize',
            'removeFormat',
            '|',
            'bulletedList',
            'todoList',
            'numberedList',
            '|',
            'alignment',
            'outdent',
            'indent',
            'horizontalLine',
            '|',
            'StrapiMediaLib',
            'insertTable',
            'blockQuote',
            'mediaEmbed',
            'link',
            'highlight',
            '|',
            'htmlEmbed',
            'sourceEditing',
            'code',
            'codeBlock',
            '|',
            'subscript',
            'superscript',
            'strikethrough',
            'specialCharacters',
            '|',
            'heading',
            'fullScreen',
            'undo',
            'redo',
          ],
        },
        // https://ckeditor.com/docs/ckeditor5/latest/features/font.html
        fontSize: {
          options: [9, 11, 13, 'default', 17, 19, 21, 27, 35],
          supportAllValues: false,
        },
        fontFamily: {
          options: [
            'default',
            'Arial, Helvetica Neue, Helvetica, Source Sans Pro, sans-serif',
            'Courier New, Courier, monospace',
            'Georgia, serif',
            'Lucida Sans Unicode, Lucida Grande, sans-serif',
            'Tahoma, Geneva, sans-serif',
            'Times New Roman, Times, serif',
            'Trebuchet MS, Helvetica, sans-serif',
            'Verdana, Geneva, sans-serif',
            'Roboto, Roboto Black, Roboto Medium, Roboto Light, sans-serif',
          ],
          supportAllValues: true,
        },
        fontColor: {
          columns: 5,
          documentColors: 10,
        },
        fontBackgroundColor: {
          columns: 5,
          documentColors: 10,
        },
        // https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
        // default language: 'en',
        // https://ckeditor.com/docs/ckeditor5/latest/features/images/images-overview.html
        image: {
          resizeUnit: '%',
          resizeOptions: [
            {
              name: 'resizeImage:original',
              value: null,
              icon: 'original',
            },
            {
              name: 'resizeImage:25',
              value: '25',
              icon: 'small',
            },
            {
              name: 'resizeImage:50',
              value: '50',
              icon: 'medium',
            },
            {
              name: 'resizeImage:75',
              value: '75',
              icon: 'large',
            },
          ],
          toolbar: [
            'toggleImageCaption',
            'imageTextAlternative',
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
            'linkImage',
            'resizeImage:25',
            'resizeImage:50',
            'resizeImage:75',
            'resizeImage:original',
          ],
        },
        // https://ckeditor.com/docs/ckeditor5/latest/features/table.html
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableCellProperties',
            'tableProperties',
            'toggleTableCaption',
          ],
        },
        // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html
        heading: {
          options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
          ],
        },
        // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html
        // Regular expressions (/.*/  /^(p|h[2-4])$/' etc) for htmlSupport does not allowed in this config
        htmlSupport: {
          allow: [
            {
              name: 'img',
              attributes: {
                sizes: true,
                loading: true,
              },
            },
          ],
        },
      },
    },
  },
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        uploadStream: {
          folder: env('CLOUDINARY_FOLDER'),
        },
        delete: {},
      },
    },
  },
  email: {
    config: {
      provider: env('EMAIL_PROVIDER'),
      providerOptions: {
        host: env('EMAIL_SMTP_HOST'),
        port: env('EMAIL_SMTP_PORT'),
        auth: {
          user: env('EMAIL_SMTP_USER'),
          pass: env('EMAIL_SMTP_PASS'),
        },
      },
      settings: {
        defaultFrom: env('EMAIL_ADDRESS_FROM'),
        defaultReplyTo: env('EMAIL_ADDRESS_REPLY'),
      },
    },
  },
  'generate-data': {
    enabled: true,
  },
  graphql: {
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: true,
      depthLimit: 15,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
  publisher: {
    enabled: true,
  },
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
    },
  },
  tinymce: {
    enabled: false,
    config: {
      editor: {
        outputFormat: 'html',
        editorConfig: {
          language: 'en',
          height: 500,
          menubar: false,
          extended_valid_elements: 'span, img, small',
          forced_root_block: '',
          convert_urls: false,
          entity_encoding: 'raw',
          plugins:
            'advlist autolink lists link image charmap preview anchor \
                  searchreplace visualblocks code fullscreen table emoticons nonbreaking \
                  insertdatetime media table code help wordcount',
          toolbar:
            'undo redo | styles | bold italic forecolor backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  table emoticons visualblocks code|\
                  nonbreaking bullist numlist outdent indent | removeformat | help',
          style_formats: [
            {
              title: 'Headings',
              items: [
                { title: 'h1', block: 'h1' },
                { title: 'h2', block: 'h2' },
                { title: 'h3', block: 'h3' },
                { title: 'h4', block: 'h4' },
                { title: 'h5', block: 'h5' },
                { title: 'h6', block: 'h6' },
              ],
            },

            {
              title: 'Text',
              items: [
                { title: 'Paragraph', block: 'p' },
                {
                  title: 'Paragraph with small letters',
                  block: 'small',
                },
              ],
            },
          ],
        },
      },
    },
  },
});
