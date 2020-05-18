export default {
  data: function () {
    return {
      definitions: {
        addExtraData: {
          tip: 'Add extra data',
          icon: 'star',
          label: 'Extra data',
          handler: this.addExtraDataFn
        }
      },
      toolbar: [
        [
          {
            label: this.$q.lang.editor.align,
            icon: this.$q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          },
          {
            label: this.$q.lang.editor.formatting,
            icon: this.$q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            label: this.$q.lang.editor.fontSize,
            icon: this.$q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: this.$q.lang.editor.defaultFont,
            icon: this.$q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['bold', 'italic', 'strike', 'underline'],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
        ['undo', 'redo'],
        ['viewsource']
      ],
      fonts: {
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      },
      extraData: [],
      extras: [
        {
          key: 'user.name',
          label: 'User name'
        },
        {
          key: 'user.email',
          label: 'User email'
        },
        {
          key: 'user.avatar',
          label: 'User avatar'
        },
        {
          key: 'current_date',
          label: 'Time now'
        }
      ]
    }
  },
  methods: {
    addExtraDataFn () {
      this.extraModal = true
    },
    addExtraData (key) {
      this.extraModal = false

      !this.extraData.includes(key) && this.extraData.push(key)

      if (/<\/div>$/.test(this.editor)) {
        this.editor = this.editor.replace(/<\/div>$/, `&nbsp;<span class="highlight-word">:${key}</span>&nbsp;</div>`)
        return
      }

      this.editor += `&nbsp;<span class="highlight-word">:${key}</span>&nbsp;`
    }
  }
}
